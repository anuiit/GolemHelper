from PoroPilot import PoroPilot
from .config import Config
from datetime import datetime, timedelta
from .game_data import getChampionNameAndImage, getQueueName, getSummonerSpellNameAndImage, getRuneImageandName, getItemNameAndImage

PATCH_VERSION = '14.21.1'

poro = PoroPilot(Config.API_KEY, "euw1")


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
    player_history = []
    match_data = []
    player_history.extend(poro.match.by_puuid_matchlist(puuid, count=50))
    
    for match in player_history:
        match_data.append(process_match_data(poro.match.by_match_id(match)))

    match_data = {
        'name': name,
        'matches': match_data
    }

    return match_data

def process_match_data(ori_match_data, livegame=False):
    participants = []

    if livegame == False:
        match_data = ori_match_data['info']
    else:
        match_data = ori_match_data

    for player in match_data['participants']:
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

    game_duration_seconds = match_data['gameDuration']
    game_duration_minutes = game_duration_seconds // 60
    game_duration_seconds = game_duration_seconds % 60
    game_duration_formatted = f"{game_duration_minutes}:{game_duration_seconds:02d}"

    game_creation_unix = match_data['gameCreation']
    game_creation_date = datetime.fromtimestamp(game_creation_unix / 1000).strftime('%d/%m/%Y')

    game_mode = getQueueName(match_data['queueId'])

    match_data = {
        'gameId': ori_match_data['metadata']['matchId'] if livegame == False else match_data['gameId'],
        'gameDuration': game_duration_formatted,
        'gameVersion': match_data['gameVersion'],
        'gameCreation': game_creation_date,
        'gameMode': game_mode,
        'gameResult': match_data['endOfGameResult'],
        'teams': {
            'blue': {
                'teamId': 100,
                'win': match_data['teams'][0]['win'],
                'bans': [ban['championId'] for ban in match_data['teams'][0]['bans']],
                'participants': participants[:5]
            },
            'red': {
                'teamId': 200,
                'win': match_data['teams'][1]['win'],
                'bans': [ban['championId'] for ban in match_data['teams'][1]['bans']],
                'participants': participants[5:]
            },
        }
    }

    return match_data

## UTILITIES API FUNCTIONS ###

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

def is_player_in_game(name, tagline):
    summoner_puuid = poro.account.by_gamename(name, tagline)['puuid']
    summoner_id = poro.summoner.by_puuid(summoner_puuid)['id']

    game_data = poro.spectator.by_summoner(summoner_puuid) or None

    print(name, tagline, " - is in game: ", True if game_data else False)
    if game_data:
        test = process_match_data(game_data)
    # test = process_match_data(game_data, livegame=True)
    #print(test)

    return game_data

def get_player_rank(summonerId):
    player_league = poro.league.summoner(summonerId)
    # get tier where queueType is RANKED_SOLO_5x5
    tier = next((queue['tier'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)
    rank = next((queue['rank'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)

    return tier, rank, f'{tier.capitalize()}.png'

def get_puuid(name, tagline):
    return poro.account.by_gamename(name, tagline)['puuid']