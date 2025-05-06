from flask import Flask, jsonify
from flask_cors import CORS  # Importa o CORS
import random

# Cria a instância da aplicação Flask
app = Flask(__name__)

# Configura o CORS para permitir qualquer origem (em desenvolvimento apenas)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/data')
def get_mock_entities():
    types = ["HOST", "SERVICE", "PROCESS_GROUP", "APPLICATION"]
    os_types = ["LINUX", "WINDOWS", "UNIX"]
    mock_entities = []

    for i in range(1, 21):
        entity = {
            "entityId": f"{random.choice(types)}-{1000 + i}",
            "type": random.choice(types),
            "displayName": f"Entity-{i:03}",
            "properties": {
                "ipAddresses": [f"192.168.{i % 255}.{i}"],
                "osType": random.choice(os_types),
                "memoryTotal": random.randint(4096, 32768),
                "cpuCores": random.randint(2, 32)
            },
            "fromRelationships": {
                "isRunningOn": [f"PROCESS_GROUP-{random.randint(1, 10)}"]
            },
            "tags": [
                {"key": "env", "value": random.choice(["dev", "qa", "prod"])},
                {"key": "team", "value": random.choice(["team-a", "team-b", "team-c"])}
            ],
            "firstSeenTimestamp": 1700000000000 + i * 1000000,
            "lastSeenTimestamp": 1705000000000 + i * 2000000
        }
        mock_entities.append(entity)

    return jsonify({
        "totalCount": len(mock_entities),
        "pageSize": 20,
        "entities": mock_entities
    })

if __name__ == '__main__':
    app.run(debug=True)
