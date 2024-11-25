import os

class Config:
    API_KEY = os.environ.get('API_KEY', 'you-will-never-guess')
    DEBUG = os.environ.get('DEBUG', 'True') == 'True'
    PATCH_VERSION = '14.22.1'
