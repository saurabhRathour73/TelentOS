import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Roadmap } from "@/components/landing/Roadmap";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "TalentOS — Your AI Career Operating System";
    const meta = document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute("content", "AI-powered resume analysis, ATS scoring, dream company matching, and a 90-day roadmap to land your dream tech role.");
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};
export default Index;
