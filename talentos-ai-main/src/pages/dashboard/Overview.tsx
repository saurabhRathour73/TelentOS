import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Target, TrendingUp, Brain, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useAuth } from "@/hooks/useAuth";

const stats = [
  { label: "Resume Score", value: "—", icon: FileText, hint: "Run analyzer" },
  { label: "ATS Match", value: "—", icon: Target, hint: "Awaiting upload" },
  { label: "Hiring Probability", value: "—", icon: TrendingUp, hint: "Pick a target" },
  { label: "Skill Gap", value: "—", icon: Brain, hint: "Pick a role" },
];

const quickActions = [
  { title: "Analyze your resume", desc: "Get ATS score, weaknesses, rewrite suggestions in seconds.", to: "/dashboard/resume", icon: FileText },
  { title: "Match a dream company", desc: "See your fit % for Google, Amazon, startups, and more.", to: "/dashboard/dream-company", icon: Target },
  { title: "Generate 90-day roadmap", desc: "AI-personalized plan to land your dream role.", to: "/dashboard/roadmap", icon: Sparkles },
];

export default function Overview() {
  const { user } = useAuth();
  const name = (user?.user_metadata as any)?.full_name?.split(" ")[0] ?? "there";
  return (
    <div className="animate-fade-in">
      <PageHeader title={`Welcome, ${name}.`} description="Your AI-powered career operating system. Start with the resume analyzer." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.hint}</div>
          </motion.div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-lg font-semibold">Quick actions</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((a) => (
          <Link key={a.title} to={a.to} className="surface-card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <a.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{a.desc}</p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Open <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
