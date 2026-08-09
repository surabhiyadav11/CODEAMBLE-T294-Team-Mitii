import React, { useState, useEffect } from 'react';
import { Sprout, MapPin } from 'lucide-react';

const API_BASE = "http://localhost:8000/api";

export default function MarketPrice() {
  const [marketForm, setMarketForm] = useState({ crop: 'Wheat', state: 'Maharashtra' });
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('');

  const fetchMarketRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mandi-rates?crop=${encodeURIComponent(marketForm.crop)}&state=${encodeURIComponent(marketForm.state)}&lang=${encodeURIComponent(inputs.lang)}`);
      const data = await res.json();
      setMarketData(data);
      if (data.length > 0) setSelectedCrop(data[0].crop);
    } catch (error) {
      console.error("Failed to fetch market rates", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMarketRates();
  }, []);

  const currentCropData = marketData.find(c => c.crop === selectedCrop) || marketData[0];

  return (
    <div className="space-y-6">
      <div className="card-shell p-6 bg-white/70">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Crop</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <Sprout size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={marketForm.crop} onChange={e => setMarketForm({...marketForm, crop: e.target.value})} placeholder="e.g. Wheat" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">State</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm transition-all focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <MapPin size={16} className="text-forest/60 ml-1" />
              <input type="text" className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={marketForm.state} onChange={e => setMarketForm({...marketForm, state: e.target.value})} placeholder="e.g. Maharashtra" />
            </div>
          </div>
          <button 
            onClick={fetchMarketRates}
            disabled={loading}
            className="pill-button bg-forest px-6 py-2.5 text-white font-bold shadow-[0_10px_20px_rgba(30,81,40,0.2)] hover:-translate-y-0.5 hover:bg-forestSoft disabled:opacity-50 h-[46px]"
          >
            {loading ? 'Refreshing...' : 'Get Rates'}
          </button>
        </div>
      </div>

      {loading && marketData.length === 0 && <div className="text-center py-10 text-maroon/70">Fetching APMC rates...</div>}

      {!loading && marketData.length > 0 && currentCropData && (
        <>
          {/* Quick Select Buttons */}
          <div className="card-shell p-4 sm:p-6 bg-white/70">
            <div className="eyebrow mb-4">Select Crop</div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {marketData.map(c => (
            <button
              key={c.crop}
              onClick={() => setSelectedCrop(c.crop)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-colors border ${
                selectedCrop === c.crop 
                  ? 'bg-forest text-white border-forest shadow-md' 
                  : 'bg-white text-forest border-creamLine hover:bg-creamSoft'
              }`}
            >
              {c.crop}
            </button>
          ))}
        </div>
      </div>

      {/* Main Pricing Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Recommendation & Highlights */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`card-shell p-6 text-center border-2 ${
            currentCropData.recommendation === 'Sell Now' ? 'bg-emerald-50 border-emerald-400' :
            currentCropData.recommendation === 'Average' ? 'bg-amber-50 border-amber-400' :
            'bg-rose-50 border-rose-400'
          }`}>
            <div className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">AI Recommendation</div>
            <div className={`text-4xl font-black uppercase tracking-tight ${
              currentCropData.recommendation === 'Sell Now' ? 'text-emerald-700' :
              currentCropData.recommendation === 'Average' ? 'text-amber-700' :
              'text-rose-700'
            }`}>
              {currentCropData.recommendation}
            </div>
          </div>

          <div className="card-shell p-6 bg-white/70 space-y-4">
             <div className="flex justify-between items-end border-b border-creamLine pb-3">
                <div>
                  <div className="text-xs uppercase font-bold text-maroon/50 mb-1">Govt MSP</div>
                  <div className="text-xl font-bold text-maroon">₹{currentCropData.msp} / Qtl</div>
                </div>
             </div>
             <div className="flex justify-between items-end border-b border-creamLine pb-3">
                <div>
                  <div className="text-xs uppercase font-bold text-maroon/50 mb-1">Market Average</div>
                  <div className="text-xl font-bold text-amber-600">₹{currentCropData.avg_price} / Qtl</div>
                </div>
             </div>
             <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs uppercase font-bold text-maroon/50 mb-1">Best Available Price</div>
                  <div className="text-3xl font-black text-forest">₹{currentCropData.best_price}</div>
                  <div className="text-xs font-bold text-forest/70 mt-1">at {currentCropData.best_mandi}</div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Mandi Comparison */}
        <div className="lg:col-span-2 card-shell p-6 bg-white/70">
          <div className="eyebrow mb-6">Mandi Price Comparison (₹/Qtl)</div>
          
          <div className="space-y-4">
            {currentCropData.mandi_breakdown.map((mandi, idx) => {
              // Calculate width for bar chart effect relative to best_price
              const pct = (mandi.price / currentCropData.best_price) * 100;
              const isBest = mandi.price === currentCropData.best_price;
              
              return (
                <div key={idx} className="relative">
                  <div className="flex justify-between text-sm font-bold text-forest mb-1 relative z-10 px-2">
                    <span>{mandi.name}</span>
                    <span>₹{mandi.price}</span>
                  </div>
                  <div className="w-full bg-creamLine rounded-lg h-8 relative overflow-hidden">
                    <div 
                      className={`h-full rounded-lg transition-all duration-1000 ${
                        isBest ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-amber-200 to-amber-300'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {currentCropData.expert_tips && (
            <div className="mt-8 bg-sky-50 border border-sky-100 rounded-xl p-4 text-sm font-medium text-sky-900 leading-relaxed">
              <strong className="block mb-2">💡 Expert Market Tips:</strong>
              <ul className="list-disc pl-4 space-y-2">
                {currentCropData.expert_tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
