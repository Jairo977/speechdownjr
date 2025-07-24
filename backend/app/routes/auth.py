from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash
from app.models.core import db, User

auth = Blueprint('auth', __name__)

@auth.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        session['user_id'] = user.id
        session['role'] = user.role
        return jsonify({'id': user.id, 'role': user.role, 'username': user.username}), 200
    return jsonify({'error': 'Credenciales inválidas'}), 401

@auth.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Sesión cerrada'})
