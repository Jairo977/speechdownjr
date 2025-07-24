from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'terapeuta' o 'padre'
    children = db.relationship(
        'ChildProfile',
        backref='parent',
        lazy=True,
        foreign_keys='ChildProfile.parent_id'
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ChildProfile(db.Model):
    __tablename__ = 'child_profiles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    diagnosis = db.Column(db.String(120), nullable=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sessions = db.relationship('Session', backref='child', lazy=True)

class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child_profiles.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    activity = db.Column(db.Text, nullable=False)
    result = db.Column(db.String(120), nullable=True)
    progress = db.relationship('Progress', backref='session', lazy=True)

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'), nullable=False)
    metric = db.Column(db.String(80), nullable=False)
    value = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
