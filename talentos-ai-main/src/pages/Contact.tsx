import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact() {
  const [sending, setSending] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Say hello.</h1>
        <p className="mt-3 text-muted-foreground">Questions, feedback, or partnerships — we read every message.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              toast.success("Message sent — we'll reply within 24 hours.");
              (e.target as HTMLFormElement).reset();
            }, 700);
          }}
          className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" rows={5} required />
          </div>
          <Button type="submit" disabled={sending} className="rounded-xl">
            {sending ? "Sending..." : "Send message"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
