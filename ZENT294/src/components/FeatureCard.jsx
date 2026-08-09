export default function FeatureCard({ eyebrow, title, description, action, accent = 'from-white to-white', icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="interactive-card group w-full text-left"
    >
      <div className={`rounded-[1.4rem] bg-gradient-to-br ${accent} p-5 sm:p-6`}>
        {eyebrow ? <div className="text-[11px] font-black uppercase tracking-[0.28em] text-rose">{eyebrow}</div> : null}
        <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-lg shadow-sm transition duration-300 group-hover:scale-105">
          {icon ?? title.slice(0, 1)}
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold text-maroon">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-maroon/70">{description}</p>
        {action ? (
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest transition duration-300 group-hover:gap-3">
            {action}
            <span aria-hidden="true">→</span>
          </div>
        ) : null}
      </div>
    </button>
  );
}
