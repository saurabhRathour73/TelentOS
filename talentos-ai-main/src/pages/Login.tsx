import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your TalentOS workspace.">
      <GoogleButton />
      <div className="my-4 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
      </div>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
          setBusy(false);
          if (error) return toast.error(error.message);
          toast.success("Welcome back!");
          nav("/dashboard");
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="pw">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <Input id="pw" type="password" required value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        <Button type="submit" disabled={busy} className="w-full rounded-xl">
          {busy ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        New here? <Link to="/signup" className="text-primary font-medium hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}
