from flask import Flask, jsonify, request, make_response
import random
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

def generate_metrics():
    return {
        "cpu_usage": round(random.uniform(0, 100), 2),
        "memory_usage": round(random.uniform(0, 100), 2),
        "disk_usage": round(random.uniform(0, 100), 2),
        "network_throughput": random.randint(100, 10000),
        "response_time": random.randint(10, 1000),
        "error_rate": round(random.uniform(0, 5), 2),
        "availability": round(random.uniform(95, 100), 2),
        "apdex_score": round(random.uniform(0.7, 1.0), 2),
        "requests_per_minute": random.randint(100, 5000),
        "active_sessions": random.randint(10, 1000)
    }

@app.route('/api/data', methods=['GET', 'OPTIONS'])
def get_mock_entities():
    if request.method == "OPTIONS":
        return make_response("OK", 200)

    try:
        test_entities = []
        types = ["HOST", "SERVICE", "PROCESS_GROUP", "APPLICATION"]
        environments = ["dev", "qa", "staging", "prod"]
        regions = ["EU-WEST", "EU-CENTRAL", "US-EAST", "US-WEST", "ASIA-EAST", "ASIA-SOUTH"]
        teams = ["platform", "frontend", "backend", "mobile", "data", "security"]
        technologies = ["Java", "Python", "Node.js", "Go", ".NET", "PHP"]
        cloud_providers = ["AWS", "Azure", "GCP", "On-Premise"]
        
        for i in range(100):  # Generate 100 entities
            entity_type = random.choice(types)
            current_time = datetime.now()
            
            entity = {
                "entityId": f"{entity_type}-{1000 + i}",
                "type": entity_type,
                "displayName": f"{entity_type.lower()}-{i:03d}",
                "status": random.choice(["HEALTHY", "WARNING", "CRITICAL", "UNKNOWN"]),
                "properties": {
                    "technology": random.choice(technologies),
                    "version": f"{random.randint(1,5)}.{random.randint(0,9)}.{random.randint(0,9)}",
                    "cloud_provider": random.choice(cloud_providers),
                    "instance_size": random.choice(["small", "medium", "large", "xlarge"]),
                    "deployment_type": random.choice(["container", "vm", "serverless", "physical"]),
                    "maintenance_window": random.choice(["none", "daily", "weekly", "monthly"]),
                    "backup_status": random.choice(["success", "failed", "pending", "none"]),
                    "ssl_expiry": (current_time + timedelta(days=random.randint(1, 365))).isoformat(),
                    "last_deployment": (current_time - timedelta(days=random.randint(1, 30))).isoformat(),
                    "cost_center": f"CC-{random.randint(1000, 9999)}"
                },
                "metrics": generate_metrics(),
                "tags": [
                    {"key": "env", "value": random.choice(environments)},
                    {"key": "region", "value": random.choice(regions)},
                    {"key": "team", "value": random.choice(teams)},
                    {"key": "criticality", "value": random.choice(["high", "medium", "low"])},
                    {"key": "business_unit", "value": random.choice(["retail", "banking", "healthcare", "technology"])},
                    {"key": "compliance", "value": random.choice(["pci", "hipaa", "gdpr", "sox", "none"])}
                ],
                "relationships": {
                    "depends_on": [f"{random.choice(types)}-{random.randint(1000, 2000)}" for _ in range(random.randint(1, 5))],
                    "used_by": [f"{random.choice(types)}-{random.randint(1000, 2000)}" for _ in range(random.randint(1, 5))]
                },
                "firstSeenTimestamp": int((current_time - timedelta(days=random.randint(1, 365))).timestamp() * 1000),
                "lastSeenTimestamp": int(current_time.timestamp() * 1000),
                "lastUpdated": current_time.isoformat(),
                "monitoringCoverage": random.randint(50, 100)
            }
            test_entities.append(entity)

        # Convert to DataFrame
        df = pd.json_normalize(test_entities)
        
        # Extract tags
        def extract_tags(row):
            tag_dict = {}
            for tag in row.get("tags", []):
                key = f"tag_{tag.get('key')}"
                tag_dict[key] = tag.get("value")
            return pd.Series(tag_dict)

        tag_df = df.apply(extract_tags, axis=1)
        df = pd.concat([df.drop(columns=["tags"]), tag_df], axis=1)

        # Flatten nested structures
        for col in df.columns:
            if isinstance(df[col].iloc[0], (list, dict)):
                df[col] = df[col].apply(lambda x: str(x) if x else None)

        result = {
            "totalCount": len(df),
            "pageSize": len(df),
            "entities": df.to_dict(orient="records")
        }

        return jsonify(result)

    except Exception as e:
        print(f"Error in get_mock_entities: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='127.0.0.1', port=5000)
