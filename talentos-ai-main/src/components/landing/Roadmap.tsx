import { motion } from "framer-motion";

const steps = [
  { day: "Day 1-30", title: "Foundation", desc: "Resume, ATS optimization, GitHub polish, foundational skills." },
  { day: "Day 31-60", title: "Build", desc: "Ship 2 portfolio-grade projects, LinkedIn presence, mock interviews." },
  { day: "Day 61-90", title: "Apply", desc: "Tailored applications, recruiter outreach, offer negotiation." },
];

export const Roadmap = () => (
  <section id="roadmap" className="py-24">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm font-medium text-primary">Roadmap engine</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">90 days to your dream role</h2>
        <p className="mt-4 text-muted-foreground">A personalized day-by-day plan generated for your target company.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.day}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="surface-card relative overflow-hidden p-8"
          >
            <div className="absolute -right-6 -top-6 text-8xl font-bold text-primary/5">{i + 1}</div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">{s.day}</div>
            <h3 className="mt-2 text-2xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
