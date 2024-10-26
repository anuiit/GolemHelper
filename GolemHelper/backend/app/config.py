import os

class Config:
    API_KEY = os.environ.get('API_KEY') or 'you-will-never-guess'
    print(API_KEY)
    DEBUG = os.environ.get('DEBUG') or True
    PATCH_VERSION = '14.21.1'
