from app import create_app
from app.models.core import db

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        print("Eliminando todas las tablas...")
        db.drop_all()
        print("Creando todas las tablas...")
        db.create_all()
        print("¡Tablas recreadas correctamente!")
