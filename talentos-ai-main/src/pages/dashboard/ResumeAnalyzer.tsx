import PageHeader from "@/components/dashboard/PageHeader";
import { FileText, Loader2, Upload, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { runAnalysis, saveAnalysis } from "@/services/talentService";
import { toast } from "sonner";
import ScoreRing from "@/components/dashboard/ScoreRing";

type ResumeResult = {
  score: number; verdict: string;
  strengths: string[]; weaknesses: string[];
  rejection_reasons?: string[]; improvements: string[];
  detected_skills: string[];
  sections: { clarity: number; impact: number; structure: number; keywords: number };
};

export default function ResumeAnalyzer() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);

  const onDrop = async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (f.type === "text/plain") {
      setText(await f.text());
      toast.success("Loaded " + f.name);
    } else {
      toast.message("PDF/DOCX upload", { description: "Open the file and paste its text into the box for now." });
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "text/plain": [".txt"], "application/pdf": [".pdf"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"] }, multiple: false });

  const analyze = async () => {
    if (text.trim().length < 80) return toast.error("Paste at least a paragraph of resume text.");
    setBusy(true);
    try {
      const r = await runAnalysis<ResumeResult>("resume", { resumeText: text });
      setResult(r);
      await saveAnalysis("resume", r.verdict?.slice(0, 80) || "Resume analysis", { resumeText: text }, r, r.score);
      toast.success("Analysis complete");
    } catch (e: any) {
      toast.error(e.message || "Analysis failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader icon={FileText} title="Resume Analyzer" subtitle="Paste your resume — get an AI score, strengths, weaknesses and rewrite tips." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div {...getRootProps()} className={`rounded-2xl border-2 border-dashed p-6 text-center transition cursor-pointer ${isDragActive ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
            <input {...getInputProps()} />
            <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
            <div className="mt-2 text-sm font-medium">Drop a .txt file or click to select</div>
            <div className="text-xs text-muted-foreground">PDF/DOCX: paste the text below</div>
          </div>
          <Textarea
            placeholder="Paste your resume text here..."
            value={text} onChange={(e) => setText(e.target.value)}
            className="min-h-[320px] rounded-2xl"
          />
          <Button onClick={analyze} disabled={busy} className="w-full rounded-xl shadow-glow">
            {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Analyze with AI"}
          </Button>
        </div>

        <div className="space-y-4">
          {!result && (
            <div className="grid h-full place-items-center rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground min-h-[320px]">
              Your AI report will appear here.
            </div>
          )}
          {result && (
            <>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                  <ScoreRing value={result.score} label={result.score >= 80 ? "Great" : result.score >= 60 ? "Good" : "Needs work"} />
                  <div>
                    <div className="font-display text-lg font-bold">Overall verdict</div>
                    <p className="mt-1 text-sm text-muted-foreground">{result.verdict}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["clarity","impact","structure","keywords"] as const).map((k) => (
                        <span key={k} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                          {k}: <span className="text-primary font-semibold">{result.sections[k]}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Panel icon={CheckCircle2} title="Strengths" tone="success" items={result.strengths} />
                <Panel icon={AlertTriangle} title="Weaknesses" tone="warning" items={result.weaknesses} />
              </div>

              <Panel icon={Lightbulb} title="AI improvements" tone="primary" items={result.improvements} />

              {result.rejection_reasons && result.rejection_reasons.length > 0 && (
                <Panel icon={AlertTriangle} title="Likely rejection reasons" tone="destructive" items={result.rejection_reasons} />
              )}

              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detected skills</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.detected_skills.map((s) => (
                    <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s}</span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Panel({ icon: Icon, title, items, tone }: { icon: any; title: string; items: string[]; tone: "success" | "warning" | "primary" | "destructive" }) {
  const map = {
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    primary: "text-primary bg-primary/10",
    destructive: "text-destructive bg-destructive/10",
  } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${map[tone]}`}><Icon className="h-4 w-4" /></span>
        <div className="font-display font-bold">{title}</div>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
