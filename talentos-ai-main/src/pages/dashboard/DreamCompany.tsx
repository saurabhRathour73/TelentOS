import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const popular = [
  { name: "Google", match: 78, role: "SDE", color: "bg-blue-500" },
  { name: "Amazon", match: 71, role: "Frontend", color: "bg-orange-500" },
  { name: "Microsoft", match: 82, role: "AI Engineer", color: "bg-cyan-500" },
  { name: "Stripe", match: 65, role: "Frontend", color: "bg-violet-500" },
  { name: "Notion", match: 74, role: "Product Eng", color: "bg-zinc-700" },
  { name: "Vercel", match: 80, role: "Frontend", color: "bg-foreground" },
];

export default function DreamCompany() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="animate-fade-in">
      <PageHeader title="Dream Company" description="Pick a company + role and we'll show your fit, missing skills, and probability." />

      <div className="surface-card mb-8 p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <div className="space-y-2">
            <Label>Company</Label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Google, Stripe, TCS, your favorite startup..." />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Frontend, SDE, AI Engineer..." />
          </div>
          <div className="flex items-end">
            <Button size="lg" className="w-full rounded-full md:w-auto">Run match <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Popular targets</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="surface-card group cursor-pointer p-5 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.color} text-white`}>
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.role}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-primary">{p.match}%</div>
                <div className="text-xs text-muted-foreground">match</div>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.match}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
