import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import EmailConfirm from "./pages/EmailConfirm";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import ResumeAnalyzer from "./pages/dashboard/ResumeAnalyzer";
import DreamCompany from "./pages/dashboard/DreamCompany";
import RoadmapPage from "./pages/dashboard/Roadmap";
import {
  ATSScore, Rejection, RoleMatch, SkillGap, HiringProbability, SalaryTrends, MarketTrends,
  LinkedInAnalyzer, GitHubAnalyzer, LeetCodeAnalyzer, PortfolioAnalyzer, TechPresence,
  ProjectStrength, RecruiterSimulation, StrongProjects, Courses, Settings as SettingsPage,
} from "./pages/dashboard/_modules";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<EmailConfirm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Overview />} />
              <Route path="resume" element={<ResumeAnalyzer />} />
              <Route path="ats" element={<ATSScore />} />
              <Route path="rejection" element={<Rejection />} />
              <Route path="dream-company" element={<DreamCompany />} />
              <Route path="role-match" element={<RoleMatch />} />
              <Route path="skill-gap" element={<SkillGap />} />
              <Route path="hiring" element={<HiringProbability />} />
              <Route path="salary" element={<SalaryTrends />} />
              <Route path="market" element={<MarketTrends />} />
              <Route path="linkedin" element={<LinkedInAnalyzer />} />
              <Route path="github" element={<GitHubAnalyzer />} />
              <Route path="leetcode" element={<LeetCodeAnalyzer />} />
              <Route path="portfolio" element={<PortfolioAnalyzer />} />
              <Route path="presence" element={<TechPresence />} />
              <Route path="projects" element={<ProjectStrength />} />
              <Route path="recruiter" element={<RecruiterSimulation />} />
              <Route path="builder" element={<StrongProjects />} />
              <Route path="roadmap" element={<RoadmapPage />} />
              <Route path="courses" element={<Courses />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
