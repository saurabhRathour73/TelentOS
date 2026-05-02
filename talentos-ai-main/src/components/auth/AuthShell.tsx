import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
              <Sparkles className="h-4 w-4" />
            </span>
            TalentOS
          </Link>
          <h1 className="mt-8 font-display text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-secondary/40 p-10">
        <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative max-w-md">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
            <div className="text-xs font-semibold text-muted-foreground">RESUME SCORE</div>
            <div className="mt-2 font-display text-5xl font-extrabold">85<span className="text-2xl text-muted-foreground">/100</span></div>
            <div className="mt-1 text-sm text-success font-medium">Great Job! · Frontend SDE</div>
            <div className="mt-4 h-2 rounded-full bg-secondary">
              <div className="h-full w-[85%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-primary p-5 text-primary-foreground shadow-glow">
            <div className="text-xs font-semibold opacity-90">AI TIP</div>
            <div className="mt-1 text-sm">Quantify your top 3 wins. Recruiters scan numbers first.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
