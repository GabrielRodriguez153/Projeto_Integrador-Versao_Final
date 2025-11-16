from flask_restful import Resource
from flask import make_response, jsonify, request
from flask_jwt_extended import create_access_token

from api.services.user_service import UserService
from api.schemas.user_schema import UserSchema

class Login(Resource):
  def post(self):
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
      return make_response(jsonify({
        'message': 'Email e senha são obrigatórios'
      }), 401)
    
    user = UserService.validate_login(email, password)
    if user:
      token = create_access_token(identity=user['id'])
      user_schema = UserSchema()
      user_data = user_schema.dump(user)
      user_data.pop('password', None)

      return make_response(jsonify({
        'message': 'Login realizado com sucesso',
        'token': token,
        'user': user_data
      }), 200)
    else:
      return make_response(jsonify({
        'message': 'Email ou senha inválidos'
      }), 400)