import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AuthDebug = () => {
  const [testEmail, setTestEmail] = useState("test@example.com");
  const [testPassword, setTestPassword] = useState("SecurePassword123!@#");
  const [loading, setLoading] = useState(false);

  const createVerifiedTestUser = async () => {
    setLoading(true);
    try {
      // 1. Create user account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        toast.error(`Sign up failed: ${signUpError.message}`);
        setLoading(false);
        return;
      }

      console.log("✅ User created:", testEmail);
      toast.success("Test user created!");

      // 2. Verify the user via edge function
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
        "verify-user",
        {
          body: { email: testEmail },
        }
      );

      if (verifyError) {
        console.warn("⚠️ Could not auto-verify (requires service role):", verifyError);
        toast.info("User created. You may need to manually verify in Supabase dashboard.");
      } else {
        console.log("✅ User verified:", verifyData);
        toast.success("User created and verified! You can now login.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to create test user");
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (error) {
        toast.error(`Login failed: ${error.message}`);
      } else {
        toast.success(`Login successful! User: ${data.user?.email}`);
        console.log("✅ Logged in:", data.user);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Auth Debug</h1>
        
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Test Email</label>
            <Input 
              value={testEmail} 
              onChange={(e) => setTestEmail(e.target.value)} 
              type="email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Test Password</label>
            <Input 
              value={testPassword} 
              onChange={(e) => setTestPassword(e.target.value)} 
              type="password"
            />
          </div>

          <Button 
            onClick={createVerifiedTestUser} 
            disabled={loading}
            className="w-full"
          >
            Create Test User
          </Button>

          <Button 
            onClick={testLogin} 
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Test Login
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
          <p className="font-semibold mb-2">📧 Email Verification Issue</p>
          <p className="mb-2">Supabase requires email confirmation before login by default.</p>
          <p className="mb-2"><strong>Solution:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Go to Supabase Dashboard → Authentication → Providers → Email</li>
            <li>Uncheck "Confirm email" to disable verification requirement</li>
            <li>Or manually verify accounts in Supabase dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
