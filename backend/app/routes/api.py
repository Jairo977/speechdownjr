from flask import Blueprint, request, jsonify
from app.models.core import db, User, ChildProfile, Session, Progress
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Usuarios
@api.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(username=data['username'], email=data['email'], password=data['password'], role=data['role'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id, 'username': user.username, 'role': user.role}), 201

@api.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': u.id, 'username': u.username, 'role': u.role} for u in users])

# Perfiles de niños
@api.route('/api/children', methods=['POST'])
def create_child():
    data = request.json
    child = ChildProfile(name=data['name'], age=data['age'], diagnosis=data.get('diagnosis'), parent_id=data['parent_id'])
    db.session.add(child)
    db.session.commit()
    return jsonify({'id': child.id, 'name': child.name}), 201

@api.route('/api/children', methods=['GET'])
def get_children():
    children = ChildProfile.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'age': c.age, 'diagnosis': c.diagnosis, 'parent_id': c.parent_id} for c in children])

# Sesiones/Actividades
@api.route('/api/sessions', methods=['POST'])
def create_session():
    data = request.json
    session = Session(child_id=data['child_id'], activity=data['activity'], result=data.get('result'))
    db.session.add(session)
    db.session.commit()
    return jsonify({'id': session.id, 'activity': session.activity}), 201

@api.route('/api/sessions', methods=['GET'])
def get_sessions():
    sessions = Session.query.all()
    return jsonify([{'id': s.id, 'child_id': s.child_id, 'date': s.date, 'activity': s.activity, 'result': s.result} for s in sessions])

# Progreso
@api.route('/api/progress', methods=['POST'])
def create_progress():
    data = request.json
    progress = Progress(session_id=data['session_id'], metric=data['metric'], value=data['value'])
    db.session.add(progress)
    db.session.commit()
    return jsonify({'id': progress.id, 'metric': progress.metric, 'value': progress.value}), 201

@api.route('/api/progress', methods=['GET'])
def get_progress():
    progress = Progress.query.all()
    return jsonify([{'id': p.id, 'session_id': p.session_id, 'metric': p.metric, 'value': p.value, 'timestamp': p.timestamp} for p in progress])
