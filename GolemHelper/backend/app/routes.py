from flask import jsonify, request
from .api_processor import *


def init_routes(app):
    @app.route('/api/headerData', methods=['GET', 'POST'])
    def get_header_data():
        name, tagline = request.get_json().get('searchQuery').split('#')
        header_data = player_header(name, tagline)
        return jsonify(header_data)

    @app.route('/api/statsData', methods=['GET', 'POST'])
    def get_stats_data():
        name, tagline = request.get_json().get('searchQuery').split('#')
        stats_data = player_stats(name, tagline)
        return jsonify(stats_data)

    @app.route('/api/playerMatchHistory', methods=['GET', 'POST'])
    def player_match_history():
        name, tagline = request.get_json().get('searchQuery').split('#')
        player_puuid = get_puuid(name, tagline)
        match_history = get_recent_matches(name, player_puuid)
        return jsonify(match_history)
    
    @app.route('/api/mostPlayedChampions', methods=['GET', 'POST'])
    def most_played_champions():
        # get query from request
        name, tagline = request.get_json().get('searchQuery').split('#')
        most_played_champions = player_most_played_champions(name, tagline)
        return jsonify(most_played_champions)
