import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { useState } from "react";

export default function GoogleButton() {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="outline"
      type="button"
      className="w-full rounded-xl"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
        if (result.error) {
          toast.error("Google sign-in failed.");
          setBusy(false);
          return;
        }
        if (result.redirected) return;
        window.location.href = "/dashboard";
      }}
    >
      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.227c0-.818-.073-1.604-.21-2.36H12v4.46h5.39a4.6 4.6 0 0 1-2 3.02v2.51h3.23c1.89-1.74 2.98-4.3 2.98-7.63z"/><path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.23-2.51c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.6A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.39 13.89A6 6 0 0 1 6.07 12c0-.66.11-1.3.32-1.89V7.51H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.49l3.35-2.6z"/><path fill="#EA4335" d="M12 6.58c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.97 3.6 14.7 2.7 12 2.7A10 10 0 0 0 3.04 7.51l3.35 2.6C7.18 8.34 9.39 6.58 12 6.58z"/></svg>
      {busy ? "Connecting..." : "Continue with Google"}
    </Button>
  );
}
