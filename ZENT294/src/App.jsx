import { ArrowRight, BadgeCheck, Leaf, Sparkles, Waves, Wheat, Zap } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import WeatherAdvisor from './components/features/WeatherAdvisor';
import HarvestPrediction from './components/features/HarvestPrediction';
import HyperlocalWeather from './components/features/HyperlocalWeather';
import SmartAlerts from './components/features/SmartAlerts';
import SatelliteView from './components/features/SatelliteView';
import SoilIrrigation from './components/features/SoilIrrigation';
import MarketPrice from './components/features/MarketPrice';

const API_BASE = "http://localhost:8000/api";
import NavBar from './components/NavBar';
import SectionHeading from './components/SectionHeading';
import FeatureCard from './components/FeatureCard';
import OrganicCard from './components/OrganicCard';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import {
  featureDashboard,
  homeHighlights,
  organicGroups,
  organicSteps,
  preparations,
  serviceCards,
  trustLogos,
} from './data';

function AccentBlob({ className }) {
  return <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />;
}

function HomePage({ onNavigate }) {
  return (
    <main className="animate-reveal">
      <section className="relative overflow-hidden">
        <AccentBlob className="left-[-6rem] top-12 h-56 w-56 bg-[radial-gradient(circle,rgba(245,158,11,0.28),transparent_70%)]" />
        <AccentBlob className="right-[-4rem] top-24 h-72 w-72 bg-[radial-gradient(circle,rgba(30,81,40,0.16),transparent_72%)]" />

        <div className="section-shell grid gap-8 pb-12 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12 lg:pb-16 lg:pt-16">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">KisanMitra Agriculture Initiative</div>
            <h1 className="display-title max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              A reliable partner for every farmer across India
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-maroon/70 sm:text-lg">
              Access expert agricultural advice, updated market rates, and government support schemes tailored to your local soil and climate.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('features')}
                className="pill-button bg-forest px-5 py-3 text-white shadow-[0_16px_30px_rgba(30,81,40,0.22)] hover:-translate-y-0.5 hover:bg-forestSoft"
              >
                Explore features
                <ArrowRight className="ml-2" size={16} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('organic')}
                className="pill-button border border-creamLine bg-white/70 px-5 py-3 text-maroon hover:-translate-y-0.5 hover:border-forest/30 hover:text-forest"
              >
                Try organic wizard
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-forest/10 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-creamLine bg-white shadow-soft">
              <img
                src="/hero.jpg"
                alt="Smiling Indian farmer in a mustard field"
                className="h-[20rem] w-full object-cover sm:h-[24rem] lg:h-[30rem]"
              />
            </div>
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/88 px-4 py-2 text-xs font-semibold text-forest shadow-[0_10px_22px_rgba(74,21,33,0.12)] backdrop-blur-md">
              <BadgeCheck size={14} />
              Trusted local guidance
            </div>
          </div>
        </div>

        <div className="section-shell grid gap-5 pb-6 sm:grid-cols-3">
          {homeHighlights.map((item) => (
            <div key={item.code} className="interactive-card p-6">
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-rose">{item.code}. {item.title}</div>
              <p className="mt-5 text-sm leading-7 text-maroon/70">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="section-shell py-12 border-t border-creamLine mt-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="Our Features in Brief"
            description="Explore our seven core modules designed for the modern Indian farmer."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureDashboard.map((feat) => (
              <div key={feat.key} className="rounded-2xl border border-creamLine bg-white/70 p-5 shadow-sm transition hover:shadow-md">
                <div className="text-2xl mb-2">{feat.emoji}</div>
                <h4 className="font-bold text-maroon mb-1">{feat.badge}</h4>
                <p className="text-xs text-maroon/70 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-shell py-12 border-t border-creamLine mt-8">
          <SectionHeading
            eyebrow="The Team"
            title="Meet the Authors"
            description="Developed by second-year students from Vishwakarma Institute Of Technology."
          />
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {[
              {
                name: 'Shreyash Santosh Ghatekar',
                role: 'Computer Science (Software Engineering)'
              }, 
              {
                name: 'Surabhi Suhas Yadav',
                role: 'Computer Science (Software Engineering)'
              }
            ].map(author => (
              <div key={author.name} className="flex items-center gap-5 rounded-[2rem] border border-creamLine bg-white/60 p-6 shadow-soft">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-200 overflow-hidden text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                  <h4 className="font-bold text-maroon text-lg">{author.name}</h4>
                  <p className="mt-1 text-xs font-semibold text-forest tracking-wide">Vishwakarma Institute Of Technology • Second Year</p>
                  <p className="text-sm text-maroon/70 mt-1">{author.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="animate-reveal">
      <section className="section-shell py-12 lg:py-16">
        <SectionHeading
          eyebrow="Support"
          title="How we help you grow"
          description="Comprehensive support designed for the daily realities of Indian agriculture."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {serviceCards.map((card) => (
            <FeatureCard
              key={card.title}
              eyebrow="Service"
              title={card.title}
              description={card.description}
              action={card.action}
            />
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-creamLine bg-white/58 p-7 shadow-soft sm:p-10">
          <div className="display-title text-center text-2xl font-bold sm:text-3xl">Built on trust and community</div>
          <blockquote className="mx-auto mt-6 max-w-3xl text-center font-display text-lg italic leading-8 text-maroon/70 sm:text-xl">
            “KisanMitra has changed how I plan my sowing season. The weather alerts are accurate and help me save water and money.”
          </blockquote>
          <p className="mt-4 text-center text-sm font-semibold text-maroon">Rajesh Kumar, Wheat Farmer, Punjab</p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustLogos.map((label) => (
              <div key={label} className="rounded-2xl border border-creamLine bg-creamSoft px-4 py-4 text-center text-sm text-maroon/55">
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] bg-maroon px-6 py-10 text-white shadow-soft sm:px-10 sm:py-12">
          <div className="max-w-3xl">
            <h3 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">Ready to improve your yield?</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              Call our toll-free helpline or send us a WhatsApp message to start receiving alerts today.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturePortalPage({ onNavigate }) {
  return (
    <main className="animate-reveal">
      <section className="section-shell py-12 lg:py-16">
        <SectionHeading
          eyebrow="Feature portal"
          title="Everything your farming workflow needs"
          description="A clean dashboard for the seven core modules already present in the Python application, styled as a modern React surface without changing the underlying ML or feature code."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureDashboard.map((card) => (
            <FeatureCard
              key={card.key}
              eyebrow={card.key}
              title={card.badge}
              description={card.description}
              action="Open module"
              accent={card.accent}
              icon={card.emoji}
              onClick={() => onNavigate(card.key)}
            />
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-creamLine bg-white/60 p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-white p-5">
              <div className="flex items-center gap-3 text-forest">
                <Leaf size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">Weather + advice</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-maroon/70">One place to surface model-backed advisories from the existing advisor module.</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-white p-5">
              <div className="flex items-center gap-3 text-maroon">
                <Wheat size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">Market timing</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-maroon/70">Visual cards and CTAs can later connect directly to live mandi pricing responses.</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-white p-5">
              <div className="flex items-center gap-3 text-forest">
                <Waves size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">Alerts + soil</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-maroon/70">Alert and soil workflows remain separate, so the backend feature modules stay intact.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


function FeatureViewer({ featureKey, onNavigate }) {
  const renderContent = () => {
    switch (featureKey) {
      case 'advisor': return <WeatherAdvisor />;
      case 'harvest': return <HarvestPrediction />;
      case 'hyperlocal': return <HyperlocalWeather />;
      case 'alerts': return <SmartAlerts />;
      case 'satellite': return <SatelliteView />;
      case 'soil': return <SoilIrrigation />;
      case 'market': return <MarketPrice />;
      default: return null;
    }
  };

  const titleMap = {
    advisor: 'Smart Weather & Farming Advisor',
    harvest: 'AI Harvest & Yield Prediction',
    hyperlocal: 'Hyperlocal Weather',
    alerts: 'Smart Alerts',
    satellite: 'Satellite Field View',
    soil: 'Soil & Irrigation',
    market: 'Live Mandi Prices'
  };

  return (
    <main className="animate-reveal">
      <section className="section-shell py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
           <h2 className="display-title text-3xl font-extrabold text-forest">{titleMap[featureKey]}</h2>
           <button onClick={() => onNavigate('features')} className="rounded-full border border-creamLine bg-white/70 px-5 py-2.5 text-sm font-semibold text-maroon hover:border-forest/30 hover:text-forest transition duration-300">
             ← Back to Portal
           </button>
        </div>
        
        {renderContent()}
      </section>
    </main>
  );
}

function OrganicPage({ onNavigate }) {
  const defaultSelected = [
    'Indigenous cow dung',
    'Cow urine',
    'Jaggery',
    'Gram flour (besan)',
    'Live bund soil',
    'Clean water',
  ];
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(new Set(defaultSelected));
  const [customEntry, setCustomEntry] = useState('');
  const [extraInputVisible, setExtraInputVisible] = useState(false);
  
  const [selectedPrepId, setSelectedPrepId] = useState('jeevamrutha');
  const [batchSize, setBatchSize] = useState(200);

  const selectedCount = selected.size;

  const toggleItem = (item) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const addCustomItem = () => {
    const value = customEntry.trim();
    if (!value) return;
    setSelected((current) => new Set([...current, value]));
    setCustomEntry('');
    setExtraInputVisible(false);
  };

  const currentPrep = preparations.find(p => p.id === selectedPrepId) || preparations[0];
  const missingIngredients = currentPrep.requirements.filter(req => !selected.has(req));
  
  const scaleFactor = batchSize / currentPrep.baseBatchSize;

  return (
    <main className="animate-reveal">
      <section className="section-shell py-12 lg:py-14">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="eyebrow mb-3 text-amber-700">BIO-INPUT WIZARD</div>
            <h2 className="display-title max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Make your own Jeevamrut, Beejamrut and more
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-maroon/70 sm:text-base">
              Tell us what is available in your village today. We will size the recipe to your drum, show the fermentation timeline day by day, and calculate how many rupees you save against chemical inputs.
            </p>
          </div>
          <button type="button" onClick={() => setStep(1)} className="hidden items-center gap-2 rounded-full border border-creamLine bg-white/80 px-4 py-2 text-sm font-semibold text-maroon transition duration-300 hover:border-forest/30 hover:text-forest md:inline-flex">
            <Sparkles size={15} />
            Start over
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {organicSteps.map((label, index) => {
            const current = index + 1;
            const active = current === step;
            const done = current < step;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setStep(current)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition duration-300 ${
                  active
                    ? 'border-forest bg-forest text-white shadow-[0_16px_28px_rgba(30,81,40,0.22)]'
                    : done
                      ? 'border-forest/25 bg-white text-forest'
                      : 'border-creamLine bg-white/70 text-maroon/65 hover:border-forest/30 hover:text-forest'
                }`}
              >
                {current}. {label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-creamLine bg-white/60 p-5 sm:p-7">
            {step === 1 && (
              <div className="animate-reveal">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="display-title text-2xl font-semibold">What do you have on hand?</h3>
                    <p className="mt-2 text-sm text-maroon/70">
                      Tap every material available in your farm or village. Selected: {selectedCount}
                    </p>
                  </div>
                  <div className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">Step 1 of 4</div>
                </div>
                
                <div className="grid gap-6">
                  {organicGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-maroon/40">{group.title}</h4>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {group.items.map((item) => (
                          <OrganicCard
                            key={item}
                            label={item}
                            selected={selected.has(item)}
                            onClick={() => toggleItem(item)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="animate-reveal">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="display-title text-2xl font-semibold">Choose preparation</h3>
                    <p className="mt-2 text-sm text-maroon/70">
                      Based on your raw materials, what do you want to make?
                    </p>
                  </div>
                  <div className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">Step 2 of 4</div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {preparations.map(prep => {
                    const missingCount = prep.requirements.filter(r => !selected.has(r)).length;
                    return (
                      <div 
                        key={prep.id}
                        onClick={() => setSelectedPrepId(prep.id)}
                        className={`cursor-pointer rounded-2xl border p-5 transition duration-200 ${
                          selectedPrepId === prep.id 
                            ? 'border-forest bg-emerald-50 shadow-md' 
                            : 'border-creamLine bg-white hover:border-forest/40 hover:shadow-sm'
                        }`}
                      >
                        <h4 className="font-bold text-maroon text-lg">{prep.name}</h4>
                        <p className="mt-2 text-sm text-maroon/70 line-clamp-2">{prep.description}</p>
                        {missingCount > 0 ? (
                          <p className="mt-3 text-xs font-semibold text-amber-600">Missing {missingCount} ingredients</p>
                        ) : (
                          <p className="mt-3 text-xs font-semibold text-emerald-600">All ingredients available!</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="animate-reveal">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="display-title text-2xl font-semibold">Select your batch size</h3>
                    <p className="mt-2 text-sm text-maroon/70">
                      How much {currentPrep.name} do you want to prepare?
                    </p>
                  </div>
                  <div className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">Step 3 of 4</div>
                </div>
                
                <div className="grid gap-4">
                  {[20, 50, 100, 200, 500].map(size => (
                    <div 
                      key={size}
                      onClick={() => setBatchSize(size)}
                      className={`cursor-pointer rounded-2xl border p-4 flex items-center justify-between transition duration-200 ${
                        batchSize === size 
                          ? 'border-forest bg-emerald-50 shadow-md' 
                          : 'border-creamLine bg-white hover:border-forest/40'
                      }`}
                    >
                      <div className="font-bold text-maroon text-lg">{size} Liters</div>
                      {batchSize === size && <BadgeCheck className="text-forest" size={24} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="animate-reveal">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="display-title text-2xl font-semibold">Your {currentPrep.name} Recipe</h3>
                    <p className="mt-2 text-sm text-maroon/70">
                      Scaled for a {batchSize} Liter batch
                    </p>
                  </div>
                  <div className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">Step 4 of 4</div>
                </div>
                
                {missingIngredients.length > 0 && (
                  <div className="mb-6 rounded-xl bg-amber-50 p-4 border border-amber-200">
                    <h4 className="font-bold text-amber-800 text-sm mb-1">Missing Ingredients Warning</h4>
                    <p className="text-sm text-amber-700">You are missing: {missingIngredients.join(", ")}. Please source them before starting.</p>
                  </div>
                )}
                
                <h4 className="font-bold text-maroon text-lg mb-4">Ingredients Required:</h4>
                <ul className="mb-8 space-y-3">
                  {currentPrep.recipe.map(item => {
                    const scaledQty = (item.qty * scaleFactor).toFixed(1).replace(/\.0$/, '');
                    return (
                      <li key={item.item} className="flex justify-between border-b border-creamLine pb-2 text-sm">
                        <span className="text-maroon/80">{item.item}</span>
                        <span className="font-bold text-forest">{scaledQty} {item.unit}</span>
                      </li>
                    );
                  })}
                </ul>
                
                <h4 className="font-bold text-maroon text-lg mb-4">Preparation Instructions:</h4>
                <ul className="space-y-4">
                  {currentPrep.instructions.map((inst, i) => (
                    <li key={i} className="flex gap-3 text-sm text-maroon/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest/10 text-xs font-bold text-forest">{i + 1}</span>
                      <span className="leading-relaxed">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[2rem] border border-creamLine bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 border-b border-creamLine pb-4 text-sm font-bold tracking-widest text-maroon/40 uppercase">
              <Zap size={16} /> Workflow Summary
            </div>
            <div className="mt-6">
              <div className="text-4xl font-extrabold text-forest">{step === 4 ? currentPrep.name : selectedCount}</div>
              <div className="mt-2 text-sm font-semibold text-maroon/80">
                {step === 4 ? `${batchSize} Liters Batch` : 'Materials selected'}
              </div>
              <p className="mt-5 text-sm leading-7 text-maroon/70">
                {step === 1 && "Select the raw materials you have. We'll use this to guide you to the right bio-input recipe."}
                {step === 2 && "Pick a preparation to see if you have all required ingredients."}
                {step === 3 && `Select a batch size for your ${currentPrep.name}. Standard drums are 200L.`}
                {step === 4 && "Follow the instructions carefully. Stirring is crucial for microbial growth!"}
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-creamLine pt-6 sm:flex-row">
          <button 
            type="button" 
            onClick={() => setStep(current => Math.max(1, current - 1))}
            className={`rounded-full border border-creamLine px-5 py-3 text-sm font-semibold transition duration-300 ${step === 1 ? 'opacity-50 cursor-not-allowed bg-gray-50 text-maroon/30' : 'bg-white/70 text-maroon hover:border-forest/30 hover:text-forest'}`}
            disabled={step === 1}
          >
            ← Back
          </button>
          
          <div className="text-sm text-maroon/55">Step {step} of 4</div>
          
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(4, current + 1))}
            className={`rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(30,81,40,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-forestSoft ${step === 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={step === 4}
          >
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const activeNavPage = ['advisor', 'harvest', 'hyperlocal', 'alerts', 'satellite', 'soil', 'market'].includes(page)
    ? 'features'
    : page;

  const content = {
    home: <HomePage onNavigate={setPage} />,
    about: <AboutPage />,
    features: <FeaturePortalPage onNavigate={setPage} />,
    organic: <OrganicPage onNavigate={setPage} />,
    advisor: <FeatureViewer featureKey="advisor" onNavigate={setPage} />,
    harvest: <FeatureViewer featureKey="harvest" onNavigate={setPage} />,
    hyperlocal: <FeatureViewer featureKey="hyperlocal" onNavigate={setPage} />,
    alerts: <FeatureViewer featureKey="alerts" onNavigate={setPage} />,
    satellite: <FeatureViewer featureKey="satellite" onNavigate={setPage} />,
    soil: <FeatureViewer featureKey="soil" onNavigate={setPage} />,
    market: <FeatureViewer featureKey="market" onNavigate={setPage} />,
  };

  return (
    <div className="min-h-screen overflow-hidden text-maroon">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_55%)]" />
      <NavBar activePage={activeNavPage} onNavigate={setPage} />
      {content[page] ?? content.home}
      {page === 'about' ? <Footer /> : null}
      {page === 'features' ? <Footer /> : null}
      {page === 'organic' ? <Footer /> : null}
      <Chatbot />
    </div>
  );
}
