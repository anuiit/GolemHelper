import requests
import json


with open('app/transformed_championsv2.json', 'r') as file:
    master_champion_data = json.load(file)

summonerSpellData = requests.get("https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/summoner.json")
summonerSpellData = summonerSpellData.json().get('data')

runesData = requests.get("https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/runesReforged.json")
runesData = runesData.json()

stat_runes = {
    5001: {"name": "Health", "url": "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodshealthscalingicon.png"},
    5002: {"name": "Armor", "url": "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsarmoricon.png"},
    5003: {"name": "Magic Resist", "url": "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.png"},
    5005: {"name": "Attack Speed", "url": "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsattackspeedicon.png"},
    5007: {"name": "Ability Haste", "url": "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodscdrscalingicon.png"},
    5008: {"name": "Adaptive Force", "url": "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png"}
}
    
POSITIONS_INT_TO_NAME= {
    0: 'TOP',
    1: 'JUNGLE',
    2: 'MIDDLE',
    3: 'BOTTOM',
    4: 'UTILITY'
}

POSITIONS_NAME_TO_INT = {
    'TOP': 0,
    'JUNGLE': 1,
    'MIDDLE': 2,
    'BOTTOM': 3,
    'UTILITY': 4
}