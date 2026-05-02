import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck2, Target, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Career Intelligence — now in beta
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl text-balance">
            Your AI Career
            <br />
            <span className="text-primary">Operating System</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground text-balance">
            TalentOS analyzes your resume, scores your ATS fit, matches you to dream roles at your target company,
            and ships a personalized 30/60/90 day roadmap — powered by AI.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-xl shadow-glow">
              <Link to="/signup">
                Start free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link to="/features">See how it works</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> No card required</span>
            <span className="inline-flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-success" /> Resume + ATS scoring</span>
            <span className="inline-flex items-center gap-2"><Target className="h-4 w-4 text-success" /> Dream-role match</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}
