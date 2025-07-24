
# Rutas de usuario
from flask import Blueprint, request, jsonify
from app.models.core import User
from app import db

user_bp = Blueprint('user_bp', __name__)

# Importar servicios después de definir user_bp
from app.services.ai_service import generate_speech_exercise, generate_gemini_exercise, gemini_text_to_speech



@user_bp.route('/users', methods=['POST'])
def register_user():
    data = request.json
    user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],  # En producción, hashear la contraseña
        role=data.get('role', 'parent')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email, 'role': user.role}), 201
# Endpoint para generar ejercicio con Gemini
@user_bp.route('/ai/gemini-generate-exercise', methods=['POST'])
def gemini_generate_exercise():
    data = request.json
    prompt = data.get('prompt', '')
    result = generate_gemini_exercise(prompt)
    return jsonify(result)

# Endpoint para síntesis de texto a voz con Gemini (simulado)
@user_bp.route('/ai/gemini-speech', methods=['POST'])
def gemini_speech():
    data = request.json
    text = data.get('text', '')
    result = gemini_text_to_speech(text)
    return jsonify(result)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([
        {'id': u.id, 'username': u.username, 'email': u.email, 'role': u.role}
        for u in users
    ])

# Endpoint para generar ejercicio de habla con IA
@user_bp.route('/ai/generate-exercise', methods=['POST'])
def ai_generate_exercise():
    data = request.json
    prompt = data.get('prompt', '')
    result = generate_speech_exercise(prompt)
    return jsonify(result)

# Endpoint para síntesis de texto a voz
@user_bp.route('/ai/speech', methods=['POST'])
def ai_speech():
    data = request.json
    text = data.get('text', '')
    result = gemini_text_to_speech(text)
    return jsonify(result)
