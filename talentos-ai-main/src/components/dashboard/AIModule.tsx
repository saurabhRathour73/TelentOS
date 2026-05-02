import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { runAIModule } from "@/services/aiService";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
  required?: boolean;
  rows?: number;
};

interface Props {
  module: string;
  title: string;
  description: string;
  fields: FieldDef[];
  ctaLabel?: string;
  renderResult: (result: any) => React.ReactNode;
}

export function AIModule({ module, title, description, fields, ctaLabel = "Run AI", renderResult }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const setField = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const onRun = async () => {
    for (const f of fields) {
      if (f.required && !(values[f.name] || "").trim()) {
        return toast.error(`${f.label} is required`);
      }
    }
    setLoading(true);
    setResult(null);
    try {
      const r = await runAIModule(module, values);
      setResult(r);
      toast.success("AI analysis complete!");
    } catch (e: any) {
      toast.error(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title={title} description={description} />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="surface-card space-y-5 p-6 lg:col-span-2">
          {fields.map((f) => (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={f.name}>{f.label}{f.required && <span className="ml-1 text-destructive">*</span>}</Label>
              {f.type === "textarea" ? (
                <Textarea id={f.name} rows={f.rows ?? 6} placeholder={f.placeholder}
                  value={values[f.name] || ""} onChange={(e) => setField(f.name, e.target.value)}
                  className="text-sm" />
              ) : (
                <Input id={f.name} placeholder={f.placeholder}
                  value={values[f.name] || ""} onChange={(e) => setField(f.name, e.target.value)} />
              )}
            </div>
          ))}
          <Button onClick={onRun} disabled={loading} size="lg" className="w-full rounded-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
              : <><Sparkles className="mr-2 h-4 w-4" /> {ctaLabel}</>}
          </Button>
        </div>

        <div className="lg:col-span-3">
          {!result && !loading && (
            <div className="surface-card flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
              <Sparkles className="mb-3 h-8 w-8 text-muted-foreground" />
              <h3 className="font-semibold">Your AI report will appear here</h3>
              <p className="mt-1 text-sm text-muted-foreground">Fill out the form and run the AI.</p>
            </div>
          )}
          {loading && (
            <div className="surface-card flex h-full min-h-[400px] flex-col items-center justify-center p-8">
              <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">AI is thinking...</p>
            </div>
          )}
          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {renderResult(result)}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----- Reusable presentational helpers ----- */

export const ScoreCard = ({ score, label, max = 100 }: { score: number; label: string; max?: number }) => {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  const color = pct >= 75 ? "text-success" : pct >= 50 ? "text-primary" : "text-destructive";
  return (
    <div className="surface-card flex flex-col items-center p-5">
      <div className={`text-4xl font-semibold ${color}`}>{Math.round(score)}</div>
      <div className="mt-1 text-xs text-muted-foreground">/ {max}</div>
      <div className="mt-2 text-sm font-medium text-center">{label}</div>
    </div>
  );
};

export const ListCard = ({
  title, items, icon, pills,
}: { title: string; items?: string[]; icon?: React.ReactNode; pills?: boolean }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="surface-card p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
      {pills ? (
        <div className="flex flex-wrap gap-1.5">
          {items.map((k, i) => <span key={i} className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{k}</span>)}
        </div>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.map((k, i) => <li key={i} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />{k}</li>)}
        </ul>
      )}
    </div>
  );
};

export const SummaryCard = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <div className="surface-card p-5 text-sm text-muted-foreground">{text}</div>;
};

export const StrengthIcon = () => <CheckCircle2 className="h-4 w-4 text-success" />;
export const WarnIcon = () => <AlertCircle className="h-4 w-4 text-destructive" />;
export const SparkIcon = () => <Sparkles className="h-4 w-4 text-primary" />;