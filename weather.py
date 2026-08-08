import requests

API_KEY = "2302e49936d99dc66df338c1d31b9bb1"   # <-- paste your OpenWeatherMap API key here
BASE_URL = "https://api.openweathermap.org/data/2.5/"


def get_current_weather(city):
    """
    Fetches current weather for a given city.
    Returns a dictionary with weather data, or None if city not found.
    """
    url = f"{BASE_URL}weather?q={city}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        if data.get("cod") != 200:
            return None  # city not found or API error

        weather = {
            "city":        data["name"],
            "country":     data["sys"]["country"],
            "temp":        round(data["main"]["temp"], 1),
            "feels_like":  round(data["main"]["feels_like"], 1),
            "humidity":    data["main"]["humidity"],
            "wind_speed":  round(data["wind"]["speed"] * 3.6, 1),  # convert m/s → km/h
            "description": data["weather"][0]["description"].capitalize(),
            "icon":        data["weather"][0]["icon"],
            "pressure":    data["main"]["pressure"],
            "visibility":  round(data.get("visibility", 0) / 1000, 1),  # convert m → km
        }
        return weather

    except requests.exceptions.RequestException:
        return None  # network error


def get_forecast(city):
    """
    Fetches 3-day forecast for a given city.
    Returns a list of daily summaries, or empty list on error.
    """
    url = f"{BASE_URL}forecast?q={city}&appid={API_KEY}&units=metric&cnt=24"

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        if data.get("cod") != "200":
            return []

        # Group by day — pick one reading per day (noon slot closest)
        seen_dates = []
        forecast_list = []

        for item in data["list"]:
            date_str = item["dt_txt"].split(" ")[0]  # "2024-06-01"
            time_str = item["dt_txt"].split(" ")[1]  # "12:00:00"

            if date_str not in seen_dates and time_str == "12:00:00":
                seen_dates.append(date_str)
                forecast_list.append({
                    "date":        date_str,
                    "temp_max":    round(item["main"]["temp_max"], 1),
                    "temp_min":    round(item["main"]["temp_min"], 1),
                    "humidity":    item["main"]["humidity"],
                    "description": item["weather"][0]["description"].capitalize(),
                    "icon":        item["weather"][0]["icon"],
                    "rain_chance": round(item.get("pop", 0) * 100),  # probability of precipitation
                    "wind_speed":  round(item["wind"]["speed"] * 3.6, 1),
                })

                if len(forecast_list) == 3:  # only need 3 days
                    break

        return forecast_list

    except requests.exceptions.RequestException:
        return []