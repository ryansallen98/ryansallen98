export function QuoteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_24%),radial-gradient(circle_at_85%_20%,color-mix(in_oklab,var(--secondary-dark)_95%,transparent),transparent_30%),linear-gradient(135deg,color-mix(in_oklab,var(--background-dark)_92%,transparent),var(--background-dark))]" />
      <div className="absolute -right-28 top-24 h-96 w-96 rounded-full border border-primary/25" />
      <div className="absolute -left-24 bottom-8 h-72 w-72 rounded-full border border-divider-dark" />
    </div>
  );
}
