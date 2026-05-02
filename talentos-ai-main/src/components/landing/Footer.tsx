import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-display font-bold text-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          TalentOS
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/features" className="hover:text-foreground">Features</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
          <Link to="/login" className="hover:text-foreground">Sign in</Link>
        </div>
        <div>© {new Date().getFullYear()} TalentOS. Built with AI.</div>
      </div>
    </footer>
  );
}
