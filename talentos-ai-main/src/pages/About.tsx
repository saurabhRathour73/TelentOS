import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">About</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">We believe careers deserve an OS.</h1>
        <p className="mt-5 text-muted-foreground">
          TalentOS started with a simple observation: every job seeker juggles 10 disconnected tools — resume builders, ATS scanners,
          job boards, course platforms, and YouTube tutorials. We unified them into a single AI-native workspace that learns your goals,
          measures your gaps, and ships a plan you can actually follow.
        </p>
        <h2 className="mt-10 font-display text-2xl font-bold">What we measure</h2>
        <ul className="mt-3 grid list-disc gap-2 pl-5 text-muted-foreground">
          <li>Resume quality, ATS fit, and likely rejection reasons</li>
          <li>Role and company match probability with salary intelligence</li>
          <li>Skill gaps and the projects that close them fastest</li>
          <li>A weekly 30/60/90 day plan tuned to your time budget</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
