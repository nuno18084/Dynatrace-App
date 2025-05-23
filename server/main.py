from flask import Flask, jsonify, request, make_response
import random
import pandas as pd

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/api/data', methods=['GET', 'OPTIONS'])
def get_mock_entities():
    if request.method == "OPTIONS":
        return make_response("OK", 200)

    # Obter os filtros do query string
    env_filter = request.args.get('env')
    api_filter = request.args.get('api')
    column_filter = request.args.getlist('columns')  # recebe lista ?columns=A&columns=B

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
                {"key": "api", "value": random.choice(["Entities", "V1", "V2"])}
            ],
            "firstSeenTimestamp": 1700000000000 + i * 1000000,
            "lastSeenTimestamp": 1705000000000 + i * 2000000
        }
        mock_entities.append(entity)

    df = pd.json_normalize(mock_entities)

    # Expand tags
    def extract_tags(row):
        tag_dict = {}
        for tag in row.get("tags", []):
            key = f"tag_{tag.get('key')}"
            tag_dict[key] = tag.get("value")
        return pd.Series(tag_dict)

    tag_df = df.apply(extract_tags, axis=1)
    df = pd.concat([df.drop(columns=["tags"]), tag_df], axis=1)

    # Flatten arrays
    df["fromRelationships.isRunningOn"] = df["fromRelationships.isRunningOn"].apply(
        lambda x: ", ".join(x) if isinstance(x, list) else x
    )
    df["properties.ipAddresses"] = df["properties.ipAddresses"].apply(
        lambda x: ", ".join(x) if isinstance(x, list) else x
    )

    # ❗ Filtrar
    if env_filter:
        df = df[df["tag_env"] == env_filter]
    if api_filter:
        df = df[df["tag_api"] == api_filter]
    if column_filter:
        df = df[column_filter] if all(col in df.columns for col in column_filter) else df

    return jsonify({
        "totalCount": len(df),
        "pageSize": 20,
        "entities": df.to_dict(orient="records")
    })

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
