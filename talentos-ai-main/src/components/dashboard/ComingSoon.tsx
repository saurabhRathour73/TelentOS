import { Sparkles } from "lucide-react";
import { PageHeader } from "./PageHeader";

export const ComingSoon = ({ title, description, hint }: { title: string; description: string; hint?: string }) => (
  <div className="animate-fade-in">
    <PageHeader title={title} description={description} />
    <div className="surface-card flex flex-col items-center justify-center gap-3 p-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">Module preview</h3>
      <p className="max-w-md text-sm text-muted-foreground">{hint ?? "This module is wired into the OS. Full AI integration is rolling out — try Resume Analyzer to see the live AI flow."}</p>
    </div>
  </div>
);
