import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

const Login = () => {
  const nav = useNavigate();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => { 
    if (user) nav("/dashboard", { replace: true });
  }, [user, nav]);
  useEffect(() => { document.title = "Sign in — TalentOS"; }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailNotConfirmed(false);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      if (error.message === "Email not confirmed") {
        setEmailNotConfirmed(true);
      }
      return toast.error(error.message);
    }
    toast.success("Welcome back!");
    nav("/dashboard");
  };

  const resendConfirmation = async () => {
    if (!email) return toast.error("Please enter your email");
    setResendLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setResendLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Confirmation email sent! Check your inbox.");
  };

  const loginWithoutVerification = async () => {
    console.log("⚠️ DEV: Attempting direct session set (verification bypass)");
    setResendLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (data?.user) {
        console.log("✅ User object found, setting session directly");
        // For development - if we have user data but email not confirmed, still allow session
        toast.success("Welcome back! (Verification bypassed)");
        nav("/dashboard");
      } else {
        toast.error(error?.message || "Login failed");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Login failed");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-foreground p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-background">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary"><Sparkles className="h-4 w-4" /></div>
          <span className="text-lg font-semibold">TalentOS</span>
        </Link>
        <div className="text-background">
          <h2 className="text-4xl font-semibold tracking-tight">Welcome back.</h2>
          <p className="mt-3 text-background/60">Pick up where you left off and keep building toward your dream role.</p>
        </div>
        <div className="text-xs text-background/40">© {new Date().getFullYear()} TalentOS</div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to continue.</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">Forgot?</Link>
              </div>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Button type="submit" disabled={loading} className="w-full rounded-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
              </Button>
              {emailNotConfirmed && (
                <>
                  <Button type="button" onClick={resendConfirmation} disabled={resendLoading} variant="outline" className="w-full rounded-full">
                    {resendLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Resend confirmation email
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">Haven't received the email? Check spam or wait a few minutes.</p>
                </>
              )}
            </div>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            New to TalentOS? <Link to="/signup" className="font-medium text-primary hover:underline">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
