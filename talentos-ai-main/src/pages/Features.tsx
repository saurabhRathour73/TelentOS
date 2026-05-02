import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-20 pb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Product</span>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-extrabold tracking-tight">Built like an OS for your career.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every module is designed to plug into the next. Resume → ATS → Role match → Roadmap. One unified intelligence layer.
          </p>
        </section>
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
