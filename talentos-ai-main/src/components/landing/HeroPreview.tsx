import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Sparkles, FileText } from "lucide-react";

function Ring({ value }: { value: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
      <circle cx="60" cy="60" r={r} stroke="hsl(var(--secondary))" strokeWidth="10" fill="none" />
      <motion.circle
        cx="60" cy="60" r={r}
        stroke="hsl(var(--primary))" strokeWidth="10" fill="none" strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: off }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function HeroPreview() {
  return (
    <div className="relative h-[520px]">
      {/* Main score card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute left-0 top-6 w-[280px] rounded-2xl border border-border bg-card p-6 shadow-elevated"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <FileText className="h-4 w-4 text-primary" /> RESUME SCORE
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative">
            <Ring value={85} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-display text-2xl font-bold">85</div>
                <div className="text-[10px] uppercase tracking-wider text-success font-semibold">Great</div>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Strong skills section. Tighten bullets for impact.
          </div>
        </div>
      </motion.div>

      {/* ATS card */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.4 }}
        className="absolute right-0 top-0 w-[230px] rounded-2xl border border-border bg-card p-5 shadow-elevated"
      >
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>ATS MATCH</span>
          <TrendingUp className="h-4 w-4 text-success" />
        </div>
        <div className="mt-2 font-display text-3xl font-bold text-success">92%</div>
        <div className="mt-3 h-2 rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.4 }}
            className="h-full rounded-full bg-success"
          />
        </div>
        <div className="mt-3 text-xs text-muted-foreground">Frontend Engineer · Stripe</div>
      </motion.div>

      {/* Strengths */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-2 top-[210px] w-[260px] rounded-2xl border border-border bg-card p-5 shadow-elevated"
      >
        <div className="text-xs font-semibold text-muted-foreground">STRENGTHS</div>
        <ul className="mt-2 space-y-2 text-sm">
          {["Clear structure", "Strong skills section", "Relevant experience"].map((s) => (
            <li key={s} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" /> {s}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* AI Tip */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1.2 }}
        className="absolute left-10 bottom-10 w-[260px] rounded-2xl bg-primary p-5 text-primary-foreground shadow-glow"
      >
        <div className="flex items-center gap-2 text-xs font-semibold opacity-90">
          <Sparkles className="h-4 w-4" /> AI TIP
        </div>
        <div className="mt-2 text-sm leading-snug">
          Tailor your resume to the job. Add 3 quantified wins to your top role.
        </div>
      </motion.div>

      {/* Skills match floating */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
        className="absolute right-32 bottom-0 w-[180px] rounded-2xl border border-border bg-card p-4 shadow-elevated"
      >
        <div className="text-xs font-semibold text-muted-foreground">SKILLS MATCH</div>
        <div className="mt-1 font-display text-2xl font-bold text-success">92%</div>
        <svg viewBox="0 0 100 30" className="mt-1 h-8 w-full">
          <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
            points="0,22 15,18 30,20 45,12 60,15 75,8 100,4" />
        </svg>
      </motion.div>
    </div>
  );
}
