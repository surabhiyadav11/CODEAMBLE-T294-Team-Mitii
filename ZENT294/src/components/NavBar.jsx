import { Menu, X, Sprout } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../data';

export default function NavBar({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-cream/85 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-4 py-4">
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="group flex items-center gap-3 text-left"
          aria-label="KisanMitra home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-white shadow-[0_8px_20px_rgba(30,81,40,0.25)] transition duration-300 group-hover:scale-105">
            <Sprout size={17} />
          </span>
          <span className="font-display text-lg font-semibold text-forest">KisanMitra</span>
        </button>

        <nav className="hidden items-center gap-2 rounded-full border border-creamLine bg-white/65 px-3 py-2 shadow-[0_8px_20px_rgba(74,21,33,0.04)] md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                activePage === item.id
                  ? 'bg-forest text-white shadow-[0_8px_18px_rgba(30,81,40,0.24)]'
                  : 'text-maroon/75 hover:bg-maroon/5 hover:text-maroon'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-creamLine bg-white/80 text-maroon transition duration-300 hover:-translate-y-0.5 hover:border-forest/30 hover:text-forest md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('organic')}
          className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(30,81,40,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-forestSoft md:inline-flex"
        >
          Get Support
        </button>
      </div>

      {open ? (
        <div className="border-t border-creamLine bg-cream/95 px-4 py-3 md:hidden">
          <div className="section-shell flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition duration-300 ${
                  activePage === item.id ? 'bg-forest text-white' : 'bg-white text-maroon'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavigate('organic')}
              className="rounded-2xl bg-forest px-4 py-3 text-sm font-semibold text-white"
            >
              Get Support
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
