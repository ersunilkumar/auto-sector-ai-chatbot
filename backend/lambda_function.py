import json
import os
import time
import uuid
import urllib3
import boto3
from datetime import datetime

# HTTP client
http = urllib3.PoolManager()

# Environment variables
SERPAPI_KEY = os.environ.get("SERPAPI_KEY")
TABLE_NAME = os.environ.get("TABLE_NAME", "AutoChatQueries")

# DynamoDB client
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    # Parse request body
    if "body" in event:
        body = json.loads(event["body"])
    else:
        body = event

    query = body.get("query", "").strip()

    if not query:
        return {
            "answer": "Please ask a valid question."
        }

    # Call SerpAPI
    url = (
        "https://serpapi.com/search.json"
        f"?q={query}"
        f"&engine=google"
        f"&api_key={SERPAPI_KEY}"
    )

    response = http.request("GET", url)
    data = json.loads(response.data.decode("utf-8"))

    # Extract answer
    if "answer_box" in data and "answer" in data["answer_box"]:
        answer = data["answer_box"]["answer"]
        source = "answer_box"
    elif "organic_results" in data and len(data["organic_results"]) > 0:
        answer = data["organic_results"][0].get(
            "snippet", "No clear answer found."
        )
        source = "organic_result"
    else:
        answer = "No reliable data found."
        source = "none"

    # Prepare DynamoDB item
    item = {
        "query_id": str(uuid.uuid4()),
        "question": query,
        "answer": answer,
        "source": "web-ui",
        "timestamp": datetime.utcnow().isoformat()
    }

    # Store in DynamoDB
    table.put_item(Item=item)

    # Return response
    return {
        "answer": answer
    }
