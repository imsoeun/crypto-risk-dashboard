from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import requests
from database import SessionLocal, CryptoPrice

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Welcome to the Crypto API"}

@app.post("/save_price/")  
def save_price(db: Session = Depends(get_db)):
    response = requests.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
    price = response.json()["bitcoin"]["usd"]
    
    new_price = CryptoPrice(price=price)
    db.add(new_price)
    db.commit()
    
    return {"message": "Price saved successfully!", "price": price}

import numpy as np
@app.get("/volatility/")
def get_rolling_volatility(db: Session = Depends(get_db), window_size: int = 10):
	prices = db.query(CryptoPrice.price).all()
	prices = [p[0] for p in prices]

	if len(prices) < 2:
		return {"message": "Not enough data to calculate volatility"}
	if len(prices) > window_size:
		prices = prices[-window_size:]

	volatility = np.std(prices)
	
	return {"rolling_volatility": volatility, "window_size": window_size}

import requests
from fastapi import FastAPI

app = FastAPI()

COIN_API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"

@app.get("/bitcoin_price/")
def get_bitcoin_price():
    response = requests.get(COIN_API_URL)
    data = response.json()
    return {"bitcoin_price": data["bitcoin"]["usd"]}
