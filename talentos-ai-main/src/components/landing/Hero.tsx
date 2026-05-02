import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, FileText, Target, TrendingUp } from "lucide-react";

const FloatingCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`glass-card p-4 ${className}`}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative grid min-h-[calc(100vh-4rem)] items-center gap-12 py-12 lg:grid-cols-2 lg:gap-8 lg:py-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            AI Career Intelligence Platform
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Your AI Career<br />
            <span className="text-primary">Operating System</span>
          </h1>
          <p className="max-w-xl text-balance text-lg text-muted-foreground">
            Analyze your resume, decode dream companies, simulate recruiters, and get a personalized 90-day roadmap. Built to land you the role you actually want.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/signup">
              <Button size="lg" className="h-12 rounded-full px-7 text-base shadow-elegant">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
                See features
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            {["No credit card", "ATS-grade analysis", "Powered by AI"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — floating cards */}
        <div className="relative h-[520px] lg:h-[580px]">
          <FloatingCard delay={0.1} className="absolute left-0 top-4 w-[280px] animate-float">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="text-xs font-medium text-muted-foreground">AI Resume Analyzer</div>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 text-center">
              <div className="text-xs text-muted-foreground">Overall Score</div>
              <div className="my-2 text-5xl font-semibold text-primary">85<span className="text-2xl">%</span></div>
              <div className="text-xs font-medium text-success">Great Job!</div>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.25} className="absolute right-0 top-0 w-[220px] animate-float-delayed">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10 text-success">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-xs font-medium text-muted-foreground">Skills Match</div>
            </div>
            <div className="text-3xl font-semibold text-success">92%</div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
              <div className="h-full w-[92%] rounded-full bg-success" />
            </div>
          </FloatingCard>

          <FloatingCard delay={0.4} className="absolute right-4 top-44 w-[260px] animate-float-slow">
            <div className="mb-2 text-xs font-semibold">Strengths</div>
            <ul className="space-y-1.5 text-sm">
              {["Clear Structure", "Strong Skills Section", "Relevant Experience"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-success" /> {s}
                </li>
              ))}
            </ul>
          </FloatingCard>

          <FloatingCard delay={0.55} className="absolute bottom-20 left-4 w-[240px] animate-float">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Target className="h-4 w-4" />
              </div>
              <div className="text-xs font-medium text-muted-foreground">ATS Score</div>
            </div>
            <div className="text-3xl font-semibold">88%</div>
            <div className="text-xs text-success">Good Match</div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
              <div className="h-full w-[88%] rounded-full bg-primary" />
            </div>
          </FloatingCard>

          <FloatingCard delay={0.7} className="absolute bottom-0 right-8 w-[260px] animate-float-delayed">
            <div className="mb-2 text-xs font-semibold">AI Suggestions</div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">●</span> Add measurable achievements</li>
              <li className="flex gap-2"><span className="text-primary">●</span> Improve bullet point clarity</li>
              <li className="flex gap-2"><span className="text-primary">●</span> Include relevant keywords</li>
            </ul>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};
