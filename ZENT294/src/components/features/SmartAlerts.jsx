import React, { useState, useEffect } from 'react';
import { Sprout, MapPin } from 'lucide-react';

const API_BASE = "http://localhost:8000/api";

export default function SmartAlerts() {
  const allRisks = ["Heavy Rain", "Storms", "Strong Wind", "Extreme Heat", "Cold Stress", "High Humidity", "Frost", "Drought"];
  const [selectedRisks, setSelectedRisks] = useState(allRisks);
  
  const [alertForm, setAlertForm] = useState({ crop: 'Wheat', city: 'Solapur' });
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/alerts?crop=${encodeURIComponent(alertForm.crop)}&city=${encodeURIComponent(alertForm.city)}&lang=${encodeURIComponent(inputs.lang)}`);
      const data = await res.json();
      setAlertData(data);
    } catch (error) {
      console.error("Failed to fetch alerts", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const toggleRisk = (risk) => {
    setSelectedRisks(prev => 
      prev.includes(risk) ? prev.filter(r => r !== risk) : [...prev, risk]
    );
  };

  return (
    <div className="space-y-6">
      <div className="card-shell p-6 bg-white/70">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Crop</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Sprout size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={alertForm.crop} onChange={e => setAlertForm({...alertForm, crop: e.target.value})} placeholder="e.g. Wheat" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">City/Village</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <MapPin size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={alertForm.city} onChange={e => setAlertForm({...alertForm, city: e.target.value})} placeholder="e.g. Solapur" />
            </div>
          </div>
          <button 
            onClick={fetchAlerts}
            disabled={loading}
            className="pill-button bg-forest px-6 py-2.5 text-white font-bold shadow-[0_10px_20px_rgba(30,81,40,0.2)] hover:-translate-y-0.5 hover:bg-forestSoft disabled:opacity-50 h-[46px]"
          >
            {loading ? 'Refreshing...' : 'Update Alerts'}
          </button>
        </div>
      </div>

      {loading && !alertData && <div className="text-center py-10 text-maroon/70">Monitoring regional risks...</div>}

      {alertData && (
        <>
          {/* Risk Selection */}
      <div className="card-shell p-6 bg-white/70">
        <div className="eyebrow mb-4">Select Risks to Monitor</div>
        <div className="flex flex-wrap gap-2">
          {allRisks.map(risk => (
            <button 
              key={risk}
              onClick={() => toggleRisk(risk)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                selectedRisks.includes(risk) 
                  ? 'bg-forest text-white border-forest' 
                  : 'bg-white text-forest border-creamLine hover:border-forest/50'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* 7-Day Risk Matrix */}
      <div className="card-shell p-6 bg-white/70 overflow-x-auto">
        <div className="eyebrow mb-4">7-Day Risk Summary</div>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="p-3 border-b border-creamLine text-maroon/60 text-xs uppercase tracking-wider">Date</th>
              {selectedRisks.map(risk => (
                <th key={risk} className="p-3 border-b border-creamLine text-maroon/60 text-xs uppercase tracking-wider text-center">{risk}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alertData.risk_summary.map((day, idx) => (
              <tr key={idx} className="border-b border-creamLine last:border-0 hover:bg-white/40">
                <td className="p-3 font-semibold text-forest whitespace-nowrap">{day.date}</td>
                {selectedRisks.map(risk => {
                  const severity = day.risks[risk];
                  const bg = severity === 'High' ? 'bg-rose-500 text-white' :
                             severity === 'Medium' ? 'bg-amber-400 text-amber-900' :
                             'bg-emerald-100 text-emerald-800';
                  return (
                    <td key={risk} className="p-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${bg}`}>
                        {severity}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Advice */}
      <div className="card-shell p-6 bg-white/70">
        <div className="eyebrow mb-4">Specific Farming Action Advice</div>
        <div className="space-y-4">
          {alertData.action_advice.filter(a => selectedRisks.includes(a.risk)).length > 0 ? (
            alertData.action_advice.filter(a => selectedRisks.includes(a.risk)).map((advice, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-rose-200 bg-rose-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-rose-900">{advice.risk} Alert</span>
                  <span className="text-xs font-bold text-rose-700">{advice.date}</span>
                </div>
                <p className="text-sm font-medium text-rose-800">{advice.advice}</p>
              </div>
            ))
          ) : (
            <div className="text-center p-6 text-maroon/50 font-semibold">
              No specific action alerts for the selected risks at this time.
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
