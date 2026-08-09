export default function OrganicCard({ label, selected, onClick, icon = '◌' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-[4.15rem] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition duration-300 ${
        selected
          ? 'border-forest bg-white shadow-[0_14px_30px_rgba(30,81,40,0.12)]'
          : 'border-creamLine bg-white/70 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-[0_14px_30px_rgba(74,21,33,0.06)]'
      }`}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition duration-300 ${selected ? 'bg-forest text-white' : 'bg-blush text-maroon group-hover:bg-forest/10'}`}>
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium text-maroon">{label}</span>
      <span className={`text-base transition duration-300 ${selected ? 'text-forest' : 'text-transparent group-hover:text-forest/60'}`}>
        ✓
      </span>
    </button>
  );
}
