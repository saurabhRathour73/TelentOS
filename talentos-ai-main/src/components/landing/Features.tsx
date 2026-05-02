import { FileText, Target, Map, Gauge, Github, Briefcase, Sparkles, BarChart3 } from "lucide-react";

const items = [
  { icon: FileText, title: "Resume Analyzer", body: "AI parses your resume, scores it 0–100, and rewrites weak bullets." },
  { icon: Gauge, title: "ATS Score", body: "Match your resume against any job description and find missing keywords." },
  { icon: Target, title: "Dream Role Match", body: "Pick a company + role. Get fit %, hiring odds, salary band and gaps." },
  { icon: Map, title: "30/60/90 Roadmap", body: "A personal weekly plan with skills, projects and curated courses." },
  { icon: Briefcase, title: "Recruiter Simulation", body: "See your resume the way a recruiter would. Coming soon." },
  { icon: Github, title: "GitHub Analyzer", body: "Real repo + commit signal extraction. Coming soon." },
  { icon: BarChart3, title: "Market Trends", body: "Salary + demand intelligence by role and city. Coming soon." },
  { icon: Sparkles, title: "Project Strength", body: "Score your portfolio against industry benchmarks. Coming soon." },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
          Everything you need to land the role.
        </h2>
        <p className="mt-3 text-muted-foreground">
          One workspace. Eight intelligent modules. Built to be the operating system for your career.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-elevated"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <it.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-display font-bold">{it.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
