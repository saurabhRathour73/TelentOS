import PageHeader from "@/components/dashboard/PageHeader";
import { LayoutDashboard, FileText, Gauge, Map, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listAnalyses } from "@/services/talentService";
import { Tables } from "@/integrations/supabase/types";

const tiles = [
  { to: "/dashboard/resume", icon: FileText, title: "Resume Analyzer", body: "Score, strengths, weaknesses, AI rewrites." },
  { to: "/dashboard/ats", icon: Gauge, title: "ATS Score", body: "Match against any job description." },
  { to: "/dashboard/role-match", icon: Building2, title: "Dream Role Match", body: "Fit %, salary band, hiring odds." },
  { to: "/dashboard/roadmap", icon: Map, title: "30/60/90 Roadmap", body: "Personalized plan with skills + projects." },
];

export default function Overview() {
  const [items, setItems] = useState<Tables<"analyses">[]>([]);
  useEffect(() => { listAnalyses().then(setItems).catch(() => {}); }, []);

  return (
    <div className="animate-fade-in">
      <PageHeader icon={LayoutDashboard} title="Overview" subtitle="Your career intelligence at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-elevated">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <t.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="font-display font-bold">{t.title}</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-display text-lg font-bold">Recent analyses</h2>
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Nothing yet. Run your first analysis to see results here.
          </div>
        ) : (
          <div className="grid gap-3">
            {items.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{a.kind.replace("_", " ")}</div>
                  <div className="font-medium">{a.title || "Untitled"}</div>
                </div>
                {a.score != null && <div className="font-display text-2xl font-bold text-primary">{a.score}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
