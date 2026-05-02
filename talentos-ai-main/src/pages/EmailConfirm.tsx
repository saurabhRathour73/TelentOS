import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const EmailConfirm = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleConfirmation = async () => {
      try {
        const code = searchParams.get("code");
        if (!code) {
          toast.error("No confirmation code provided");
          setLoading(false);
          setTimeout(() => nav("/login"), 2000);
          return;
        }
        
        // Exchange code for session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
          toast.error(error.message);
          setLoading(false);
          setTimeout(() => nav("/login"), 2000);
          return;
        }

        toast.success("Email confirmed! Logging you in...");
        
        // Wait for auth state to update, then redirect
        setTimeout(() => {
          nav("/dashboard", { replace: true });
        }, 1000);
      } catch (err) {
        console.error("Confirmation error:", err);
        toast.error("Failed to confirm email");
        setLoading(false);
        setTimeout(() => nav("/login"), 2000);
      }
    };

    handleConfirmation();
  }, [searchParams, nav, user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg font-medium">Confirming your email...</p>
      </div>
    </div>
  );
};

export default EmailConfirm;
