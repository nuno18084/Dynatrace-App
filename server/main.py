from flask import Flask, jsonify
from flask_cors import CORS
import random
import pandas as pd

app = Flask(__name__)
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

    # Flatten top-level JSON fields
    df = pd.json_normalize(mock_entities)

    # Expand tags: convert list of dicts into individual columns
    def extract_tags(row):
        tag_dict = {}
        for tag in row.get("tags", []):
            key = f"tag_{tag.get('key')}"
            tag_dict[key] = tag.get("value")
        return pd.Series(tag_dict)

    tag_df = df.apply(extract_tags, axis=1)
    df = pd.concat([df.drop(columns=["tags"]), tag_df], axis=1)

    # Flatten list fields
    if "fromRelationships.isRunningOn" in df.columns:
        df["fromRelationships.isRunningOn"] = df["fromRelationships.isRunningOn"].apply(
            lambda x: ", ".join(x) if isinstance(x, list) else x
        )

    if "properties.ipAddresses" in df.columns:
        df["properties.ipAddresses"] = df["properties.ipAddresses"].apply(
            lambda x: ", ".join(x) if isinstance(x, list) else x
        )

    # Optional: flatten nested dictionary fields (already mostly done by json_normalize)
    # Convert to JSON format
    return jsonify({
        "totalCount": len(df),
        "pageSize": 20,
        "entities": df.to_dict(orient="records")
    })

if __name__ == '__main__':
    app.run(debug=True)
