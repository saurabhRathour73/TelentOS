import { Sparkles } from "lucide-react";

export const Footer = () => (
  <footer className="border-t py-12">
    <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <span className="text-sm font-semibold">TalentOS</span>
        <span className="text-sm text-muted-foreground">— AI Career Intelligence OS</span>
      </div>
      <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TalentOS. Built for builders.</p>
    </div>
  </footer>
);
