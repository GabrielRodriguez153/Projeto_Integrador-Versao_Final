from flask_restful import Resource
from flask import request, make_response, jsonify
from ..services.integration_mobile_service import MobileIntegrationService
import secrets

class MobileWebhook(Resource):
    
    def post(self):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not self.validar_token(auth_header):
            return make_response(jsonify({"error": "Não autorizado"}), 401)
        
        data = request.get_json()
        
        required_fields = ['resultado', 'confianca']
        if not all(field in data for field in required_fields):
            return make_response(jsonify({
                "error": f"Campos obrigatórios: {', '.join(required_fields)}"
            }), 400)
        
        case_id = MobileIntegrationService.process_mobile_data(data)
        
        if case_id:
            return make_response(jsonify({
                "message": "Caso criado com sucesso",
                "case_id": case_id
            }), 201)
        else:
            return make_response(jsonify({
                "error": "Erro ao processar dados do mobile"
            }), 500)
    
    def validar_token(self, auth_header):
        expected_token = f"Bearer {secrets.token_urlsafe(32)}"  
        return auth_header == expected_token