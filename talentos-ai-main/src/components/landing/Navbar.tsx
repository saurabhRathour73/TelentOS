import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Navbar = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
    <div className="container flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-lg font-semibold tracking-tight">TalentOS</span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
        <a href="#how" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How it works</a>
        <a href="#roadmap" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Roadmap</a>
        <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Sign in</Link>
      </nav>
      <Link to="/signup">
        <Button size="sm" className="rounded-full px-5">Get Started</Button>
      </Link>
    </div>
  </header>
);
