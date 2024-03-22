import random
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
import os
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

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
    classDesc=db.Columns(db.String(100), nullable=False)
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


def generate_random_id():
    while True:
        random_id = random.randint(10000, 99999)
        if not User.query.filter_by(id=random_id).first():
            return random_id


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
    new_user.id = generate_random_id()
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@app.route('/user-info')
def get_user_info():
    token = request.headers.get('Authorization').split()[1]
    user_id = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])['user_id']

    user = User.query.get(user_id)
    print("I am getting called")

    return jsonify({
        'id': user.id,
        'username': user.username,
        'firstName': user.firstName,
        'lastName': user.lastName
    })

@app.route('/')
def run():
    return jsonify({
        'status':"UP"
    })


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(3000), debug=True)

