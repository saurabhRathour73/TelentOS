import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { document.title = "Reset password — TalentOS"; }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Check your inbox for reset instructions.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="h-4 w-4" /></div>
          <span className="text-lg font-semibold">TalentOS</span>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reset password</h1>
          <p className="mt-2 text-sm text-muted-foreground">{sent ? "We've sent a reset link to your email." : "Enter your email and we'll send a reset link."}</p>
        </div>
        {!sent && (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send reset link
            </Button>
          </form>
        )}
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </Link>
      </div>
    </div>
  );
};
export default ForgotPassword;
