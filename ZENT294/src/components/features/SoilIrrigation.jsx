import React, { useState, useEffect } from 'react';
import { Sprout, Layers } from 'lucide-react';

const API_BASE = "http://localhost:8000/api";

export default function SoilIrrigation() {
  const [soilForm, setSoilForm] = useState({ crop: 'Wheat', soil_type: 'Black' });
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSoil = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/soil?crop=${encodeURIComponent(soilForm.crop)}&soil_type=${encodeURIComponent(soilForm.soil_type)}&lang=${encodeURIComponent(inputs.lang)}`);
      const data = await res.json();
      setSoilData(data);
    } catch (error) {
      console.error("Failed to fetch soil data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSoil();
  }, []);

  return (
    <div className="space-y-6">
      <div className="card-shell p-6 bg-white/70">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Crop</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Sprout size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={soilForm.crop} onChange={e => setSoilForm({...soilForm, crop: e.target.value})} placeholder="e.g. Wheat" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Soil Type</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Layers size={16} className="text-forest/60 ml-1" />
              <select className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={soilForm.soil_type} onChange={e => setSoilForm({...soilForm, soil_type: e.target.value})}>
                <option value="Black">Black Soil</option>
                <option value="Alluvial">Alluvial Soil</option>
                <option value="Red">Red/Yellow Soil</option>
                <option value="Laterite">Laterite Soil</option>
                <option value="Sandy">Sandy Soil</option>
              </select>
            </div>
          </div>
          <button 
            onClick={fetchSoil}
            disabled={loading}
            className="pill-button bg-forest px-6 py-2.5 text-white font-bold shadow-[0_10px_20px_rgba(30,81,40,0.2)] hover:-translate-y-0.5 hover:bg-forestSoft disabled:opacity-50 h-[46px]"
          >
            {loading ? 'Updating...' : 'Update Plan'}
          </button>
        </div>
      </div>

      {loading && !soilData && <div className="text-center py-10 text-maroon/70">Analyzing soil profile...</div>}

      {soilData && (
        <>
          {/* Real-time Soil Status */}
      <div className="card-shell p-6 bg-white/70">
        <div className="eyebrow mb-6">Real-Time Soil Profile</div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 flex flex-col justify-center items-center p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-4xl font-black text-amber-800">{soilData.surface_temp}</div>
            <div className="text-xs uppercase tracking-widest font-bold text-amber-700 mt-2 text-center">Surface Temp</div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-3 gap-2 bg-creamSoft p-4 rounded-2xl border border-creamLine relative">
             {/* Abstract depth illustration */}
             <div className="col-span-1 flex flex-col justify-end items-center bg-sky-100/50 rounded-xl p-3 border border-sky-100">
               <div className="text-2xl font-black text-sky-800 mb-1">{soilData.moisture.surface}</div>
               <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider text-center">Surface<br/>(0-10cm)</div>
             </div>
             <div className="col-span-1 flex flex-col justify-end items-center bg-sky-200/50 rounded-xl p-3 border border-sky-200">
               <div className="text-2xl font-black text-sky-800 mb-1">{soilData.moisture.shallow}</div>
               <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider text-center">Shallow<br/>(10-30cm)</div>
             </div>
             <div className="col-span-1 flex flex-col justify-end items-center bg-sky-300/50 rounded-xl p-3 border border-sky-300">
               <div className="text-2xl font-black text-sky-900 mb-1">{soilData.moisture.root_zone}</div>
               <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider text-center">Root Zone<br/>(30-60cm)</div>
             </div>
             <div className="absolute top-2 left-4 text-xs font-bold text-maroon/40 uppercase tracking-widest">Moisture Profile</div>
          </div>
        </div>
      </div>

      {/* 7-Day Irrigation Schedule */}
      <div className="card-shell p-6 bg-white/70">
        <div className="eyebrow mb-4">7-Day Irrigation Schedule</div>
        <div className="space-y-3">
          {soilData.schedule_7_day.map((day, idx) => {
            const isSkip = day.action === 'Skip';
            return (
              <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${
                isSkip ? 'bg-white border-creamLine' : 'bg-sky-50 border-sky-200'
              }`}>
                <div className="mb-2 sm:mb-0">
                  <div className="font-bold text-forest">{day.date}</div>
                  <div className="text-xs font-semibold text-maroon/60 mt-0.5">{day.reason}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                    isSkip ? 'bg-creamLine text-maroon/50' : 'bg-sky-500 text-white shadow-sm'
                  }`}>
                    {day.action}
                  </div>
                  <div className={`w-16 text-right font-black ${isSkip ? 'text-maroon/30' : 'text-sky-800 text-lg'}`}>
                    {day.amount}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {soilData.expert_advice && (
        <div className="card-shell p-6 bg-white/70 mt-6">
          <div className="eyebrow mb-4">Expert Soil Advice</div>
          <ul className="list-disc pl-4 space-y-2 text-sm text-maroon font-medium">
            {soilData.expert_advice.map((advice, idx) => (
              <li key={idx}>{advice}</li>
            ))}
          </ul>
        </div>
      )}
        </>
      )}
    </div>
  );
}
