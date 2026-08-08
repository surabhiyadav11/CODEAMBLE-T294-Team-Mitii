def get_advice(crop, weather):
    """
    Returns a list of farming advice dicts based on crop name and weather data.
    Each advice dict has:
        - 'type': 'success' | 'warning' | 'danger'
        - 'icon': emoji icon
        - 'message': advice text
    """
    advice = []
    crop = crop.strip().lower()

    temp        = weather.get("temp", 25)
    humidity    = weather.get("humidity", 50)
    wind_speed  = weather.get("wind_speed", 10)
    rain_chance = weather.get("rain_chance", 0)   # from forecast, else 0
    description = weather.get("description", "").lower()

    # --- detect if rain is likely from description too ---
    is_rainy = rain_chance > 60 or any(
        word in description for word in ["rain", "drizzle", "shower", "storm", "thunderstorm"]
    )

    # ─────────────────────────────────────────────
    # 1. IRRIGATION ADVICE
    # ─────────────────────────────────────────────
    if is_rainy:
        advice.append({
            "type": "warning",
            "icon": "🌧️",
            "message": "Rain expected — skip irrigation today to avoid waterlogging."
        })
    elif humidity < 40 and temp > 32:
        advice.append({
            "type": "success",
            "icon": "💧",
            "message": "Low humidity + high temperature — irrigate early morning or evening."
        })
    elif humidity >= 40 and temp <= 32:
        advice.append({
            "type": "success",
            "icon": "✅",
            "message": "Good conditions — normal irrigation schedule is fine."
        })
    else:
        advice.append({
            "type": "success",
            "icon": "💧",
            "message": "Moderate conditions — irrigate if soil feels dry."
        })

    # ─────────────────────────────────────────────
    # 2. FERTILIZER ADVICE
    # ─────────────────────────────────────────────
    if is_rainy:
        advice.append({
            "type": "danger",
            "icon": "⚠️",
            "message": "Avoid fertilizer application — rain will wash it away (nutrient runoff)."
        })
    elif temp > 38:
        advice.append({
            "type": "danger",
            "icon": "🌡️",
            "message": "Temperature too high (>38°C) — do not apply fertilizer, it may burn the crop."
        })
    elif wind_speed > 25:
        advice.append({
            "type": "warning",
            "icon": "💨",
            "message": "High wind speed — delay fertilizer spraying to avoid drift."
        })
    else:
        advice.append({
            "type": "success",
            "icon": "✅",
            "message": "Safe conditions for fertilizer application."
        })

    # ─────────────────────────────────────────────
    # 3. SPRAYING / PESTICIDE ADVICE
    # ─────────────────────────────────────────────
    if wind_speed > 30:
        advice.append({
            "type": "danger",
            "icon": "🚫",
            "message": f"Wind speed is {wind_speed} km/h — do not spray pesticides (will drift away)."
        })
    elif is_rainy:
        advice.append({
            "type": "danger",
            "icon": "🌧️",
            "message": "Rain expected — postpone pesticide spraying, it will wash off immediately."
        })
    elif wind_speed <= 15 and not is_rainy:
        advice.append({
            "type": "success",
            "icon": "✅",
            "message": "Good conditions for pesticide/herbicide spraying."
        })
    else:
        advice.append({
            "type": "warning",
            "icon": "💨",
            "message": "Moderate wind — spray carefully in early morning when wind is low."
        })

    # ─────────────────────────────────────────────
    # 4. DISEASE / PEST RISK
    # ─────────────────────────────────────────────
    if humidity > 80 and temp > 20:
        advice.append({
            "type": "danger",
            "icon": "🦠",
            "message": "High humidity + warm temp — high risk of fungal disease. Monitor crops closely."
        })
    elif humidity > 70:
        advice.append({
            "type": "warning",
            "icon": "👁️",
            "message": "Moderate humidity — watch for early signs of fungal infection."
        })

    # ─────────────────────────────────────────────
    # 5. CROP-SPECIFIC ADVICE
    # ─────────────────────────────────────────────
    crop_advice = {
        "wheat": [
            (temp > 35, "danger",  "🌾", "Temperature above 35°C can cause heat stress in wheat — ensure adequate water."),
            (temp < 5,  "danger",  "❄️",  "Frost risk for wheat — cover young plants if possible."),
            (15 <= temp <= 25, "success", "🌾", "Ideal temperature range for wheat growth."),
        ],
        "rice": [
            (temp < 20, "warning", "🌾", "Temperature below 20°C slows rice growth — monitor closely."),
            (humidity < 50, "warning", "💧", "Rice needs high humidity — ensure field has enough standing water."),
            (20 <= temp <= 35 and humidity >= 60, "success", "✅", "Good conditions for rice cultivation."),  # type: ignore
        ],
        "cotton": [
            (temp > 40, "danger",  "🌿", "Extreme heat (>40°C) can damage cotton bolls."),
            (is_rainy,  "warning", "🌧️", "Excess rain can cause boll rot in cotton — ensure good drainage."),
            (25 <= temp <= 35, "success", "✅", "Ideal temperature for cotton growth."),
        ],
        "sugarcane": [
            (temp < 20, "warning", "🎋", "Cold weather slows sugarcane growth — growth resumes above 20°C."),
            (temp > 38, "warning", "🌡️", "Very high temp — irrigate sugarcane more frequently."),
        ],
        "soybean": [
            (temp > 35, "warning", "🌱", "High temp can reduce soybean pod set — irrigate during flowering."),
            (humidity > 85, "danger", "🦠", "Very high humidity increases risk of soybean rust disease."),
        ],
        "tomato": [
            (temp > 38, "danger",  "🍅", "Too hot for tomatoes — may cause flower drop above 38°C."),
            (temp < 10, "danger",  "❄️",  "Frost will damage tomato plants — protect with covers."),
            (18 <= temp <= 29, "success", "✅", "Ideal temperature range for tomato production."),
        ],
        "onion": [
            (humidity > 80, "warning", "🧅", "High humidity increases risk of purple blotch disease in onion."),
            (temp > 35, "warning", "🌡️", "High temperature may cause bolting (premature flowering) in onion."),
        ],
        "maize": [
            (temp > 38, "warning", "🌽", "Heat stress above 38°C can reduce maize pollination."),
            (temp < 10, "danger",  "❄️",  "Maize is sensitive to cold — protect seedlings."),
            (20 <= temp <= 32, "success", "✅", "Good temperature range for maize growth."),
        ],
    }

    # Check if we have specific advice for this crop
    matched_crop = None
    for key in crop_advice:
        if key in crop or crop in key:
            matched_crop = key
            break

    if matched_crop:
        for condition, adv_type, icon, message in crop_advice[matched_crop]:
            if condition:
                advice.append({
                    "type": adv_type,
                    "icon": icon,
                    "message": message
                })
    else:
        # Generic advice for unknown crops
        advice.append({
            "type": "warning",
            "icon": "🌿",
            "message": f"No specific data for '{crop.title()}' — general weather conditions apply."
        })

    # ─────────────────────────────────────────────
    # 6. HARVEST ADVICE
    # ─────────────────────────────────────────────
    if is_rainy:
        advice.append({
            "type": "danger",
            "icon": "🚜",
            "message": "Avoid harvesting today — wet conditions will damage crop quality."
        })
    elif wind_speed < 20 and not is_rainy and temp < 38:
        advice.append({
            "type": "success",
            "icon": "🚜",
            "message": "Good day for harvesting if crop is ready."
        })

    return advice


def get_overall_status(advice_list):
    """
    Returns overall farm status based on advice list.
    'good', 'caution', or 'alert'
    """
    types = [a["type"] for a in advice_list]
    if "danger" in types:
        return "alert"
    elif "warning" in types:
        return "caution"
    else:
        return "good"