import os
from   os import environ

class Config(object):

    basedir    = os.path.abspath(os.path.dirname(__file__))
    
    SECRET_KEY = 'key'

    MAPBOX_ACCESS_KEY = 'pk.eyJ1IjoiYmVybmNvb2wiLCJhIjoiY2oyMzh1emZtMDB0MjM3cWltZGx6cmk0ciJ9.Q6kd7Y7rxkX43cWlZlB2bQ'
    # MYSQL_HOST = 'localhost'
    # MYSQL_USER = 'root'
    # MYSQL_PASSWORD = 'begu123'
    # MYSQL_DB = 'xstorm'
    # MYSQL_CURSORCLASS = 'DictCursor'
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:begu123@localhost/xstrom'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///xstorm.db'

    # This will create a file in <app> FOLDER
    # SQLALCHEMY_DATABASE_URI = 'SQLALCHEMY_DATABASE_URI:///' + os.path.join(basedir, 'database.db')


    # For 'in memory' database, please use:
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # THEME SUPPORT
    #  if set then url_for('static', filename='', theme='')
    #  will add the theme name to the static URL:
    #    /static/<DEFAULT_THEME>/filename
    # DEFAULT_THEME = "themes/dark"
    DEFAULT_THEME = None


class ProductionConfig(Config):
    DEBUG = False

    # Security
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600

    # PostgreSQL database
    SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}:{}/{}'.format(
        environ.get('APPSEED_DATABASE_USER', 'appseed'),
        environ.get('APPSEED_DATABASE_PASSWORD', 'appseed'),
        environ.get('APPSEED_DATABASE_HOST', 'db'),
        environ.get('APPSEED_DATABASE_PORT', 5432),
        environ.get('APPSEED_DATABASE_NAME', 'appseed')
    )


class DebugConfig(Config):
    DEBUG = True


config_dict = {
    'Production': Config,
    'Debug': DebugConfig
}
