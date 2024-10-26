from PoroPilot import PoroPilot
from .config import Config
from datetime import datetime, timedelta
from .game_data import getChampionNameAndImage, getQueueName, getSummonerSpellNameAndImage, getRuneImageandName, getItemNameAndImage

PATCH_VERSION = '14.21.1'

poro = PoroPilot(Config.API_KEY, "euw1")

def player_header(name, tagline):
    player_puuid = poro.account.by_gamename(name, tagline)['puuid']
    player_data = poro.summoner.by_puuid(player_puuid)
    player_champions = poro.mastery.by_puuid_top_champions(player_puuid)
    player_league = poro.league.summoner(player_data['id'])

    player_data['profileIconId'] = f'https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/img/profileicon/{player_data["profileIconId"]}.png'

    summoner_winrate = int(player_league[0]['wins'] / (player_league[0]['wins'] + player_league[0]['losses']) * 100)

    champion_names = [getChampionNameAndImage(champion['championId']) for champion in player_champions]
    
    header_props = {
        'name': name,
        'tagline': tagline,
        'level': player_data['summonerLevel'],
        'profileIcon': player_data['profileIconId'],
    }

    stats_props = {
        'winRate': summoner_winrate,
    }

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

    rank_props = {
        'lp': player_league[0]['leaguePoints'],
        'rank': player_league[0]['rank'],
    }

    recent_matches = get_recent_matches(player_puuid)

    data = {
        'header': header_props,
        'stats': stats_props,
        'mostPlayedChampions': most_played_champions_props,
        'competitive': rank_props,
        'recentMatches': recent_matches
    }

    get_recent_matches(player_puuid)
    return data

def get_recent_matches(puuid):
    player_history = []
    match_data = []
    player_history.extend(poro.match.by_puuid_matchlist(puuid, count=50))
    
    for match in player_history:
        match_data.append(process_match_data(poro.match.by_match_id(match)))

    # match_data.append(process_match_data(poro.match.by_match_id(player_history[0]))) 
    # match_data.append(process_match_data(poro.match.by_match_id(player_history[1]))) 

    return match_data

def get_player_profile_data(name, tagline):
    pass

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

def is_player_in_game(name_tagline):
    summoner_name, tagline = name_tagline.split('#')
    summoner_name, tagline  = summoner_name.replace(' ', ''), tagline.replace(' ', '')

    summoner_puuid = poro.account.by_gamename(summoner_name, tagline)['puuid']
    summoner_id = poro.summoner.by_puuid(summoner_puuid)['id']

    game_data = poro.spectator.by_summoner(summoner_id) or None

    return game_data

def getPlayerRank(summonerId):
    player_league = poro.league.summoner(summonerId)
    # get tier where queueType is RANKED_SOLO_5x5
    tier = next((queue['tier'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)
    rank = next((queue['rank'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)

    return tier, rank, f'{tier.capitalize()}.png'

def process_match_data(match_data):
    participants = []
    
    for player in match_data['info']['participants']:
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
            'championName': getChampionNameAndImage(player['championId'])[0],
            'championIcon': getChampionNameAndImage(player['championId'])[1],
            'champLevel': player['champLevel'],
            'teamPosition': player['teamPosition'],
            'teamId': player['teamId'],
            'kills': player['kills'],
            'deaths': player['deaths'],
            'assists': player['assists'],
            'goldEarned': player['goldEarned'],
            'summoner1': getSummonerSpellNameAndImage(player['summoner1Id'])[0],
            'summoner2': getSummonerSpellNameAndImage(player['summoner2Id'])[0],
            'minionsKilled': player['totalMinionsKilled'],
            'visionScore': player['visionScore'],
            'statPerks': [getRuneImageandName(value) for key, value in player['perks']['statPerks'].items()],
            'primaryStyle': [getRuneImageandName(rune) for rune in primary_style['perks']],
            'secondaryStyle': [getRuneImageandName(rune) for rune in secondary_style['perks']],
            'items': items,
            'win': player['win'],
        }

        participants.append(player_data)

    game_duration_seconds = match_data['info']['gameDuration']
    game_duration_minutes = game_duration_seconds // 60
    game_duration_seconds = game_duration_seconds % 60
    game_duration_formatted = f"{game_duration_minutes}:{game_duration_seconds:02d}"

    game_creation_unix = match_data['info']['gameCreation']
    game_creation_date = datetime.fromtimestamp(game_creation_unix / 1000).strftime('%d/%m/%Y')

    # print(match_data['info']['gameMode'])
    # print(match_data['info']['gameType'])
    # print(match_data['info']['queueId'])

    game_mode = getQueueName(match_data['info']['queueId'])
    # print("tests", test)

    match_data = {
        'gameId': match_data['metadata']['matchId'],
        'gameDuration': game_duration_formatted,
        'gameVersion': match_data['info']['gameVersion'],
        'gameCreation': game_creation_date,
        'gameMode': game_mode,
        'gameResult': match_data['info']['endOfGameResult'],
        'teams': {
            'blue': {
                'teamId': 100,
                'win': match_data['info']['teams'][0]['win'],
                'bans': [ban['championId'] for ban in match_data['info']['teams'][0]['bans']],
                'participants': participants[:5]
            },
            'red': {
                'teamId': 200,
                'win': match_data['info']['teams'][1]['win'],
                'bans': [ban['championId'] for ban in match_data['info']['teams'][1]['bans']],
                'participants': participants[5:]
            },
        }
    }

    return match_data