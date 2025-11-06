from .. import mongo
from bson import ObjectId
from datetime import datetime
import hashlib

class MobileIntegrationService:
    
    @staticmethod
    def process_mobile_data(mobile_data):
        try:
            nivel_infestacao = MobileIntegrationService.map_prediction_to_infestation(
                mobile_data['resultado']
            )
            
            case_data = {
                'localizacao': mobile_data['location'],
                'nivelInfestacao': nivel_infestacao,
                'status': 'pendente',
                'dataDeteccao': datetime.utcnow().isoformat(),
                'proprietario': mobile_data['user_id'],
                'observacoes': f"Detecção automática via mobile: {mobile_data['resultado']} (Confiança: {mobile_data['confianca']}%)",
                'hectares': 1.0,  
                'qtdMudas': 50,   
                'umidade': 75.0,  
                'fonte': 'mobile',  
                'image_hash': MobileIntegrationService.generate_image_hash(mobile_data.get('image_data', '')),
            }
            
            result = mongo.db.cases.insert_one(case_data)
            
            MobileIntegrationService.create_notification(
                mobile_data['user_id'],
                f"Nova detecção em {mobile_data['location']}: {mobile_data['resultado']}"
            )
            
            return str(result.inserted_id)
            
        except Exception as e:
            print(f"Erro ao processar dados mobile: {str(e)}")
            return None
    
    @staticmethod
    def map_prediction_to_infestation(prediction):
        mapping = {
            'Planta saudável': 'Saudável',
            'Planta doente': 'Crítico'
        }
        return mapping.get(prediction, 'Moderado')
    
    @staticmethod
    def generate_image_hash(image_data):
        if image_data:
            return hashlib.md5(image_data.encode()).hexdigest()
        return ""
    
    @staticmethod
    def create_notification(user_id, message):
        notification_data = {
            'message': message,
            'user_id': user_id,
            'type': 'detection',
            'read': False,
            'timestamp': datetime.utcnow()
        }
        mongo.db.notifications.insert_one(notification_data)