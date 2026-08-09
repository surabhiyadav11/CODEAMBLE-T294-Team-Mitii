import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const API_BASE = "http://localhost:8000/api";

export default function HyperlocalWeather() {
  const [city, setCity] = useState("Pune");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/hyperlocal?city=${encodeURIComponent(city)}&lang=${encodeURIComponent(inputs.lang)}`);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch hyperlocal weather", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="space-y-6">
      <div className="card-shell p-6 bg-white/70">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Location</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <MapPin size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter your village or city" />
            </div>
          </div>
          <button 
            onClick={fetchWeather}
            disabled={loading}
            className="pill-button bg-forest px-6 py-2.5 text-white font-bold shadow-[0_10px_20px_rgba(30,81,40,0.2)] hover:-translate-y-0.5 hover:bg-forestSoft disabled:opacity-50 h-[46px]"
          >
            {loading ? 'Refreshing...' : 'Get Forecast'}
          </button>
        </div>
      </div>

      {loading && !weatherData && <div className="text-center py-10 text-maroon/70">Fetching precise weather conditions...</div>}

      {weatherData && (
        <>
          {/* Today's Summary */}
          <div className="card-shell p-6 bg-white/70">
            <div className="eyebrow mb-4">Today in {city}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-sky-50 p-4 rounded-xl text-center border border-sky-100">
            <div className="text-2xl font-black text-sky-800">{weatherData.today_summary.temp}</div>
            <div className="text-[10px] uppercase font-bold text-sky-600 tracking-widest mt-1">Temperature</div>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl text-center border border-sky-100">
            <div className="text-2xl font-black text-sky-800">{weatherData.today_summary.rain}</div>
            <div className="text-[10px] uppercase font-bold text-sky-600 tracking-widest mt-1">Rainfall</div>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl text-center border border-sky-100">
            <div className="text-2xl font-black text-sky-800">{weatherData.today_summary.uv}</div>
            <div className="text-[10px] uppercase font-bold text-sky-600 tracking-widest mt-1">UV Index</div>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl text-center border border-sky-100">
            <div className="text-2xl font-black text-sky-800">{weatherData.today_summary.wind}</div>
            <div className="text-[10px] uppercase font-bold text-sky-600 tracking-widest mt-1">Wind</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl text-center border border-amber-100">
            <div className="text-xl font-bold text-amber-800">{weatherData.today_summary.sunrise}</div>
            <div className="text-[10px] uppercase font-bold text-amber-600 tracking-widest mt-1">Sunrise</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl text-center border border-indigo-100">
            <div className="text-xl font-bold text-indigo-800">{weatherData.today_summary.sunset}</div>
            <div className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest mt-1">Sunset</div>
          </div>
        </div>
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl text-emerald-900 text-sm font-semibold">
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-emerald-800">AI Weather Alerts & Advice</div>
          <ul className="list-disc pl-4 space-y-1">
            {weatherData.alerts && weatherData.alerts.map((alert, idx) => (
              <li key={idx}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hourly Rain Probability */}
      <div className="card-shell p-6 bg-white/70">
        <div className="eyebrow mb-4">Hour-by-Hour Rain Probability</div>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max items-end h-32">
            {weatherData.hourly_rain.map((hour, idx) => (
              <div key={idx} className="flex flex-col items-center w-12 flex-shrink-0">
                <div className="text-xs font-bold text-sky-900 mb-1">{hour.rain_prob}%</div>
                <div 
                  className="w-full bg-sky-400 rounded-t-md opacity-80" 
                  style={{ height: `${Math.max(hour.rain_prob, 5)}px` }}
                ></div>
                <div className="text-[10px] font-bold text-maroon/60 mt-2">{hour.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 15-Day Forecast */}
      <div className="card-shell p-6 bg-white/70">
        <div className="eyebrow mb-4">15-Day Extended Forecast</div>
        <div className="space-y-2">
          {weatherData.daily_15_day.map((day, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 border-b border-creamLine last:border-0 hover:bg-white/50 transition-colors rounded-lg">
              <div className="font-bold text-forest w-1/4">{day.date}</div>
              <div className="text-sm font-semibold text-sky-800 w-1/4 text-center">{day.condition}</div>
              <div className="text-right w-1/4">
                <span className="font-black text-maroon mr-2">{day.high}°</span>
                <span className="font-medium text-maroon/50">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
