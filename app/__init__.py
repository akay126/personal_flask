from flask import Flask
from flask_assets import Environment, Bundle
from flask_login import LoginManager

from flask_sqlalchemy import SQLAlchemy
from importlib import import_module

db = SQLAlchemy()
login_manager = LoginManager()


def register_extensions(app):
    db.init_app(app)
    login_manager.init_app(app)

def register_blueprints(app):
    module_name = 'base'
    module = import_module('app.{}.routes'.format(module_name))
    app.register_blueprint(module.blueprint)
    # for module_name in ('base'):
    #     module = import_module('app.{}.routes'.format(module_name))
    #     app.register_blueprint(module.blueprint)

def configure_database(app):

    @app.before_first_request
    def initialize_database():
        db.create_all()

    @app.teardown_request
    def shutdown_session(exception=None):
        db.session.remove()

def create_app(config):
    app = Flask(__name__,static_folder='base/static')
    app.config.from_object(config)
    register_extensions(app)
    register_blueprints(app)
    configure_database(app)
    # assets = Environment(app)
    # js = Bundle('base/static/css/.js', 'base.js', 'widgets.js',
    #         filters='jsmin', output='gen/packed.js')
    # assets.register('js_all', js)
    return app