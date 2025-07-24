# Configuración de la app
import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = (
        'postgresql+pg8000://{user}:{password}@{host}:{port}/{db}'
        .format(
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD'),
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=os.getenv('POSTGRES_PORT', 5433),
            db=os.getenv('POSTGRES_DB', 'speechdown')
        )
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY', '')
    GOOGLE_TTS_API_KEY = os.getenv('GOOGLE_TTS_API_KEY', '')
    SECRET_KEY = os.getenv('SECRET_KEY', 'speechdown-secret-key')
