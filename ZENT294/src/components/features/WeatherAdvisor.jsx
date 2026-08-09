import React, { useState, useEffect } from 'react';
import { Sprout, MapPin, Search } from 'lucide-react';

const API_BASE = "http://localhost:8000/api";

export default function WeatherAdvisor() {
  const [inputs, setInputs] = useState({
    crop: 'Wheat',
    city: 'Solapur'
  ,
    lang: 'English'
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/advisor?crop=${encodeURIComponent(inputs.crop)}&city=${encodeURIComponent(inputs.city)}&lang=${encodeURIComponent(inputs.lang)}`);
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="card-shell p-6 bg-white/70 border border-forest/10 shadow-sm relative overflow-hidden">
        <div className="eyebrow mb-5 text-forest">Customize Advisor</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative z-10">
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Crop</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Sprout size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={inputs.crop} onChange={e => setInputs({...inputs, crop: e.target.value})} placeholder="e.g. Wheat" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">City/Location</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <MapPin size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={inputs.city} onChange={e => setInputs({...inputs, city: e.target.value})} placeholder="e.g. Solapur" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Language</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <select className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={inputs.lang} onChange={e => setInputs({...inputs, lang: e.target.value})}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Kannada">Kannada</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Bengali">Bengali</option>
                <option value="Punjabi">Punjabi</option>
              </select>
            </div>
          </div>
        </div>
        <button 
          onClick={fetchData}
          disabled={loading}
          className="pill-button flex items-center gap-2 bg-forest px-6 py-2.5 text-white font-bold shadow-md hover:-translate-y-0.5 hover:bg-forestSoft disabled:opacity-50"
        >
          <Search size={16} />
          {loading ? 'Fetching...' : 'Get Advice'}
        </button>
      </div>

      {loading && !data && <div className="text-center py-10 text-maroon/70">Loading real-time data...</div>}

      {data && (
        <>
          {/* 3-Day Forecast */}
          <div className="card-shell p-6 bg-white/70">
            <div className="eyebrow mb-4">3-Day Forecast for {inputs.city}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.forecast.map((day, idx) => (
                <div key={idx} className="bg-sky-50 border border-sky-100 p-4 rounded-2xl text-center">
                  <div className="text-sky-900 font-bold text-lg mb-1">{day.day}</div>
                  <div className="text-3xl font-black text-sky-700">{day.temp}°C</div>
                  <div className="text-sky-600 text-sm font-semibold mt-1">{day.condition}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Categorized Advice Cards */}
          <div className="card-shell p-6 bg-white/70">
            <div className="flex items-center justify-between mb-6">
              <div className="eyebrow">Actionable Advice for {inputs.crop}</div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                ${data.overall_status === 'Good' ? 'bg-emerald-100 text-emerald-800' :
                  data.overall_status === 'Caution' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'}`}>
                Overall: {data.overall_status}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {data.advice_categories.map((cat, idx) => {
                const colorClass = cat.color === 'green' ? 'border-emerald-200 bg-emerald-50 text-emerald-900' :
                                   cat.color === 'yellow' ? 'border-amber-200 bg-amber-50 text-amber-900' :
                                   'border-rose-200 bg-rose-50 text-rose-900';
                const badgeClass = cat.color === 'green' ? 'bg-emerald-200 text-emerald-900' :
                                   cat.color === 'yellow' ? 'bg-amber-200 text-amber-900' :
                                   'bg-rose-200 text-rose-900';
                
                return (
                  <div key={idx} className={`p-5 rounded-2xl border ${colorClass} transition-all duration-300 hover:shadow-soft`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold">{cat.title}</h4>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${badgeClass}`}>
                        {cat.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-90">{cat.advice}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
