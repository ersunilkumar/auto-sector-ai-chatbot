# 🚗 Auto Sector AI Chatbot

An AI-powered web application that answers automobile-related queries such as car mileage, pricing, specifications, insurance, and more.  
The project is built using a serverless backend on AWS and a lightweight frontend with real-time AI-powered responses.

---

## 📌 Project Overview

The **Auto Sector AI Chatbot** allows users to:
- Ask questions about cars, bikes, and other vehicles
- Use **voice input** for queries
- Receive **real-time answers** fetched from live web search data
- Store all user queries and responses securely in **DynamoDB**
- Access the application via a simple, responsive web UI

This project demonstrates **real-world DevOps and CloudOps practices**, including serverless architecture, API integration, and cloud-native storage.

---

## 🧱 Architecture

User Browser
|
| (HTTP Request)
v
Frontend (HTML + CSS + JS)
|
| fetch()
v
AWS API Gateway
|
v
AWS Lambda (Python)
|
├── SerpAPI (Live Search Data)
└── DynamoDB (Query Storage)


---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Glassmorphism UI + Blur background)
- JavaScript (Fetch API, Voice Input)

### Backend
- AWS Lambda (Python)
- AWS API Gateway (REST API)
- SerpAPI (Search-based AI responses)

### Database
- AWS DynamoDB (Free Tier, serverless)

### Cloud & DevOps
- AWS (Serverless Architecture)
- Git & GitHub (Version Control)
- (Upcoming) Docker, GitHub Actions, Kubernetes

---

## ✨ Features

- 🔍 Real-time automobile query responses
- 🎤 Voice-based query input
- 🌆 Dynamic background images (Auto sector themed)
- 🗃️ Query & response storage in DynamoDB
- ⚡ Serverless, scalable backend
- 🔐 CORS-enabled secure API access

---

## 📂 Project Structure

auto-sector-ai-chatbot/
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── backend/
│ └── lambda_function.py
│
├── README.md
└── .gitignore



---

## 🚀 How to Run Locally (Frontend)

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/auto-sector-ai-chatbot.git
   cd auto-sector-ai-chatbot/frontend

Open index.html using Live Server (VS Code recommended)

Ask queries like:

Mileage of Honda City

Price of Yamaha R15

Best mileage bike in India


☁️ Backend Deployment Summary

Lambda function handles query processing

API Gateway exposes /chat endpoint

SerpAPI fetches real-time answers

DynamoDB stores:

Query ID

Question

Answer

Timestamp

Source

🔐 Environment Variables (Lambda)
Variable Name	Description
SERPAPI_KEY	API key for SerpAPI
TABLE_NAME	DynamoDB table name


📈 Future Enhancements

Dockerize frontend using NGINX

CI/CD with GitHub Actions

Kubernetes deployment using Kind/Minikube

AWS Load Balancer + Route53

Admin dashboard for query analytics

Caching layer to reduce external API calls

🧠 Learning Outcomes

Serverless architecture design

REST API integration

Cloud-native storage with DynamoDB

Frontend–backend integration

Real-world DevOps workflow


👤 Author

Sunil Kumar
DevOps | AWS | Cloud Engineer
📍 India

⭐ If you like this project

Give it a ⭐ on GitHub and feel free to fork it!