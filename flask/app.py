from flask import Flask, send_from_directory, send_file, redirect, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta
from flask_restx import Api, Resource, fields
from flask_cors import CORS

import os

app = Flask(__name__, static_folder=None)

app.config["JWT_SECRET_KEY"] = "secret"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "PUT", "DELETE"], headers="*")



@app.route('/')
def redirect_to_app():
    print("here")
    return send_file('web/index.html')

# @app.route('/')
# def index():
#     return redirect('/maristproject')




@app.route('/static/<path:path>')
def serve_static(path):
    print(path)
    return send_from_directory('web/static/', path)


# @app.route('/api/v1')
# def api_home():
#     return "Flask API Development in progress."


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    work = db.Column(db.String(10), default='')
    home = db.Column(db.String(10), default='')

    def __repr__(self):
        return f'[user {self.username}]'
    

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


user_schema = UserSchema()
users_schema = UserSchema(many=True)

jwt = JWTManager(app)


# Configure the Flask-RESTPlus extension
api = Api(app, title='API', doc= "/docs", prefix="/api", description='API Backend',security='Bearer Auth',
    authorizations={
        'Bearer Auth': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization'
        }
    })


user_preference_model = api.model('Preference', {
    'email': fields.String(required=True, description='The user email'),
    'work': fields.String(required=False, description='The user work address'),
    'home': fields.String(required=False, description='The user home language')
})
user_model = api.model('User', {
    'email': fields.String(required=True, description='The user email'),
    'password': fields.String(required=True, description='The user password')
})

registration_model = api.model('Registration', {
    'email': fields.String(required=True, description='The user name'),
    'password': fields.String(required=True, description='The user password')
    
})

with app.app_context():
    db.create_all()

@api.route('/preferences')
class Preference(Resource):
    @jwt_required()
    @api.response(200, 'Success')
    @api.response(401, 'Unauthorized')
    @api.response(404, 'User not found')
    @api.doc(description='Get user preferences')
    def get(self):
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()
        if user:
            user_found = user_schema.dump(user)
            return jsonify(user_found)
        else:
            return {'message': 'User not found'}, 404
        

    @jwt_required()
    @api.expect(user_preference_model)
    @api.response(200, 'Success')
    @api.response(401, 'Unauthorized')
    @api.response(404, 'User not found')
    @api.response(400, 'Bad Request')
    @api.doc(description='Update user preferences',security='Bearer Auth')
    def put(self):
        email = get_jwt_identity()
        user = User.query.filter_by(email=email).first()

        if not user:
            return {'message': 'User not found'}, 404
        work = request.json.get('work')
        home = request.json.get('home')
        

        if work:
            user.work = work
        if home:
            user.home = home

        try:
            db.session.commit()
            return {'message': 'User preferences updated successfully'}
        except IntegrityError:
            db.session.rollback()
            return {'error': 'Username already exists'}, 400






@api.route('/register')
class Registration(Resource):
    @api.doc(responses={
        200: 'Success',
        400: 'Validation Error',
    })
    @api.expect(registration_model, validate=True)
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user:
            api.abort(409, 'Email already exists')

        new_user = User(
            email=data['email'],
            password=generate_password_hash(data['password']),
        )

        
        db.session.add(new_user)
        db.session.commit()

    
        return user_schema.dump(new_user), 200
    

@api.route('/login')
class UserLogin(Resource):
    @api.doc(responses={
        200: 'Success',
        401: 'Invalid Credentials'
    })
    @api.expect(user_model)
    def post(self):
        data = request.json
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            token = create_access_token(identity=email)
            return {'token': token}

        return {'message': 'Invalid username or password'}, 401
    
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=80)