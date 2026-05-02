import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout() {
  const { user } = useAuth();
  const initials = (user?.user_metadata?.full_name || user?.email || "U").slice(0, 1).toUpperCase();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground hidden sm:block">Welcome back, {user?.user_metadata?.full_name || user?.email?.split("@")[0]}</span>
            </div>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              {initials}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
