import { motion } from "framer-motion";
import {
  FileText, Target, Briefcase, Brain, TrendingUp, Github,
  Linkedin, Code2, Shield, Lightbulb, Map, GraduationCap
} from "lucide-react";

const features = [
  { icon: FileText, title: "Resume Analyzer", desc: "ATS scoring, keyword detection, rewrite suggestions." },
  { icon: Target, title: "Dream Company", desc: "Match % for Google, Amazon, Microsoft, startups." },
  { icon: Briefcase, title: "Role Match", desc: "Frontend, AI, SDE, Data — find your fit." },
  { icon: Brain, title: "Skill Gap", desc: "What's missing for your target role." },
  { icon: TrendingUp, title: "Hiring Probability", desc: "Real-time odds based on your profile." },
  { icon: Github, title: "GitHub Analyzer", desc: "Project depth, contribution heatmap." },
  { icon: Linkedin, title: "LinkedIn Analyzer", desc: "Brand strength + recruiter visibility." },
  { icon: Code2, title: "LeetCode Insights", desc: "Problem mix, weak topics, prep plan." },
  { icon: Shield, title: "Recruiter Simulation", desc: "AI plays a recruiter screening you." },
  { icon: Lightbulb, title: "Project Builder", desc: "Stronger projects to win your dream role." },
  { icon: Map, title: "30/60/90 Roadmap", desc: "Day-by-day plan to close the gap." },
  { icon: GraduationCap, title: "Course Suggestions", desc: "Curated learning paths from AI." },
];

export const Features = () => (
  <section id="features" className="border-t bg-muted/30 py-24">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm font-medium text-primary">Everything you need</div>
        <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          A full career intelligence stack
        </h2>
        <p className="mt-4 text-muted-foreground">
          18 AI-powered modules. One unified OS for your career.
        </p>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="surface-card group p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
