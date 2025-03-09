import requests
url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    btc_price = data["bitcoin"]["usd"]  
    print(f"Current Bitcoin price: ${btc_price}")
else:
    print(f"Failed to fetch data. HTTP Status Code: {response.status_code}")