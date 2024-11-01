from flask import jsonify, request
from .api_processor import *

player_name = "Hyuje"
player_tagline = "EUW"
player_puuid = "lm8OaAOW5B1EXfklSrZFjLsuxnq2SV0_o7iurhQuXHo_gTVtIfvk4MOHAbQShT3I394g6wlSRLHnjw"

def init_routes(app):
    @app.route('/api/headerData', methods=['GET'])
    def get_header_data():
        header_data = player_header2(player_name, player_tagline)

        return jsonify(header_data)

    @app.route('/api/statsData', methods=['GET'])
    def get_stats_data():
        stats_data = player_stats(player_name, player_tagline)
        return jsonify(stats_data)

    @app.route('/api/playerMatchHistory', methods=['GET'])
    def player_match_history():
        
        match_history = get_recent_matches(player_puuid)
        return jsonify(match_history)
    
    @app.route('/api/mostPlayedChampions', methods=['GET'])
    def most_played_champions():
        most_played_champions = player_most_played_champions(player_name, player_tagline)
        return jsonify(most_played_champions)

    @app.route('/api/playerSearch', methods=['GET', 'POST'])
    def get_post_player_data():
        query = "Hyuje#EUW"
        # query = request.get_json().get('query')
        print("Received query:", query)
        gameName, tagline = query.split('#')

        print("Received query:", gameName, tagline)
        header_data = player_header2(gameName, tagline)
        stats_data = player_stats(gameName, tagline)
        return jsonify({'header': header_data, 'stats': stats_data}), 200
