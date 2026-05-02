const steps = [
  { n: "01", t: "Drop your resume", b: "Paste or upload — we extract structured signal in seconds." },
  { n: "02", t: "Pick your dream role", b: "Choose a target company and role; we score your fit." },
  { n: "03", t: "Get your roadmap", b: "A 30/60/90 day plan with skills, projects and courses." },
];
export default function HowItWorks() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">How it works</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">From confused to clear in under 2 minutes.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="font-display text-5xl font-extrabold text-primary/15">{s.n}</div>
              <div className="mt-2 font-display text-lg font-bold">{s.t}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
