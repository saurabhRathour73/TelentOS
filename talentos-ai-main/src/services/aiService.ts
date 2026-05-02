// AI Service — wraps backend edge functions. Future-proof: swap edge functions for any backend.
import { supabase } from "@/integrations/supabase/client";

export interface ResumeAnalysis {
  overallScore: number;
  atsScore: number;
  skillsMatch: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  suggestions: string[];
  rejectionReasons: string[];
  summary: string;
}

export async function analyzeResume(resumeText: string, targetRole?: string): Promise<ResumeAnalysis> {
  const { data, error } = await supabase.functions.invoke("analyze-resume", {
    body: { resumeText, targetRole },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data as ResumeAnalysis;
}

// Generic AI module caller — powers all "Coming Soon" features without breaking anything.
export async function runAIModule<T = any>(module: string, input: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("ai-module", {
    body: { module, input },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data as T;
}
