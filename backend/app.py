from fastapi import FastAPI
from pydantic import BaseModel
import os
import urllib3
import json

app = FastAPI()
http = urllib3.PoolManager()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")

class Query(BaseModel):
    query: str

@app.post("/chat")
def chat(query: Query):
    if not SERPAPI_KEY:
        return {"answer": "SERPAPI key not configured."}

    url = (
        "https://serpapi.com/search.json"
        f"?q={query.query}"
        f"&engine=google"
        f"&api_key={SERPAPI_KEY}"
    )

    resp = http.request("GET", url)
    data = json.loads(resp.data.decode("utf-8"))

    if "answer_box" in data and "answer" in data["answer_box"]:
        answer = data["answer_box"]["answer"]
    elif "organic_results" in data and len(data["organic_results"]) > 0:
        answer = data["organic_results"][0].get("snippet", "No clear answer found.")
    else:
        answer = "No reliable data found."

    return {"answer": answer}
