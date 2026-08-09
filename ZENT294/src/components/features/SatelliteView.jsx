import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const API_BASE = "http://localhost:8000/api";

export default function SatelliteView() {
  const [coords, setCoords] = useState({ lat: '17.6599', lon: '75.9064' });
  const [satData, setSatData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSatellite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/satellite?lat=${encodeURIComponent(coords.lat)}&lon=${encodeURIComponent(coords.lon)}&lang=${encodeURIComponent(inputs.lang)}`);
      const data = await res.json();
      setSatData(data);
    } catch (error) {
      console.error("Failed to fetch satellite data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSatellite();
  }, []);

  return (
    <div className="space-y-6">
      <div className="card-shell p-6 bg-white/70">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Latitude</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <MapPin size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={coords.lat} onChange={e => setCoords({...coords, lat: e.target.value})} placeholder="17.6599" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Longitude</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <MapPin size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={coords.lon} onChange={e => setCoords({...coords, lon: e.target.value})} placeholder="75.9064" />
            </div>
          </div>
          <button 
            onClick={fetchSatellite}
            disabled={loading}
            className="pill-button bg-forest px-6 py-2.5 text-white font-bold shadow-[0_10px_20px_rgba(30,81,40,0.2)] hover:-translate-y-0.5 hover:bg-forestSoft disabled:opacity-50 h-[46px]"
          >
            {loading ? 'Refreshing...' : 'Analyze Image'}
          </button>
        </div>
      </div>

      {loading && !satData && <div className="text-center py-10 text-maroon/70">Fetching satellite imagery...</div>}

      {satData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: NDVI & Weather Summary */}
        <div className="space-y-6 lg:col-span-1">
          <div className="card-shell p-6 bg-white/70 text-center">
            <div className="eyebrow mb-2">Vegetation Health Index (NDVI)</div>
            <div className="text-6xl font-black text-forest my-4">{satData.ndvi_score}</div>
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase
              ${satData.health_color === 'green' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                satData.health_color === 'yellow' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                'bg-rose-100 text-rose-800 border border-rose-200'}`}>
              {satData.health_rating}
            </div>
          </div>

          <div className="card-shell p-6 bg-white/70">
            <div className="eyebrow mb-4">30-Day Water Balance</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-creamLine pb-2">
                <span className="text-sm font-semibold text-maroon/70">Rainfall</span>
                <span className="font-bold text-sky-700">{satData.weather_30_day.rainfall_mm} mm</span>
              </div>
              <div className="flex justify-between items-center border-b border-creamLine pb-2">
                <span className="text-sm font-semibold text-maroon/70">Evapotranspiration</span>
                <span className="font-bold text-amber-600">{satData.weather_30_day.evapotranspiration_mm} mm</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-forest">Net Balance</span>
                <span className="font-black text-forest text-lg">{satData.weather_30_day.water_balance}</span>
              </div>
            </div>
          </div>
          
          {satData.ai_insights && (
            <div className="card-shell p-6 bg-white/70">
              <div className="eyebrow mb-4">AI Observations</div>
              <ul className="list-disc pl-4 space-y-2 text-sm text-maroon font-medium">
                {satData.ai_insights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Col: Map & NASA Link */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-shell p-2 bg-white/70 h-80 rounded-[2rem] overflow-hidden relative border-4 border-white shadow-soft">
            {/* Embedded Satellite Map Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center rounded-[1.5rem]" 
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586771107445-d3af9e170c66?auto=format&fit=crop&q=80')" }}>
              <div className="absolute inset-0 bg-forest/20 mix-blend-multiply rounded-[1.5rem]"></div>
              
              {/* Fake UI Overlay on Map */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-forest shadow-sm">
                📍 Coordinates: {coords.lat}° N, {coords.lon}° E
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Crosshair target */}
                <div className="w-16 h-16 border-2 border-dashed border-white/70 rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <a 
            href={satData.nasa_worldview_url} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-between p-5 card-shell bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:-translate-y-1 transition-transform"
          >
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">External Resource</div>
              <div className="font-bold text-lg">Open in NASA Worldview</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              ↗
            </div>
          </a>
        </div>
      </div>
      )}
    </div>
  );
}
