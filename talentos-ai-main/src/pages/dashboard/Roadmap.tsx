import { motion } from "framer-motion";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";

const phases = [
  {
    title: "Days 1–30 · Foundation",
    items: [
      "Optimize resume for ATS (target 90+ score)",
      "Audit GitHub: pin top 6 projects, add READMEs",
      "Brush up on data structures (arrays, hashmaps, trees)",
      "Complete 1 system design primer",
    ],
  },
  {
    title: "Days 31–60 · Build",
    items: [
      "Ship a portfolio-grade fullstack project",
      "Open source contribution (1 merged PR)",
      "LinkedIn: 3 posts/week on what you're building",
      "10 mock interviews (peer or AI)",
    ],
  },
  {
    title: "Days 61–90 · Apply",
    items: [
      "Tailored applications: 5/day to dream companies",
      "Recruiter outreach: 20 personalized DMs/week",
      "Onsite prep: behavioral + system design + coding",
      "Negotiate offers using market data",
    ],
  },
];

export default function Roadmap() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="90-Day Roadmap" description="A personalized path from where you are to your dream offer.">
        <Button className="rounded-full"><Sparkles className="mr-2 h-4 w-4" /> Regenerate with AI</Button>
      </PageHeader>

      <div className="space-y-6">
        {phases.map((phase, pi) => (
          <motion.div key={phase.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: pi * 0.1 }}
            className="surface-card p-6">
            <h3 className="mb-4 text-lg font-semibold">{phase.title}</h3>
            <ul className="space-y-3">
              {phase.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  {i === 0 && pi === 0 ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
