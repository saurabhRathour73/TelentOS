import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  return (
    <AuthShell title="Create your TalentOS" subtitle="Free forever for your first analyses.">
      <GoogleButton />
      <div className="my-4 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
      </div>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const { error } = await supabase.auth.signUp({
            email, password: pw,
            options: {
              data: { full_name: name },
              emailRedirectTo: window.location.origin + "/dashboard",
            },
          });
          setBusy(false);
          if (error) return toast.error(error.message);
          toast.success("Account created! Welcome.");
          nav("/dashboard");
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pw">Password</Label>
          <Input id="pw" type="password" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} />
          <p className="text-xs text-muted-foreground">Min 8 characters. We check against known leaked passwords.</p>
        </div>
        <Button type="submit" disabled={busy} className="w-full rounded-xl shadow-glow">
          {busy ? "Creating..." : "Create account"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
