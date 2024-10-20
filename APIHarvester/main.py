from PoroPilot import PoroPilot
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import mysql.connector
from database_manager import *
from data_processor import *

with open('api_key.txt', 'r') as f:
    api_key = f.read()

euw1_api = PoroPilot(api_key, 'euw1')

summoner = euw1_api.summoner
match = euw1_api.match
rotation = euw1_api.champion
mastery = euw1_api.mastery
league = euw1_api.league
spectator = euw1_api.spectator
league_exp = euw1_api.league_exp
lol_status = euw1_api.lol_status

print('Lancement du script...')

games_ids = pd.read_csv('games_ids_prez.csv')
games_ids = games_ids.drop_duplicates()
games_ids = games_ids.reset_index(drop=True)

print('Données chargées\n')
print('Début de l\'analyse...')

connection = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='zoiv',
    database='mydatabse'
)

computer_id = 'randyboii'
status = 'running'

print("Connexion à la base de données réussie.\nid=" + computer_id + ", status=" + status)

main_df = pd.DataFrame()

print("\nDébut de l'analyse des games...")

for idx, game_id in enumerate(games_ids['Game_id'][:6]):
    try:
        print(f'\nGame : {game_id} - Start | {idx}/{len(games_ids)}')

        game = match.by_match_id(game_id)
        puuid_list = game['metadata']['participants'] 
        game_data = {
            'game_id': game['metadata']['matchId'], 
            'gameCreation': game['info']['gameCreation'], 
            'game_duration': game['info']['gameDuration'], 
            'game_version': game['info']['gameVersion'],
            'game_winner': game['info']['teams'][0]['win']
        }

        game_data['gameCreation'] = datetime.fromtimestamp(game_data['gameCreation'] / 1000)
        game_data['gameCreation'] = game_data['gameCreation'].strftime('%Y-%m-%d %H:%M:%S')

        insert_game_data(connection, game_data['game_id'], game_data['game_duration'], game_data['game_version'], game_data['gameCreation'], game_data['game_winner'])

        for i in range(10):
            puuid = puuid_list[i]
            championId = game['info']['participants'][i]['championId']
            championName = game['info']['participants'][i]['championName']
            teamPosition = game['info']['participants'][i]['teamPosition']

            if i < 5:
                team = 'Blue' + teamPosition + '_'
                player_team = 'Blue'
            else:
                team = 'Red' + teamPosition + '_'
                player_team = 'Red'

            player_history_data = analyze_history_champ_played(puuid, championId, teamPosition)

            player_infos = {
                f'{team}puuid': puuid, 
                f'{team}championId': championId, 
                f'{team}championName': championName, 
                f'{team}winrateChampionPercentageOnPosition': player_history_data[3],
                f'{team}teamPosition': teamPosition, 
                f'{team}teamPositionPlayedPercentage': player_history_data[6],
                f'{team}mainPosition': player_history_data[4]
            }

            game_data.update(player_infos)

            insert_player_stats(connection, game_data['game_id'], puuid, championId, championName, player_history_data[3], teamPosition, player_history_data[6], player_history_data[4], player_team)

        game_data['win'] = 0 if game['info']['participants'][0]['win'] == True else 1

        game_data = pd.DataFrame([game_data])
        main_df = pd.concat([main_df, game_data], ignore_index=True)

        main_df.to_csv('lol_data.csv', index=False)

        print(f'Game : {game_id} - Done')

    except Exception as e:
        print(e)
        print(f"Erreur dans l'analyse de la game : {game_id}")
        continue

status = 'stopped'
print('Plus de games à analyser')