import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, Target, XCircle, Building2, Briefcase, Brain,
  TrendingUp, DollarSign, BarChart3, Linkedin, Github, Code2, Globe,
  Sparkles as SparklesIcon, Wrench, Shield, Rocket, Map, GraduationCap, Settings, LogOut
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const groups = [
  {
    label: "Workspace",
    items: [
      { title: "Overview", url: "/dashboard", icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: "Resume",
    items: [
      { title: "Resume Analyzer", url: "/dashboard/resume", icon: FileText },
      { title: "ATS Score", url: "/dashboard/ats", icon: Target },
      { title: "Rejection Insights", url: "/dashboard/rejection", icon: XCircle },
    ],
  },
  {
    label: "Career Match",
    items: [
      { title: "Dream Company", url: "/dashboard/dream-company", icon: Building2 },
      { title: "Role Match", url: "/dashboard/role-match", icon: Briefcase },
      { title: "Skill Gap", url: "/dashboard/skill-gap", icon: Brain },
      { title: "Hiring Probability", url: "/dashboard/hiring", icon: TrendingUp },
    ],
  },
  {
    label: "Market",
    items: [
      { title: "Salary Trends", url: "/dashboard/salary", icon: DollarSign },
      { title: "Market Trends", url: "/dashboard/market", icon: BarChart3 },
    ],
  },
  {
    label: "Tech Presence",
    items: [
      { title: "LinkedIn", url: "/dashboard/linkedin", icon: Linkedin },
      { title: "GitHub", url: "/dashboard/github", icon: Github },
      { title: "LeetCode", url: "/dashboard/leetcode", icon: Code2 },
      { title: "Portfolio", url: "/dashboard/portfolio", icon: Globe },
      { title: "Tech Presence", url: "/dashboard/presence", icon: SparklesIcon },
    ],
  },
  {
    label: "Build",
    items: [
      { title: "Project Strength", url: "/dashboard/projects", icon: Wrench },
      { title: "Recruiter Sim", url: "/dashboard/recruiter", icon: Shield },
      { title: "Strong Projects", url: "/dashboard/builder", icon: Rocket },
      { title: "Roadmap", url: "/dashboard/roadmap", icon: Map },
      { title: "Courses", url: "/dashboard/courses", icon: GraduationCap },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { signOut, user } = useAuth();
  const nav = useNavigate();

  const isActive = (url: string, end?: boolean) => end ? pathname === url : pathname.startsWith(url);

  const onSignOut = async () => { await signOut(); nav("/"); };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <SparklesIcon className="h-4 w-4" />
          </div>
          {!collapsed && <span className="text-base font-semibold">TalentOS</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            {!collapsed && <SidebarGroupLabel>{g.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url, (item as any).end)}>
                      <NavLink to={item.url} end={(item as any).end} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="flex items-center gap-2 p-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {user?.email?.[0]?.toUpperCase() ?? "U"}
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium">{user?.email}</div>
              </div>
              <button onClick={onSignOut} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Sign out">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
