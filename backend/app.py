from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import os

from config import config
from utils import init_db
from routes import inventory_bp


def create_app(config_name='development'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PATCH", "DELETE"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Initialize database
    init_db(app)
    
    # Register blueprints
    app.register_blueprint(inventory_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({
            'success': True,
            'message': 'Food Donation API is running',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    
    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            'message': 'Food Donation Management System API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'inventory': '/api/inventory'
            }
        })
    
    return app


if __name__ == '__main__':
    # Get configuration from environment variable or use default
    config_name = os.environ.get('FLASK_ENV', 'development')
    app = create_app(config_name)
    
    # Run the application
    app.run(debug=app.config['DEBUG'], host='127.0.0.1', port=5000)