from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_pymongo import PyMongo
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

from .config import Config
from .utils.validation_errors import register_validation_errors

jwt = JWTManager()
load_dotenv()
mongo = PyMongo()
ma = Marshmallow()

def create_app():
  app = Flask(__name__)
  app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
  register_validation_errors(app)
  app.config.from_object(Config)
  jwt.init_app(app)

  CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], "allow-headers":["Content-Type", "Authorization"], "supports_credentials": True}})
  mongo.init_app(app)
  ma.init_app(app)
  

  from .resources.auth import Login
  from .resources.users import UserDetail, UserList
  from .resources.case import CaseDetail, CaseList
  from .resources.notifications import NotificationDetail, NotificationList

  api = Api(app)

  api.add_resource(Login, '/api/login') 
  api.add_resource(UserList, '/api/users') 
  api.add_resource(UserDetail, '/api/users/<id>') 
  api.add_resource(CaseList, '/api/case') 
  api.add_resource(CaseDetail, '/api/case/<id>') 
  api.add_resource(NotificationList, '/api/notifications') 
  api.add_resource(NotificationDetail, '/api/notifications/<id>')

  @app.route('/')
  def index():
      return jsonify({"message": "API Funcionando"})
  
  @app.route('/api/test', methods=['GET', 'OPTIONS', 'POST'])
  @cross_origin()
  def test_cors():
     return jsonify({"message": "CORS OK"}), 200
  
  return app