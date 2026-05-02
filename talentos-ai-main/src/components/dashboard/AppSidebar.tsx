import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, FileText, Gauge, Ban, Building2, Briefcase, Brain, TrendingUp, DollarSign,
  BarChart3, Linkedin, Github, Code2, Globe, Sparkles, Layers, UserCheck, Rocket, Map, GraduationCap, Settings, LogOut,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const main = [
  { to: "/dashboard", title: "Overview", icon: LayoutDashboard },
];
const analyze = [
  { to: "/dashboard/resume", title: "Resume Analyzer", icon: FileText },
  { to: "/dashboard/ats", title: "ATS Score", icon: Gauge },
  { to: "/dashboard/role-match", title: "Dream Role Match", icon: Building2 },
  { to: "/dashboard/roadmap", title: "30/60/90 Roadmap", icon: Map },
];
const soon = [
  { to: "/dashboard/rejection", title: "Resume Rejection", icon: Ban },
  { to: "/dashboard/skill-gap", title: "Skill Gap", icon: Brain },
  { to: "/dashboard/hiring-probability", title: "Hiring Probability", icon: UserCheck },
  { to: "/dashboard/salary", title: "Salary Trends", icon: DollarSign },
  { to: "/dashboard/market", title: "Market Trends", icon: TrendingUp },
  { to: "/dashboard/linkedin", title: "LinkedIn Analyzer", icon: Linkedin },
  { to: "/dashboard/github", title: "GitHub Analyzer", icon: Github },
  { to: "/dashboard/leetcode", title: "LeetCode Analyzer", icon: Code2 },
  { to: "/dashboard/portfolio", title: "Portfolio Analyzer", icon: Globe },
  { to: "/dashboard/tech-presence", title: "Tech Presence", icon: BarChart3 },
  { to: "/dashboard/project-strength", title: "Project Strength", icon: Layers },
  { to: "/dashboard/recruiter-sim", title: "Recruiter Simulation", icon: Briefcase },
  { to: "/dashboard/strong-projects", title: "Strong Projects", icon: Rocket },
  { to: "/dashboard/courses", title: "Courses", icon: GraduationCap },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const nav = useNavigate();
  const isActive = (p: string) => pathname === p;

  const renderItems = (items: typeof main) =>
    items.map((it) => (
      <SidebarMenuItem key={it.to}>
        <SidebarMenuButton asChild isActive={isActive(it.to)} tooltip={it.title}>
          <NavLink to={it.to} end className="flex items-center gap-2">
            <it.icon className="h-4 w-4" />
            {!collapsed && <span>{it.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-3">
        <NavLink to="/" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          {!collapsed && <span>TalentOS</span>}
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Workspace</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(main)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Analyze</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(analyze)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Coming soon</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(soon)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <NavLink to="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {!collapsed && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sign out" onClick={async () => { await signOut(); nav("/"); }}>
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sign out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
