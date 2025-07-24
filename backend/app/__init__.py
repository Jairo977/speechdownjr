
from flask import Flask

from app.models.core import db
from dotenv import load_dotenv
import os
from .config import Config


def create_app():
    # Cargar variables de entorno desde .env
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    # Importar y registrar blueprints
    from app.routes.user_routes import user_bp
    from app.routes.child_profile_routes import child_profile_bp
    from app.routes.session_routes import session_bp
    from app.routes.api import api
    from app.routes.auth import auth
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(child_profile_bp)
    app.register_blueprint(session_bp)
    app.register_blueprint(api)
    app.register_blueprint(auth)

    return app
