import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => (
  <section className="border-t py-24">
    <div className="container">
      <div className="surface-card relative overflow-hidden bg-foreground p-12 text-center md:p-20">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight text-background md:text-5xl">
            Stop guessing. Start landing offers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-background/70">
            Join engineers using TalentOS to break into top companies.
          </p>
          <Link to="/signup" className="mt-8 inline-block">
            <Button size="lg" className="h-12 rounded-full px-7 text-base">
              Start free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);
