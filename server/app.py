from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
import os
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqllite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'a9b8f79ff7eb4a628de36661442081e8'

db = SQLAlchemy(app)

ma = Marshmallow(app)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    firstName = db.Column(db.String(12), nullable=False)
    lastName = db.Column(db.String(12), nullable=False)


class Semesters(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    season = db.Column(db.String(10), nullable=False)
    year = db.Column(db.Integer, nullable=False)


class Professors(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    lastName = db.Column(db.String(10), nullable=False)


class Classes(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(50), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    profID = db.Column(db.Integer, db.ForeignKey('professors.id'), nullable=False)
    semID = db.Column(db.Integer, db.ForeignKey('semesters.id'), nullable=False)
    hours = db.Column(db.Integer, nullable=False)
    professor = db.relationship('Professors', backref=db.backref('classes', lazy=True))
    semester = db.relationship('Semesters', backref=db.backref('classes', lazy=True))


class Enrollments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    grade = db.Column(db.String(2))

    enrolled_class = db.relationship('Classes', backref=db.backref('enrollments', lazy=True))
    enrolled_user = db.relationship('User', backref=db.backref('enrollments', lazy=True))


@app.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(username=data['username']).first()

    if user and check_password_hash(user.password, data['password']):
        token = jwt.encode({'user_id': user.id, 'exp': datetime.utcnow() + timedelta(minutes=30)},
                           app.config['SECRET_KEY'])
        return jsonify({'token': token})

    return make_response('Invalid username or password', 401)


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    firstName = data.get('first_name')
    lastName = data.get('last_name')

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return make_response(jsonify({'message': 'Username already exists'}), 400)

    hashed_password = generate_password_hash(password)

    new_user = User(username=username, password=hashed_password, firstName=firstName, lastName=lastName)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@app.route('/')
def run():
    return "{\"UP\"}"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(3000), debug=True)

