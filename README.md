# Cryptocurrency Investment Risk Dashboard
A web-based dashboard for analyzing cryptocurrency investment risks and market trends. Provides data visualization, risk assessment, and real-time crypto market insights. 

## Features
- Real-time Crypto Market Data: fetches the latest cryptocurrency data. 
- Interactive Visualizations: Graphs for better insights. 
- API Integration: uses external APIs to gather crypto market data.

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: FastAPI, Python
- Database: SQLite, Pandas
- Visualization: Matplotlib, Plotly

## Installation & Usage
1. Clone the repository
```sh
git clone https://github.com/imsoeun/crypto-risk-dashboard.git
cd crypto-risk-dashboard

2. Install dependencies
pip install -r requirements.txt

3. Start the backend server
uvicorn main:app --reload
--> The backend server will start at http://127.0.0.1:8000

4. Start the frontend
cd frontend
npm install
npm start
--> Open http://localhost:3000
