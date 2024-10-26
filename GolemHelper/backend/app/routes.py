from flask import jsonify, request
from .api_processor import *

def init_routes(app):
    @app.route('/api/search_player', methods=['GET'])
    def search_player():
        player_data = player_header('Hyuje', 'EUW')
        return jsonify(player_data)
    
    @app.route('/api/playerProfileData', methods=['GET'])
    def player_profile_data():
        dashboard_data = player_header('Hyuje', 'EUW')

        return jsonify(dashboard_data)

    @app.route('/api/playerMatchHistory', methods=['GET'])
    def player_match_history():
        match_history = get_recent_matches('Hyuje', 'EUW')
        return jsonify(match_history)
    
    @app.route('/api/test', methods=['GET', 'POST'])
    def test():
        if request.method == 'POST':
            data = request.get_json()
            query = data.get('query')
            gameName, tagline = query.split('#')
            print("Received query:", gameName, tagline)
            # Process the query as needed and prepare a response
            response_data = player_header(gameName, tagline)
            return jsonify(response_data), 200
        elif request.method == 'GET':
            # Handle GET request if necessary
            return jsonify({'message': 'GET request received'}), 200
        else:
            return jsonify({'error': 'Method not allowed'}), 405