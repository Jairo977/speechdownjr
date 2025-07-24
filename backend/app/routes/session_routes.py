# Rutas de sesión
from flask import Blueprint, request, jsonify
from app.models.core import Session
from app import db

session_bp = Blueprint('session_bp', __name__)

@session_bp.route('/sessions', methods=['POST'])
def create_session():
    data = request.json
    session = Session(
        child_id=data['child_id'],
        activity_type=data['activity_type'],
        score=data.get('score'),
        feedback=data.get('feedback')
    )
    db.session.add(session)
    db.session.commit()
    return jsonify({'id': session.id, 'child_id': session.child_id, 'activity_type': session.activity_type, 'score': session.score, 'feedback': session.feedback}), 201

@session_bp.route('/sessions', methods=['GET'])
def get_sessions():
    sessions = Session.query.all()
    return jsonify([
        {'id': s.id, 'child_id': s.child_id, 'activity_type': s.activity_type, 'score': s.score, 'feedback': s.feedback}
        for s in sessions
    ])
