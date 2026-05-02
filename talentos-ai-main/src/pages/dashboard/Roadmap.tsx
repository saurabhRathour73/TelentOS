import PageHeader from "@/components/dashboard/PageHeader";
import { Map, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { runAnalysis, saveAnalysis } from "@/services/talentService";
import { toast } from "sonner";

type Phase = { focus: string; skills: string[]; projects: string[]; courses: string[] };
type RoadmapResult = { summary: string; day_30: Phase; day_60: Phase; day_90: Phase };

export default function Roadmap() {
  const [role, setRole] = useState("Frontend Engineer");
  const [company, setCompany] = useState("Stripe");
  const [skills, setSkills] = useState("");
  const [hours, setHours] = useState("10");
  const [gaps, setGaps] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RoadmapResult | null>(null);

  const analyze = async () => {
    setBusy(true);
    try {
      const r = await runAnalysis<RoadmapResult>("roadmap", { role, company, skills, hours: Number(hours), gaps });
      setResult(r);
      await saveAnalysis("roadmap", `${role} roadmap`, { role, company, skills, hours, gaps }, r);
      toast.success("Roadmap ready");
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader icon={Map} title="30 / 60 / 90 Day Roadmap" subtitle="A personalized AI plan with skills, projects and courses for your goal." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Goal role</Label><Input value={role} onChange={(e) => setRole(e.target.value)} className="mt-1.5" /></div>
            <div><Label>Target company</Label><Input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1.5" /></div>
          </div>
          <div><Label>Current skills</Label><Textarea value={skills} onChange={(e) => setSkills(e.target.value)} className="mt-1.5 min-h-[80px] rounded-2xl" /></div>
          <div><Label>Weekly hours available</Label><Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="mt-1.5" /></div>
          <div><Label>Known gaps</Label><Textarea value={gaps} onChange={(e) => setGaps(e.target.value)} placeholder="System design, DSA, ..." className="mt-1.5 min-h-[60px] rounded-2xl" /></div>
          <Button onClick={analyze} disabled={busy} className="w-full rounded-xl shadow-glow">
            {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Building...</> : "Generate roadmap"}
          </Button>
        </div>
        <div className="space-y-4">
          {!result && (
            <div className="grid min-h-[300px] place-items-center rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              Your 30/60/90 plan will appear here.
            </div>
          )}
          {result && (
            <>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display font-bold">Plan summary</div>
                <p className="mt-1 text-sm text-muted-foreground">{result.summary}</p>
              </div>
              {([
                { label: "First 30 days", phase: result.day_30, color: "bg-primary" },
                { label: "Days 31–60", phase: result.day_60, color: "bg-success" },
                { label: "Days 61–90", phase: result.day_90, color: "bg-warning" },
              ]).map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                    <div className="font-display font-bold">{s.label}</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.phase.focus}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {([
                      { t: "Skills", arr: s.phase.skills },
                      { t: "Projects", arr: s.phase.projects },
                      { t: "Courses", arr: s.phase.courses },
                    ]).map((b) => (
                      <div key={b.t}>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{b.t}</div>
                        <ul className="mt-1.5 space-y-1.5 text-sm">
                          {b.arr.map((x, i) => (
                            <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{x}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
