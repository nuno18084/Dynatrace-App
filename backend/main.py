from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/data')
def get_mock_data():
    mock_entities = [
        {
            "EntityId": f"SERVICE-{i:04d}",
            "DisplayName": f"Service {i}",
            "Type": "SERVICE",
            "FirstSeen": 1700000000000 + i * 1000000,
            "LastSeen": 1705000000000 + i * 1000000,
            "Tags": ", ".join([f"tag{i % 5}", f"group{i % 3}"])
        }
        for i in range(1, 11)
    ]
    return jsonify(mock_entities)

if __name__ == '__main__':
    app.run(debug=True)