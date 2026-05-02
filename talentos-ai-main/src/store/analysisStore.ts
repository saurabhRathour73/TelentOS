import { create } from "zustand";
import type { ResumeAnalysis } from "@/services/aiService";

interface AnalysisState {
  resumeText: string;
  analysis: ResumeAnalysis | null;
  loading: boolean;
  setResumeText: (t: string) => void;
  setAnalysis: (a: ResumeAnalysis | null) => void;
  setLoading: (b: boolean) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  resumeText: "",
  analysis: null,
  loading: false,
  setResumeText: (resumeText) => set({ resumeText }),
  setAnalysis: (analysis) => set({ analysis }),
  setLoading: (loading) => set({ loading }),
}));
