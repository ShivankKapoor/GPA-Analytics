from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
import os

app = Flask(__name__)
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

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(username=data['username']).first()

    if user and check_password_hash(user.password, data['password']):
        token = jwt.encode({'user_id': user.id, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'])
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


if __name__ == '__main__':
    app.run(debug=True)