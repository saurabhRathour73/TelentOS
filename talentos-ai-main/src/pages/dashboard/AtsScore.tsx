import PageHeader from "@/components/dashboard/PageHeader";
import { Gauge, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { runAnalysis, saveAnalysis } from "@/services/talentService";
import { toast } from "sonner";
import ScoreRing from "@/components/dashboard/ScoreRing";

type AtsResult = {
  score: number; verdict: string;
  matched_keywords: string[]; missing_keywords: string[];
  format_issues?: string[]; recommendations: string[];
};

export default function AtsScore() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);

  const analyze = async () => {
    if (resume.trim().length < 50 || jd.trim().length < 50) return toast.error("Paste both your resume and a job description.");
    setBusy(true);
    try {
      const r = await runAnalysis<AtsResult>("ats", { resumeText: resume, jobDescription: jd });
      setResult(r);
      await saveAnalysis("ats", r.verdict.slice(0, 80), { resume, jd }, r, r.score);
      toast.success("ATS score ready");
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader icon={Gauge} title="ATS Score" subtitle="Match your resume against any job description and find missing keywords." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label>Resume text</Label>
            <Textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste resume..." className="mt-1.5 min-h-[180px] rounded-2xl" />
          </div>
          <div>
            <Label>Job description</Label>
            <Textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the JD..." className="mt-1.5 min-h-[180px] rounded-2xl" />
          </div>
          <Button onClick={analyze} disabled={busy} className="w-full rounded-xl shadow-glow">
            {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scoring...</> : "Calculate ATS match"}
          </Button>
        </div>
        <div className="space-y-4">
          {!result && (
            <div className="grid h-full min-h-[300px] place-items-center rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              Your ATS score will appear here.
            </div>
          )}
          {result && (
            <>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft text-center">
                <ScoreRing value={result.score} label="ATS Match" />
                <p className="mt-3 text-sm text-muted-foreground">{result.verdict}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display font-bold">Matched keywords</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.matched_keywords.map((k) => <span key={k} className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">{k}</span>)}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display font-bold">Missing keywords</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.missing_keywords.map((k) => <span key={k} className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">{k}</span>)}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display font-bold">Recommendations</div>
                <ul className="mt-2 space-y-2 text-sm">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{r}</li>
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
