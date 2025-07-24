
from app.models.core import db, User
from werkzeug.security import generate_password_hash
from app import create_app

def create_superuser():
    username = input("Usuario superadmin: ")
    email = input("Email: ")
    password = input("Contraseña: ")
    if User.query.filter_by(username=username).first():
        print("Ya existe un usuario con ese nombre.")
        return
    user = User(username=username, email=email, password=password, role="admin")
    db.session.add(user)
    db.session.commit()
    print("Superusuario creado con éxito.")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        create_superuser()
