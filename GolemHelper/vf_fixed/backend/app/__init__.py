from flask import Flask
from flask_cors import CORS
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Load configuration
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    
    from .routes import init_routes
    init_routes(app)
    
    return app