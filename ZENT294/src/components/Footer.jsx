export default function Footer() {
  return (
    <footer className="border-t border-creamLine bg-white/35">
      <div className="section-shell py-8 sm:py-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_repeat(2,minmax(0,1fr))] lg:grid-cols-[1.2fr_repeat(2,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-white">◆</span>
              <span className="font-display text-lg font-semibold text-forest">KisanMitra</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-maroon/70">
              Dedicated to the prosperity of the Indian farmer through technology and tradition.
            </p>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-[0.35em] text-maroon/30">Resources</div>
            <ul className="mt-4 space-y-3 text-sm text-maroon/70">
              <li>Mandi Rates</li>
              <li>Soil Testing</li>
              <li>Seed Portal</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-[0.35em] text-maroon/30">Support</div>
            <ul className="mt-4 space-y-3 text-sm text-maroon/70">
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-creamLine pt-5 text-xs text-maroon/50 sm:flex sm:items-center sm:justify-between">
          <p>© 2024 KisanMitra Agriculture Initiative. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Supported by Ministry of Rural Development</p>
        </div>
      </div>
    </footer>
  );
}
