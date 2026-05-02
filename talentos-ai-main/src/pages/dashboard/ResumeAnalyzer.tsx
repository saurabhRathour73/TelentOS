import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FileText, Upload, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { analyzeResume } from "@/services/aiService";
import { useAnalysisStore } from "@/store/analysisStore";

const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const c = 2 * Math.PI * 42;
  const offset = c - (score / 100) * c;
  const color = score >= 80 ? "text-success" : score >= 60 ? "text-primary" : "text-destructive";
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90">
          <circle cx="64" cy="64" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted" />
          <circle cx="64" cy="64" r="42" stroke="currentColor" strokeWidth="8" fill="none"
            strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" className={color}
            style={{ transition: "stroke-dashoffset 1s ease-out" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-semibold ${color}`}>{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium">{label}</div>
    </div>
  );
};

export default function ResumeAnalyzer() {
  const { resumeText, setResumeText, analysis, setAnalysis, loading, setLoading } = useAnalysisStore();
  const [targetRole, setTargetRole] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/plain": [".txt"], "text/markdown": [".md"] },
    multiple: false,
    onDrop: async (files) => {
      const f = files[0];
      if (!f) return;
      const text = await f.text();
      setResumeText(text);
      toast.success(`Loaded ${f.name}`);
    },
  });

  const onAnalyze = async () => {
    if (resumeText.trim().length < 50) return toast.error("Paste your resume text (at least 50 chars).");
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeResume(resumeText, targetRole || undefined);
      setAnalysis(result);
      toast.success("Analysis complete!");
    } catch (e: any) {
      toast.error(e.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Resume Analyzer" description="Get an AI-powered ATS score, strengths, weaknesses, and rewrite suggestions." />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="surface-card space-y-5 p-6 lg:col-span-3">
          <div {...getRootProps()} className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
            <input {...getInputProps()} />
            <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
            <div className="text-sm font-medium">{isDragActive ? "Drop your resume here" : "Drop a .txt resume or paste below"}</div>
            <div className="mt-1 text-xs text-muted-foreground">PDF parsing coming soon — paste text for now.</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Target role (optional)</Label>
            <Input id="role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer at Stripe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume text</Label>
            <Textarea id="resume" value={resumeText} onChange={(e) => setResumeText(e.target.value)}
              rows={12} placeholder="Paste your full resume here..." className="font-mono text-xs" />
          </div>

          <Button onClick={onAnalyze} disabled={loading} size="lg" className="w-full rounded-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : <><Sparkles className="mr-2 h-4 w-4" /> Analyze with AI</>}
          </Button>
        </div>

        <div className="lg:col-span-2">
          {!analysis && !loading && (
            <div className="surface-card flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
              <FileText className="mb-3 h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold">Your AI report will appear here</h3>
              <p className="mt-1 text-sm text-muted-foreground">Paste your resume and hit analyze.</p>
            </div>
          )}

          {loading && (
            <div className="surface-card flex h-full min-h-[400px] flex-col items-center justify-center p-8">
              <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">AI is reviewing your resume...</p>
            </div>
          )}

          {analysis && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="surface-card p-6">
                <div className="grid grid-cols-3 gap-2">
                  <ScoreRing score={analysis.overallScore} label="Overall" />
                  <ScoreRing score={analysis.atsScore} label="ATS" />
                  <ScoreRing score={analysis.skillsMatch} label="Skills" />
                </div>
                <p className="mt-5 text-sm text-muted-foreground">{analysis.summary}</p>
              </div>

              <Section title="Strengths" icon={<CheckCircle2 className="h-4 w-4 text-success" />} items={analysis.strengths} />
              <Section title="Weaknesses" icon={<AlertCircle className="h-4 w-4 text-destructive" />} items={analysis.weaknesses} />
              <Section title="Missing keywords" items={analysis.missingKeywords} pills />
              <Section title="Suggestions" icon={<Sparkles className="h-4 w-4 text-primary" />} items={analysis.suggestions} />
              {analysis.rejectionReasons?.length > 0 && (
                <Section title="Why you might get rejected" icon={<AlertCircle className="h-4 w-4 text-destructive" />} items={analysis.rejectionReasons} />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, icon, items, pills }: { title: string; icon?: React.ReactNode; items: string[]; pills?: boolean }) => (
  <div className="surface-card p-5">
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
    {pills ? (
      <div className="flex flex-wrap gap-1.5">
        {items.map((k, i) => <span key={i} className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{k}</span>)}
      </div>
    ) : (
      <ul className="space-y-2 text-sm">
        {items.map((k, i) => <li key={i} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />{k}</li>)}
      </ul>
    )}
  </div>
);
