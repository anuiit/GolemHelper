from flask import jsonify, request
from .api_processor import *

def init_routes(app):
    @app.route('/api/search_player', methods=['GET'])
    def search_player():
        player_name = test_poro('S1two', '9658')
        return jsonify(player_name)
    
    @app.route('/api/playerProfileData', methods=['GET'])
    def player_profile_data():
        #player_id = request.args.get('player_id')
        # Logic to get player profile data

        profile_data = {
            'player_id': 1,
            'name': 'Player1',
            'level': 30,
            'rank': 'Gold 1',
            'lp': 50,
            'winRate': 55.0,
            'kdaRatio': 3.0,
            'csmin': 7.0,
            'visionScore': 15.0,
            'mostPlayedChampions': [{'name': 'Aatrox', 'games': 20, 'winrate': 60.0},
                                    {'name': 'Akali', 'games': 15, 'winrate': 55.0},
                                    {'name': 'Alistar', 'games': 10, 'winrate': 50.0}],
            'recentMatches': [{'id': 1,
                                'result': 'Victory',
                                'duration': '31:22',
                                'red': [{'id': 1, 'name': 'Player1', 'champion': 'Aatrox', 'level': 18, 'kills': 10, 'deaths': 2, 'assists': 5},
                                        {'id': 2, 'name': 'Player2', 'champion': 'Akali', 'level': 16, 'kills': 8, 'deaths': 4, 'assists': 7},
                                        {'id': 3, 'name': 'Player3', 'champion': 'Alistar', 'level': 14, 'kills': 2, 'deaths': 6, 'assists': 10},
                                        {'id': 4, 'name': 'Player4', 'champion': 'Ashe', 'level': 15, 'kills': 5, 'deaths': 5, 'assists': 8},
                                        {'id': 5, 'name': 'Player5', 'champion': 'Annie', 'level': 17, 'kills': 7, 'deaths': 3, 'assists': 9}],
                                'blue': [{'id': 6, 'name': 'Player6', 'champion': 'Ahri', 'level': 18, 'kills': 9, 'deaths': 3, 'assists': 6},
                                        {'id': 7, 'name': 'Player7', 'champion': 'Amumu', 'level': 16, 'kills': 6, 'deaths': 5, 'assists': 8},
                                        {'id': 8, 'name': 'Player8', 'champion': 'Anivia', 'level': 14, 'kills': 3, 'deaths': 7, 'assists': 10},
                                        {'id': 9, 'name': 'Player9', 'champion': 'Ashe', 'level': 15, 'kills': 4, 'deaths': 6, 'assists': 7},
                                        {'id': 10, 'name': 'Player10', 'champion': 'Azir', 'level': 17, 'kills': 8, 'deaths': 4, 'assists': 9}]}]
        }

        return jsonify(profile_data)