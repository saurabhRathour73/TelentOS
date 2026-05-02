import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-border/60 glass px-4 shadow-soft">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4" />
          </span>
          TalentOS
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/features", label: "Features" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition-colors hover:bg-secondary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Button onClick={() => nav("/dashboard")} className="rounded-xl">
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => nav("/login")} className="hidden sm:inline-flex rounded-xl">
                Sign in
              </Button>
              <Button onClick={() => nav("/signup")} className="rounded-xl shadow-glow">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
