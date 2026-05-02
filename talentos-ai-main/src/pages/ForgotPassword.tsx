import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a secure link.">
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + "/login",
          });
          setBusy(false);
          if (error) return toast.error(error.message);
          toast.success("Check your inbox for the reset link.");
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button type="submit" disabled={busy} className="w-full rounded-xl">
          {busy ? "Sending..." : "Send reset link"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Remembered? <Link to="/login" className="text-primary font-medium hover:underline">Back to sign in</Link>
      </p>
    </AuthShell>
  );
}
