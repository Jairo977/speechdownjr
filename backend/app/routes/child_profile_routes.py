# Rutas de perfil de niño
from flask import Blueprint, request, jsonify
from app.models.core import ChildProfile
from app import db

child_profile_bp = Blueprint('child_profile_bp', __name__)

@child_profile_bp.route('/children', methods=['POST'])
def create_child_profile():
    data = request.json
    child = ChildProfile(
        name=data['name'],
        age=data['age'],
        parent_id=data['parent_id']
    )
    db.session.add(child)
    db.session.commit()
    return jsonify({'id': child.id, 'name': child.name, 'age': child.age, 'parent_id': child.parent_id}), 201

@child_profile_bp.route('/children', methods=['GET'])
def get_children():
    children = ChildProfile.query.all()
    return jsonify([
        {'id': c.id, 'name': c.name, 'age': c.age, 'parent_id': c.parent_id}
        for c in children
    ])
