from flask import jsonify, request
from .api_processor import *
import json

def init_routes(app):
    @app.route('/api/helloworld')
    def hello_world():
        return jsonify({"message": "Hello, World!"})
    
    @app.route('/helloworld')
    def hello_world2():
        return jsonify({"message": "Hello, World!"})

    @app.route('/api/headerData', methods=['POST'])
    def get_header_data():
        query = request.get_json().get('searchQuery')
        if not query or '#' not in query:
            return jsonify({"error": "Invalid query format. Expected 'Name#Tagline'."}), 400
        name, tagline = query.split('#')
        header = player_header(name, tagline)
        return jsonify(header)

    @app.route('/api/statsData', methods=['GET', 'POST'])
    def get_stats_data():
        print('statsData')
        name, tagline = request.get_json().get('searchQuery').split("#")
        stats_data = player_stats(name, tagline)
        return jsonify(stats_data)

    @app.route('/api/playerMatchHistory', methods=['GET', 'POST'])
    def player_match_history():
        print('playerMatchHistory')
        name, tagline = request.get_json().get('searchQuery').split('#')
        player_puuid = get_puuid(name, tagline)
        match_history = get_recent_matches(name, player_puuid)
        return jsonify(match_history)
    
    @app.route('/api/mostPlayedChampions', methods=['GET', 'POST'])
    def most_played_champions():
        # get query from request
        print('mostPlayedChampions')
        name = request.get_json().get('searchQuery').split('#')[0]
        most_played_champions = main_champions(name)
        return jsonify(most_played_champions)
    
    @app.route('/api/playerChart', methods=['GET', 'POST'])
    def player_chart():
        print('playerChart')
        name = request.get_json().get('searchQuery').split('#')[0]
        
        player_chart_data = calculate_player_stats(name)
        return jsonify(player_chart_data)
    
    @app.route('/api/liveGameData', methods=['GET', 'POST'])
    def livegame_data():
        print('playerChart')
        name, tagline = request.get_json().get('searchQuery').split('#')
        
        test = is_player_in_game(name, tagline)
        return jsonify(test)