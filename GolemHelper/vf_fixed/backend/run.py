from app import create_app

app = create_app()
application = app  # For compatibility with WSGI servers

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=app.config['DEBUG'])