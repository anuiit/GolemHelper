import requests
import json
from .config import Config


with open('app/champions_data.json', 'r') as file:
    master_champion_data = json.load(file)

itemsData = requests.get(f"https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/data/en_US/item.json")
itemsData = itemsData.json()

summonerSpellData = requests.get(f"https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/data/en_US/summoner.json")
summonerSpellData = summonerSpellData.json().get('data')

runesData = requests.get(f"https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/data/en_US/runesReforged.json")
runesData = runesData.json()

communityDragonVersion = Config.PATCH_VERSION.split('.')[0] + "." + Config.PATCH_VERSION.split('.')[1]
print(f"patch version: {communityDragonVersion}")

queuesData = requests.get(f"https://raw.communitydragon.org/{communityDragonVersion}/plugins/rcp-be-lol-game-data/global/default/v1/queues.json")
queuesData = queuesData.json()

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

def getQueueName(queueId):
    for queue in queuesData:
        if queue['id'] == queueId:
            return queue['name']
    return "Unknown Queue"

def getChampionName(championId):
    if championId == "-1" or championId == -1:
        return None
    return master_champion_data.get(str(championId), "Unknown Champion").get('name', "Unknown Champion")

def getSummonerSpellNameAndImage(key):
    for spell in summonerSpellData:
        if summonerSpellData[spell]['key'] == str(key):
            summonerSpellName = summonerSpellData[spell]['id']
            summonerSpellUrl = f'https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/img/spell/{summonerSpellName}.png'

    return summonerSpellName, summonerSpellUrl

def getRuneImageandName(runeId):
    if str(runeId).startswith('5'):
        rune = stat_runes.get(runeId, {"name": "Unknown Rune", "url": ""})
        return rune['name'], rune['url'], runeId
    elif str(runeId).endswith('00'):
        for rune_category in runesData:
            if rune_category['id'] == runeId:
                rune_url = f"https://ddragon.leagueoflegends.com/cdn/img/{rune_category['icon']}"
                return rune_category['name'], rune_url, runeId
    else:
        for rune_category in runesData:
            for slot in rune_category['slots']:
                # print('debug slot: ', slot)
                rune = next((r for r in slot['runes'] if r['id'] == runeId), None)
                if rune:
                    rune_url = f"https://ddragon.leagueoflegends.com/cdn/img/{rune['icon']}"
                    return rune['name'], rune_url, runeId
        return "Unknown Rune", "", runeId

def getItemNameAndImage(itemId):
    if itemId == 0:
        return None, None
    for item in itemsData['data']:
        if item == str(itemId):
            itemName = itemsData['data'][item]['name']
            itemIcon = f'https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/img/item/{itemId}.png'
            return itemName, itemIcon
    return "Unknown Item", str(itemId)



# DEPRECATED

def getChampionNameAndImage(championId):
    if championId == "-1":
        return None, None
    champion_name = master_champion_data.get(str(championId), "Unknown Champion").get('name', "Unknown Champion")
    champion_name = champion_name.replace("'", "").replace(" ", "").strip()
    champion_name = champion_name.lower().capitalize()
    print(f'champion_name: {champion_name}')
    
    champion_url = f'https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/img/champion/{champion_name}.png'
    return champion_name, champion_url

def getChampionImage(championName):
    return f'https://ddragon.leagueoflegends.com/cdn/{Config.PATCH_VERSION}/img/champion/{championName}.png'