import { supabase } from "@/integrations/supabase/client";

export type AnalysisKind = "resume" | "ats" | "role_match" | "roadmap";

export async function runAnalysis<T = any>(kind: AnalysisKind, payload: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("talent-ai", {
    body: { kind, payload },
  });
  if (error) throw error;
  if ((data as any)?.error) throw new Error((data as any).error);
  return (data as { result: T }).result;
}

export async function saveAnalysis(kind: AnalysisKind, title: string, input: unknown, result: unknown, score?: number) {
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("analyses")
    .insert({ user_id: u.user.id, kind, title, input: input as any, result: result as any, score: score ?? null })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listAnalyses(kind?: AnalysisKind) {
  let q = supabase.from("analyses").select("*").order("created_at", { ascending: false }).limit(20);
  if (kind) q = q.eq("kind", kind);
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}
