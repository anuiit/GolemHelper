from PoroPilot import PoroPilot
from .config import Config
from datetime import datetime, timedelta
from .game_data import getChampionName, getQueueName, getSummonerSpellNameAndImage, getRuneImageandName, getItemNameAndImage, getChampionImage
from collections import defaultdict

PATCH_VERSION = '14.21.1'

poro = PoroPilot(Config.API_KEY, "euw1")
matches_data = []

### API FUNCTIONS ###

def player_header(name, tagline):
    player_puuid = poro.account.by_gamename(name, tagline)['puuid']
    player_data = poro.summoner.by_puuid(player_puuid)

    player_data['profileIconId'] = f'https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/img/profileicon/{player_data["profileIconId"]}.png'

    header_props = {
        'name': name,
        'tagline': tagline,
        'level': player_data['summonerLevel'],
        'profileIcon': player_data['profileIconId'],
    }

    return header_props

def player_stats(name, tagline):
    player_puuid = poro.account.by_gamename(name, tagline)['puuid']
    player_data = poro.summoner.by_puuid(player_puuid)
    player_league = poro.league.summoner(player_data['id'])
    print()

    player_data['profileIconId'] = f'https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/img/profileicon/{player_data["profileIconId"]}.png'

    summoner_winrate = int(player_league[0]['wins'] / (player_league[0]['wins'] + player_league[0]['losses']) * 100)

    stats_props = {
        'winRate': summoner_winrate,
        'lp': player_league[0]['leaguePoints'],
        'rank': player_league[0]['rank'],
        'tier': player_league[0]['tier'],
    }

    return stats_props

def player_most_played_champions(name, tagline):
    player_puuid = poro.account.by_gamename(name, tagline)['puuid']
    player_champions = poro.mastery.by_puuid_top_champions(player_puuid)

    champion_names = [getChampionNameAndImage(champion['championId']) for champion in player_champions]

    most_played_champions_props = [{
        'name': champion_names[0][0],
        'profileImage': champion_names[0][1]
    },
    {
        'name': champion_names[1][0],
        'profileImage': champion_names[1][1]
    },
    {
        'name': champion_names[2][0],
        'profileImage': champion_names[2][1]
    }]

    return most_played_champions_props

def get_recent_matches(name, puuid):
    global matches_data
    matches_data = []
    player_history = []
    
    player_history.extend(poro.match.by_puuid_matchlist(puuid, count=50))
    
    for match in player_history:
        try:
            matches_data.append(process_match_data(poro.match.by_match_id(match)))
        except:
            continue

    match_data = {
        'name': name,
        'matches': matches_data
    }

    return match_data


### DATA PROCESSING ###

def process_match_data(match):
    participants = []
    match_info = match['info']
    match_metadata = match['metadata']

    for player in match_info['participants']:
        style_perks = player['perks']['styles']
        primary_perks = [style_perks[0]['style']]
        secondary_perks = [style_perks[1]['style']]
    
        for perk in style_perks[0]['selections']:
            for key, value in perk.items():
                if key == 'perk':
                    primary_perks.append(value)
        
        for perk in style_perks[1]['selections']:
            for key, value in perk.items():
                if key == 'perk':
                    secondary_perks.append(value)


        primary_style = {
            'style': style_perks[0]['style'],
            'perks': primary_perks
        }

        secondary_style = {
            'style': style_perks[1]['style'],
            'perks': secondary_perks
        }

        items = {
            'item0': {},
            'item1': {},
            'item2': {},
            'item3': {},
            'item4': {},
            'item5': {}
        }
        
        for key, item in enumerate([player['item0'], player['item1'], player['item2'], player['item3'], player['item4'], player['item5']]):
            item_data = getItemNameAndImage(item)
            items[f'item{key}']['name'] = item_data[0]
            items[f'item{key}']['icon'] = item_data[1]

        player_data = {
            'gameName': player['riotIdGameName'],
            'championName': getChampionName(player['championId']),
            'champLevel': player['champLevel'],
            'teamPosition': player['teamPosition'],
            'teamId': player['teamId'],
            'kills': player['kills'],
            'deaths': player['deaths'],
            'assists': player['assists'],
            'goldEarned': player['goldEarned'],
            'summoner1': getSummonerSpellNameAndImage(player['summoner1Id'])[1],
            'summoner2': getSummonerSpellNameAndImage(player['summoner2Id'])[1],
            'minionsKilled': player['totalMinionsKilled'],
            'visionScore': player['visionScore'],
            'statPerks': [getRuneImageandName(value) for key, value in player['perks']['statPerks'].items()],
            'primaryStyle': [getRuneImageandName(rune) for rune in primary_style['perks']],
            'secondaryStyle': [getRuneImageandName(rune) for rune in secondary_style['perks']],
            'items': items,
            'win': player['win'],
        }

        participants.append(player_data)

    game_duration_seconds = match_info['gameDuration']
    game_duration_minutes = game_duration_seconds // 60
    game_duration_seconds = game_duration_seconds % 60
    game_duration_formatted = f"{game_duration_minutes}:{game_duration_seconds:02d}"

    game_creation_unix = match_info['gameCreation']
    game_creation_date = datetime.fromtimestamp(game_creation_unix / 1000).strftime('%d/%m/%Y')

    game_mode = getQueueName(match_info['queueId'])

    match_data = {
        'gameId': match_metadata['matchId'],
        'gameDuration': game_duration_formatted,
        'gameVersion': match_info['gameVersion'],
        'gameCreation': game_creation_date,
        'gameMode': game_mode,
        'teams': {
            'blue': {
                'teamId': 100,
                'win': match_info['teams'][0]['win'],
                'bans': [ban['championId'] for ban in match_info['teams'][0]['bans']],
                'participants': participants[:5]
            },
            'red': {
                'teamId': 200,
                'win': match_info['teams'][1]['win'],
                'bans': [ban['championId'] for ban in match_info['teams'][1]['bans']],
                'participants': participants[5:]
            },
        }
    }

    return match_data

def main_champions(name):
    global matches_data
    champions_stats = {}

    for match in matches_data:
        participants = match['teams']['blue']['participants'] + match['teams']['red']['participants']
        player_data = next((player for player in participants if player['gameName'] == name), None)

        champion = player_data.get('championName')
        is_win = player_data.get('win', False)
        kills = player_data.get('kills', 0)
        assists = player_data.get('assists', 0)
        deaths = player_data.get('deaths', 0)
        minions_killed = player_data.get('minionsKilled', 0)

        # Prevent division by zero for deaths
        kda = (kills + assists) / max(deaths, 1)

        # Extract game duration in minutes
        game_duration = match.get('gameDuration', '0:00')  # Format expected: "MM:SS"
        try:
            game_duration_minutes = int(game_duration.split(':')[0])
        except (ValueError, AttributeError):
            game_duration_minutes = 1  # Default to 1 to prevent division by zero

        # Prevent division by zero for game duration
        csmin = minions_killed / max(game_duration_minutes, 1)

        if champion not in champions_stats:
            champions_stats[champion] = {
                'name': champion,
                'games': 0,
                'kda_total': 0.0,
                'csmin_total': 0.0,
                'wins': 0
            }

        # Aggregate statistics
        champions_stats[champion]['games'] += 1
        champions_stats[champion]['kda_total'] += kda
        champions_stats[champion]['csmin_total'] += csmin
        if is_win:
            champions_stats[champion]['wins'] += 1

    # Sort champions by number of games played in descending order
    sorted_champions = sorted(champions_stats.values(), key=lambda x: x['games'], reverse=True)

    # Select top three most played champions
    top_champions = sorted_champions[:3]

    # Calculate average KDA, average CS/min, and winrate for the top three champions
    main_champs = []
    for champ in top_champions:
        games = champ['games']
        average_kda = champ['kda_total'] / games
        average_csmin = champ['csmin_total'] / games
        winrate = (champ['wins'] / games) * 100  # Convert to percentage

        main_champs.append({
            'name': champ['name'],
            'games': games,
            'average_kda': round(average_kda, 2),
            'average_csmin': round(average_csmin, 2),
            'winrate': round(winrate)
        })

    print(main_champs)
    return main_champs

def calculate_player_stats(name):
    global matches_data
    matches_by_date = defaultdict(list)
    stats_by_date = []

    for match in matches_data[::-1]:
        game_duration_min = int(match['gameDuration'].split(':')[0])
        if match['gameMode'] != 'Ranked Solo/Duo' or game_duration_min < 5:
            continue
        
        match_date_str = match['gameCreation'].replace('/', '-')
        matches_by_date[match_date_str].append(match)

    
    for date, match_date in matches_by_date.items():
        # If only one match played on a date, skip it, non-relevant
        if match_date.__len__() <= 1:
            continue

        kda = []
        csmin = []
        vision = []
        winrate = []
        passed_games = 0

        for match_data in match_date:
            # print(match_data)
            game_duration_min, game_duration_sec = match_data['gameDuration'].split(':')
            game_duration = (int(game_duration_min) * 60 + int(game_duration_sec)) / 60
            participants = match_data['teams']['blue']['participants'] + match_data['teams']['red']['participants']
            player_stats = next((player for player in participants if player['gameName'] == name), None)
            # print("\n\n\n player stats: ", player_stats)

            if player_stats['deaths'] == 0:
                player_stats['deaths'] = 1

            kda.append(player_stats['kills'] + player_stats['assists'] / player_stats['deaths'])
            csmin.append(player_stats['minionsKilled'] / game_duration)
            vision.append(player_stats['visionScore'])
            winrate.append(player_stats['win'])
        
        # print(date, match_date.__len__())
        # print((kda, csmin, vision, winrate))

        print(f'KDA: {sum(kda) / max(len(kda) - passed_games, 1):.2f}')
        print(f'CS/min: {sum(csmin) / max(len(csmin) - passed_games, 1):.2f}')
        print(f'Vision Score: {sum(vision) / max(len(vision) - passed_games, 1):.2f}')
        print(f'Winrate: {(sum(winrate) / max(len(winrate) - passed_games, 1)) * 100:.2f}%')
        print('---')

        match_date_stats = {
            'date': date,
            'kda': round(sum(kda) / max(len(kda) - passed_games, 1), 2),
            'csmin': round(sum(csmin) / max(len(csmin) - passed_games, 1), 2),
            'vision': round(sum(vision) / max(len(vision) - passed_games, 1), 2),
            'winrate': round((sum(winrate) / max(len(winrate) - passed_games, 1)) * 100),
            'played': len(kda) - passed_games
        }

        stats_by_date.append(match_date_stats)
    
    print(stats_by_date)
    return stats_by_date

def is_player_in_game(name, tagline):
    summoner_puuid = poro.account.by_gamename(name, tagline)['puuid']
    game_data = poro.spectator.by_summoner(summoner_puuid) or None

    print(name, tagline, " - is in game: ", True if game_data else False)
    processed_data = None
    
    if game_data:
        processed_data = process_live_match(game_data)
    
        print("Live Data: ", processed_data)

    return processed_data

## UTILITIES API FUNCTIONS ###

def process_live_match(match):
    print(match['bannedChampions'])
    banned_champions_blue = [getChampionName(str(champion['championId'])) for champion in match['bannedChampions'] if champion['teamId'] == 100]
    banned_champions_red = [getChampionName(str(champion['championId'])) for champion in match['bannedChampions'] if champion['teamId'] == 200]

    game_creation_unix = match['gameStartTime']
    game_creation_date = datetime.fromtimestamp(game_creation_unix / 1000).strftime('%d/%m/%Y - %H:%M')

    live_match_data = {
        'gameId': match['gameId'],
        'gameMode': match['gameMode'],
        'gameType': match['gameType'],
        'gameStartTime': game_creation_date,
        'teams': {
            'blue': {
                'teamId': 100,
                'participants': [process_live_player(player) for player in match['participants'][:5]],
                'bannedChampions': banned_champions_blue,
            },
            'red': {
                'teamId': 200,
                'participants': [process_live_player(player) for player in match['participants'][5:]],
                'bannedChampions': banned_champions_red,
            }
        }        
    }

    return live_match_data

def process_live_player(player):
    player_account = poro.account.by_puuid(player['puuid'])
    name, tagline = player_account['gameName'], player_account['tagLine']

    summoner1, summoner2 = getSummonerSpellNameAndImage(player['spell1Id']), getSummonerSpellNameAndImage(player['spell2Id'])
    
    player_data = {
        'teamId': player['teamId'],
        'name': name,
        'tagline': tagline,
        'profileIcon': player['profileIconId'],
        'championName': getChampionName(player['championId']),
        'summoner1': {
            'name': summoner1[0],
            'icon': summoner1[1]
        },
        'summoner2': {
            'name': summoner2[0],
            'icon': summoner2[1]
        },
        # 'perks': {
        #     'primary': [getRuneImageandName(rune) for rune in player['perks']['styles'][0]['selections']],
        #     'secondary': [getRuneImageandName(rune) for rune in player['perks']['styles'][1]['selections']],
        #     'statPerks': [getRuneImageandName(value) for key, value in player['perks']['statPerks'].items()],
        # }
    }

    print(player_data)

    return player_data


def get_player_history(puuid, days=7, max_days=30, max_history=20):
    player_history = []
    start = 7
    end = 0

    #fix la librarie poro pcq la ca marche pas
    while len(player_history) < max_history and start <= max_days:
        start_time = datetime.now() - timedelta(days=start)
        start_time = start_time.strftime("%Y-%m-%d")

        end_time = datetime.now() - timedelta(days=end)
        end_time = end_time.strftime("%Y-%m-%d")

        player_history.extend(poro.match.by_puuid_matchlist(puuid, queue=420, count=50, startTime=start_time, endTime=end_time))

        start += days
        end += days

    player_history = list(dict.fromkeys(player_history))
    # print(player_history)

    return player_history

def get_player_rank(summonerId):
    player_league = poro.league.summoner(summonerId)
    # get tier where queueType is RANKED_SOLO_5x5
    tier = next((queue['tier'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)
    rank = next((queue['rank'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)

    return tier, rank, f'{tier.capitalize()}.png'

def get_puuid(name, tagline):
    return poro.account.by_gamename(name, tagline)['puuid']