import React, { useState, useEffect } from 'react';
import { Target, Sprout, CloudRain, Droplets, FlaskConical, Calculator, Calendar } from 'lucide-react';

const API_BASE = "http://localhost:8000/api";

export default function HarvestPrediction() {
  const [predictForm, setPredictForm] = useState({
    crop: 'Wheat',
    season: 'Kharif     ',
    area: 10,
    annual_rainfall: 1500,
    fertilizer: 200,
    pesticide: 5,
    sowing_date: '2025-11-01'
  });
  const [prediction, setPrediction] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [harvestData, setHarvestData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const fetchHarvestData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch(`${API_BASE}/harvest?crop=${encodeURIComponent(predictForm.crop)}&sowing_date=${encodeURIComponent(predictForm.sowing_date)}&lang=${encodeURIComponent(inputs.lang)}`);
      const resData = await res.json();
      setHarvestData(resData);
    } catch (err) {
      console.error(err);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    fetchHarvestData();
  }, []);

  const handlePredictAndFetch = async () => {
    fetchHarvestData();
    setPredicting(true);
    setPrediction(null);
    try {
      const res = await fetch(`${API_BASE}/predict-yield`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: predictForm.crop,
          season: predictForm.season,
          area: parseFloat(predictForm.area),
          annual_rainfall: parseFloat(predictForm.annual_rainfall),
          fertilizer: parseFloat(predictForm.fertilizer),
          pesticide: parseFloat(predictForm.pesticide)
        })
      });
      const result = await res.json();
      setPrediction(result);
    } catch (err) {
      console.error(err);
      setPrediction({ error: "Failed to connect to ML model." });
    }
    setPredicting(false);
  };

  return (
    <div className="space-y-6">
      {/* ML Prediction Section */}
      <div className="card-shell p-6 bg-white/70 border border-forest/10 shadow-[0_10px_30px_rgba(30,81,40,0.06)] relative overflow-hidden transition-all hover:border-forest/30">
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
          <Calculator size={200} className="text-forest translate-x-12 -translate-y-8" />
        </div>
        <div className="eyebrow mb-5 flex items-center gap-2 text-forest">
          <Target size={16}/> 
          ML Crop Yield Predictor
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6 relative z-10">
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Crop</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Sprout size={16} className="text-forest/60 ml-1" />
              <select className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={predictForm.crop} onChange={e => setPredictForm({...predictForm, crop: e.target.value})}>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="Cotton(lint)">Cotton</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Arecanut">Arecanut</option>
                <option value="Jute">Jute</option>
                <option value="Arhar/Tur">Tur/Arhar</option>
                <option value="Groundnut">Groundnut</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Season</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <CloudRain size={16} className="text-forest/60 ml-1" />
              <select className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={predictForm.season} onChange={e => setPredictForm({...predictForm, season: e.target.value})}>
                <option value="Kharif     ">Kharif</option>
                <option value="Rabi       ">Rabi</option>
                <option value="Whole Year ">Whole Year</option>
                <option value="Summer     ">Summer</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Area (Hectares)</label>
            <input type="number" className="w-full bg-white rounded-2xl border border-creamLine p-2.5 pl-4 text-sm font-semibold text-maroon outline-none shadow-sm transition-all focus:border-forest/50 focus:ring-2 focus:ring-forest/10" value={predictForm.area} onChange={e => setPredictForm({...predictForm, area: e.target.value})} />
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Annual Rain (mm)</label>
            <input type="number" className="w-full bg-white rounded-2xl border border-creamLine p-2.5 pl-4 text-sm font-semibold text-maroon outline-none shadow-sm transition-all focus:border-forest/50 focus:ring-2 focus:ring-forest/10" value={predictForm.annual_rainfall} onChange={e => setPredictForm({...predictForm, annual_rainfall: e.target.value})} />
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Fertilizer (kg)</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Droplets size={16} className="text-forest/60 ml-1" />
              <input type="number" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={predictForm.fertilizer} onChange={e => setPredictForm({...predictForm, fertilizer: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Pesticide (kg)</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <FlaskConical size={16} className="text-forest/60 ml-1" />
              <input type="number" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={predictForm.pesticide} onChange={e => setPredictForm({...predictForm, pesticide: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Sowing Date</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Calendar size={16} className="text-forest/60 ml-1" />
              <input type="date" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={predictForm.sowing_date} onChange={e => setPredictForm({...predictForm, sowing_date: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 relative z-10 pt-2">
          <button 
            onClick={handlePredictAndFetch}
            disabled={predicting}
            className="pill-button bg-forest px-6 py-2.5 text-white font-bold shadow-[0_10px_20px_rgba(30,81,40,0.2)] hover:-translate-y-0.5 hover:bg-forestSoft disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
          >
            {predicting ? 'Processing AI...' : 'Predict Yield'}
          </button>
          
          {prediction && !prediction.error && (
            <div className="animate-reveal flex items-center bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-2xl px-6 py-2.5 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 mr-4">Result</span>
              <span className="text-emerald-900 font-black text-xl mr-2">{prediction.predicted_yield}</span>
              <span className="text-emerald-700 text-sm font-semibold">{prediction.unit}</span>
            </div>
          )}
          {prediction && prediction.error && (
            <div className="animate-reveal flex items-center bg-rose-50 border border-rose-200 rounded-2xl px-6 py-2.5 text-rose-700 text-sm font-semibold shadow-sm">
              {prediction.error}
            </div>
          )}
        </div>
      </div>

      {loadingData && !harvestData && <div className="text-center py-10 text-maroon/70">Loading harvest insights...</div>}
      
      {harvestData && (
        <>
          {/* Progress & Current Stage */}
          <div className="card-shell p-6 bg-white/70">
            <div className="eyebrow mb-6">Growth Stage Progress</div>
            
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-forest mb-2">
                <span>Planted</span>
                <span>{harvestData.current_stage}</span>
                <span>Harvest Ready</span>
              </div>
              <div className="w-full bg-creamLine rounded-full h-4 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${harvestData.progress_percent}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center text-xs font-semibold text-maroon/60 uppercase tracking-widest">
                {harvestData.days_growing} days growing • {harvestData.progress_percent}% complete
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full opacity-50 -mr-4 -mt-4"></div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-800 mb-2 relative z-10">AI Stage Tips</div>
              <ul className="text-emerald-800 text-sm font-medium space-y-2 relative z-10 list-disc pl-4">
                {harvestData.stage_tips && harvestData.stage_tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 16-Day Suitability Forecast */}
          <div className="card-shell p-6 bg-white/70">
            <div className="eyebrow mb-4">16-Day Harvest Suitability Score</div>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-2 min-w-max">
                {harvestData.forecast_16_day.map((day, idx) => {
                  const score = day.score;
                  const color = score >= 90 ? 'bg-emerald-500' :
                                score >= 75 ? 'bg-amber-400' : 'bg-rose-400';
                  const bg = score >= 90 ? 'bg-emerald-50 border-emerald-100' :
                             score >= 75 ? 'bg-amber-50 border-amber-100' : 'bg-rose-50 border-rose-100';
                  const text = score >= 90 ? 'text-emerald-900' :
                               score >= 75 ? 'text-amber-900' : 'text-rose-900';
                  
                  return (
                    <div key={idx} className={`flex flex-col items-center p-3 rounded-xl border ${bg} w-20 flex-shrink-0`}>
                      <div className={`text-xs font-bold ${text} mb-2`}>{day.date}</div>
                      
                      {/* Vertical bar representing score */}
                      <div className="w-4 h-24 bg-white rounded-full relative overflow-hidden mb-2 shadow-inner">
                        <div className={`absolute bottom-0 left-0 right-0 rounded-full ${color}`} style={{ height: `${score}%` }}></div>
                      </div>
                      
                      <div className={`text-lg font-black ${text}`}>{score}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
