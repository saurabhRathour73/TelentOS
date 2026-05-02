import PageHeader from "@/components/dashboard/PageHeader";
import { Sparkles, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function ComingSoon() {
  const { pathname } = useLocation();
  const title = pathname.split("/").pop()?.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") || "Module";
  return (
    <div className="animate-fade-in">
      <PageHeader icon={Sparkles} title={title} subtitle="This intelligence module is shipping soon." />
      <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-16 text-center shadow-soft">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary"><Bell className="h-6 w-6" /></div>
        <h3 className="mt-4 font-display text-xl font-bold">{title} is in the lab</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Meanwhile, get massive value from Resume Analyzer, ATS Score, Dream Role Match, and the 30/60/90 Roadmap.
        </p>
        <Button asChild className="mt-5 rounded-xl">
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
