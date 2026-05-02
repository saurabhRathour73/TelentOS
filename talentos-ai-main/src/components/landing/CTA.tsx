import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-primary px-6 py-14 text-center text-primary-foreground shadow-glow md:px-12">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Your dream job is one upload away.</h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
          Join the new generation of candidates using TalentOS to outsmart the hiring funnel.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6 rounded-xl">
          <Link to="/signup">Create your account <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  );
}
