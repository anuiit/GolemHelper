from PoroPilot import PoroPilot
from .config import Config
from datetime import datetime, timedelta
from .game_data import master_champion_data, summonerSpellData, runesData, stat_runes

poro = PoroPilot(Config.API_KEY, "euw1")

# def get_player_stats(puuid, player_history, champId):
#     played, wins, losses = 0, 0, 0
#     player_role_count = {'TOP': 0, 'JUNGLE': 0, 'MIDDLE': 0, 'BOTTOM': 0, 'UTILITY': 0}

#     for game in player_history:
#         player_game_data = get_game_data(game, puuid)
#         player_role_count = update_player_role(player_role_count, player_game_data)
        
#         if player_game_data['championId'] == champId:
#             played += 1
#             if player_game_data['win']:
#                 wins += 1
#             else:
#                 losses += 1
    
#     print(player_role_count)
#     mainRole = max(player_role_count, key=player_role_count.get)

#     return played, wins, losses, player_role_count, mainRole

def test_poro(name, tagline):
    print(f'Name: {name}, Tagline: {tagline}')
    print(poro.account.by_gamename(name, tagline)) 
    summoner_puuid = poro.account.by_gamename(name, tagline)['puuid']
    summoner_id = poro.summoner.by_puuid(summoner_puuid)['id']

    return summoner_id

def get_player_profile_data(name, tagline):
    


def get_player_history(puuid, days=7, max_days=90, max_history=70):
    player_history = []
    start = 7
    end = 0

    while len(player_history) < max_history and start <= max_days:
        start_time = datetime.now() - timedelta(days=start)
        start_time = start_time.strftime("%Y-%m-%d")

        end_time = datetime.now() - timedelta(days=end)
        end_time = end_time.strftime("%Y-%m-%d")

        player_history.extend(poro.match.by_puuid_matchlist(puuid, queue=420, count=50, startTime=start_time, endTime=end_time))

        start += days
        end += days

    player_history = list(dict.fromkeys(player_history))
    print(player_history)

    return player_history

def is_player_in_game(name_tagline):
    summoner_name, tagline = name_tagline.split('#')
    summoner_name, tagline  = summoner_name.replace(' ', ''), tagline.replace(' ', '')

    summoner_puuid = poro.account.by_gamename(summoner_name, tagline)['puuid']
    summoner_id = poro.summoner.by_puuid(summoner_puuid)['id']

    game_data = poro.spectator.by_summoner(summoner_id) or None

    return game_data

def getChampionNameAndImage(championId):
    print(f'championId: {championId}')
    champion_name = master_champion_data.get(str(championId), "Unknown Champion").get('name', "Unknown Champion")
    champion_url = f'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/{champion_name}.png'
    return champion_name, champion_url

def getSummonerSpellNameAndImage(key):
    for spell in summonerSpellData:
        if summonerSpellData[spell]['key'] == str(key):
            summonerSpellName = summonerSpellData[spell]['id']
            summonerSpellUrl = f'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/{summonerSpellName}.png'

    return summonerSpellName, summonerSpellUrl

def getRuneImageandName(runeId):
    if str(runeId).startswith('5'):
        rune = stat_runes.get(runeId, {"name": "Unknown Rune", "url": ""})
        return rune['name'], rune['url'], runeId
    else:
        for rune_category in runesData:
            for slot in rune_category['slots']:
                rune = next((r for r in slot['runes'] if r['id'] == runeId), None)
                if rune:
                    rune_url = f"https://ddragon.leagueoflegends.com/cdn/img/{rune['icon']}"
                    return rune['name'], rune_url, runeId
        return "Unknown Rune", "", runeId

def getPlayerRank(summonerId):
    player_league = poro.league.summoner(summonerId)
    # get tier where queueType is RANKED_SOLO_5x5
    tier = next((queue['tier'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)
    rank = next((queue['rank'] for queue in player_league if queue['queueType'] == 'RANKED_SOLO_5x5'), None)

    return tier, rank, f'{tier.capitalize()}.png'