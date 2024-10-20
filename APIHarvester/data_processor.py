from datetime import datetime, timedelta
from PoroPilot import PoroPilot

def get_player_history(puuid, endpoint_match, days=7, max_days=90, max_history=70):
    player_history = []
    start = 7
    end = 0

    while len(player_history) < max_history and start <= max_days:
        start_time = datetime.now() - timedelta(days=start)
        start_time = start_time.strftime("%Y-%m-%d")

        end_time = datetime.now() - timedelta(days=end)
        end_time = end_time.strftime("%Y-%m-%d")

        player_history.extend(endpoint_match.by_puuid_matchlist(puuid, queue=420, count=50, startTime=start_time, endTime=end_time))

        start += days
        end += days

    player_history = list(dict.fromkeys(player_history))

    return player_history

def get_game_data(game_id, puuid, endpoint_match):
    game = endpoint_match.by_match_id(game_id)
    position = game['metadata']['participants'].index(puuid)
    game_data = game['info']['participants'][position]

    return game_data

def update_player_role(player_role, game_data):
    for key, value in enumerate(player_role):
        if value == game_data['teamPosition']:
            player_role[value] += 1

    return player_role

def analyze_history_champ_played(puuid, champId, teamPositionInGame, endpoint_match, endpoint_summoner):
    played = 0
    wins = 0
    losses = 0
    player_role_count = {'TOP': 0, 'JUNGLE': 0, 'MIDDLE': 0, 'BOTTOM': 0, 'UTILITY': 0}

    player_history = get_player_history(puuid, endpoint_match)

    for game in player_history:
        game_data = get_game_data(game, puuid, )
        player_role_count = update_player_role(player_role_count, game_data)

        if game_data['teamPosition'] == teamPositionInGame and game_data['championId'] == champId:
            played += 1
            win = game_data['win']

            if win:
                wins += 1
            else:
                losses += 1

    winrate = wins / played * 100 if played > 0 else 0
    mainRole = max(player_role_count, key=player_role_count.get)
    mainRolePercentage = player_role_count[mainRole] / sum(player_role_count.values()) * 100 if sum(player_role_count.values()) > 0 else 0
    teamPositionPercentagePlayed = player_role_count[teamPositionInGame] / sum(player_role_count.values()) * 100 if sum(player_role_count.values()) > 0 else 0

    return played, wins, losses, winrate, mainRole, mainRolePercentage, teamPositionPercentagePlayed