import PageHeader from "@/components/dashboard/PageHeader";
import { Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  return (
    <div className="animate-fade-in">
      <PageHeader icon={SettingsIcon} title="Settings" subtitle="Manage your TalentOS account." />
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft max-w-xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Signed in as</div>
        <div className="mt-1 font-display text-lg font-bold">{user?.email}</div>
        <div className="text-sm text-muted-foreground">{user?.user_metadata?.full_name}</div>
        <Button variant="outline" className="mt-5 rounded-xl" onClick={async () => { await signOut(); nav("/"); }}>Sign out</Button>
      </div>
    </div>
  );
}
