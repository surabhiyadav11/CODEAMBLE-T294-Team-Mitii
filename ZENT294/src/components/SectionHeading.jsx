export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? <div className="eyebrow mb-3">{eyebrow}</div> : null}
      <h2 className="display-title text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className={`mt-4 text-sm leading-7 text-maroon/70 sm:text-base ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
