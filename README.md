# 🌾 KisanMitra Agriculture Initiative

**A reliable, AI-powered partner for every farmer across India.**

KisanMitra is a comprehensive agricultural technology platform that bridges the gap between modern AI capabilities and traditional farming. It provides farmers with hyperlocal weather data, advanced harvest predictions, market prices, and a fully interactive bio-input wizard. Powered by the **Google Gemini API**, KisanMitra delivers intelligent, context-aware insights natively in multiple regional Indian languages to ensure accessibility for every farmer.

---

## ✨ Key Features

- 🌤️ **Hyperlocal Weather & Smart Alerts:** Get 15-day daily forecasts, 24-hour rain probabilities, and proactive AI-generated alerts for extreme weather conditions.
- 📈 **Harvest Prediction Engine:** Track crop growth stages and receive a 16-day harvest suitability forecast score.
- 🌍 **Satellite View & Soil Irrigation:** Analyze NDVI scores, vegetation health, and get a 7-day precise irrigation schedule based on your specific soil type.
- 💰 **APMC Market Prices:** Real-time mandi rates, MSP comparisons, and AI recommendations on whether to *Hold*, *Sell Now*, or wait.
- 🌱 **Organic Bio-Input Wizard:** Make your own Jeevamrut and Beejamrut! Tell the app what raw materials you have on hand, and it will generate a scaled recipe, fermentation timeline, and cost savings.
- 🤖 **Multilingual AI Chatbot:** An integrated conversational assistant powered by Gemini to answer complex farming queries in English, Hindi, Marathi, Telugu, Tamil, Kannada, Gujarati, Bengali, or Punjabi.

---

## 🛠️ Technology Stack

- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons
- **Backend:** Python, FastAPI, Uvicorn
- **AI/ML:** Google Gemini API (`gemini-flash-latest`), Pandas, Scikit-Learn

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (3.9 or higher)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/surabhiyadav11/CODEAMBLE-T294-Team-Mitii.git
cd CODEAMBLE-T294-Team-Mitii
```
2. Setup the Backend (FastAPI + AI)
```# Navigate to the backend directory (update folder name if needed)
cd KisanMitra 

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install the required Python packages
pip install fastapi uvicorn pydantic google-genai pandas joblib python-dotenv

# Set up your environment variables
# Create a .env file in the backend directory and add your API key:
echo "GEMINI_API_KEY=your_actual_api_key_here" > .env

# Run the backend server
python api.py
 ```
3. Setup the Frontend (React + Vite)
```# Navigate to the frontend directory
cd ZENT294

# Install Node.js dependencies
npm install

# Start the Vite development server
npm run dev

```
💻 Usage
Open your browser and go to the local frontend URL (e.g., http://localhost:5173).
Navigate through the dashboard to explore features like the Weather Advisor and Market Prices.
Use the Language Dropdown on any feature card to instantly switch the AI's advice to your preferred regional language!
Click the chat icon in the bottom right corner to speak with the KisanMitra AI assistant.

👥 Authors
Developed by second-year Computer Science (Software Engineering) students from Vishwakarma Institute Of Technology:

Shreyash Santosh Ghatekar
Surabhi Suhas Yadav
Made with ❤️ for the future of Indian Agriculture.


