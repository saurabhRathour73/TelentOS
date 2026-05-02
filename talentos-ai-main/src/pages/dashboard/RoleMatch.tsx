import PageHeader from "@/components/dashboard/PageHeader";
import { Building2, Loader2, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { runAnalysis, saveAnalysis } from "@/services/talentService";
import { toast } from "sonner";
import ScoreRing from "@/components/dashboard/ScoreRing";

type RoleResult = {
  match_score: number; hiring_probability: number;
  salary_range: string; market_demand: string;
  missing_skills: string[]; required_projects: string[];
  strengths?: string[]; verdict: string;
};

export default function RoleMatch() {
  const [company, setCompany] = useState("Google");
  const [role, setRole] = useState("Frontend Engineer");
  const [level, setLevel] = useState("Entry");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RoleResult | null>(null);

  const analyze = async () => {
    if (!company || !role) return toast.error("Pick a company and role.");
    setBusy(true);
    try {
      const r = await runAnalysis<RoleResult>("role_match", { company, role, level, skills, projects });
      setResult(r);
      await saveAnalysis("role_match", `${role} @ ${company}`, { company, role, level, skills, projects }, r, r.match_score);
      toast.success("Match calculated");
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader icon={Building2} title="Dream Role Match" subtitle="Pick your target role + company. Get fit %, hiring odds, salary, and gaps." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Company</Label><Input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1.5" /></div>
            <div><Label>Role</Label><Input value={role} onChange={(e) => setRole(e.target.value)} className="mt-1.5" /></div>
          </div>
          <div><Label>Experience level</Label><Input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Entry / Mid / Senior" className="mt-1.5" /></div>
          <div><Label>Your skills</Label><Textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, TypeScript, Node, ..." className="mt-1.5 min-h-[80px] rounded-2xl" /></div>
          <div><Label>Recent projects</Label><Textarea value={projects} onChange={(e) => setProjects(e.target.value)} placeholder="One line each..." className="mt-1.5 min-h-[80px] rounded-2xl" /></div>
          <Button onClick={analyze} disabled={busy} className="w-full rounded-xl shadow-glow">
            {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Matching...</> : "Calculate match"}
          </Button>
        </div>
        <div className="space-y-4">
          {!result && (
            <div className="grid h-full min-h-[300px] place-items-center rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              Your match report will appear here.
            </div>
          )}
          {result && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft text-center">
                  <ScoreRing value={result.match_score} label="Fit %" />
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1"><Target className="h-3 w-3" /> Match</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft text-center">
                  <ScoreRing value={result.hiring_probability} label="Hiring odds" />
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3" /> Probability</div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Salary range</div>
                  <div className="mt-1 font-display text-2xl font-bold text-primary">{result.salary_range}</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Market demand</div>
                  <div className="mt-1 font-display text-2xl font-bold capitalize">{result.market_demand}</div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display font-bold">Verdict</div>
                <p className="mt-1 text-sm text-muted-foreground">{result.verdict}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display font-bold">Skills you're missing</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.missing_skills.map((s) => <span key={s} className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">{s}</span>)}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display font-bold">Projects that would unlock this role</div>
                <ul className="mt-2 space-y-2 text-sm">
                  {result.required_projects.map((p, i) => (
                    <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{p}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
