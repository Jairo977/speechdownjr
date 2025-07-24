from app import create_app, db

app = create_app()

@app.cli.command("create-db")
def create_db():
    """Crear todas las tablas en la base de datos."""
    with app.app_context():
        db.create_all()
        print("Tablas creadas correctamente.")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
