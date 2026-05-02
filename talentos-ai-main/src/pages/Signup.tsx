import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

const Signup = () => {
  const nav = useNavigate();
  const { signUp, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) nav("/dashboard", { replace: true }); }, [user, nav]);
  useEffect(() => { document.title = "Create account — TalentOS"; }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created! Check your email to verify your account.");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-foreground p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-background">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary"><Sparkles className="h-4 w-4" /></div>
          <span className="text-lg font-semibold">TalentOS</span>
        </Link>
        <div className="text-background">
          <h2 className="text-4xl font-semibold tracking-tight">Start your career OS.</h2>
          <p className="mt-3 text-background/60">Free forever for individuals. Land the role that's actually yours.</p>
        </div>
        <div className="text-xs text-background/40">© {new Date().getFullYear()} TalentOS</div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Get started in less than 30 seconds.</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
