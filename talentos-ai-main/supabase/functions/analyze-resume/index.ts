// Edge function: analyzes a resume using Lovable AI Gateway with structured output.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resumeText, targetRole } = await req.json();
    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Resume text is too short." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const sys = `You are TalentOS, an elite AI career coach and recruiter. Analyze resumes with brutal but constructive honesty. Score from 0-100. Be specific.`;
    const user = `Analyze this resume${targetRole ? ` for the role: ${targetRole}` : ""}.\n\nResume:\n${resumeText}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: sys }, { role: "user", content: user }],
        tools: [{
          type: "function",
          function: {
            name: "submit_analysis",
            description: "Submit the resume analysis result.",
            parameters: {
              type: "object",
              properties: {
                overallScore: { type: "number" },
                atsScore: { type: "number" },
                skillsMatch: { type: "number" },
                strengths: { type: "array", items: { type: "string" } },
                weaknesses: { type: "array", items: { type: "string" } },
                missingKeywords: { type: "array", items: { type: "string" } },
                suggestions: { type: "array", items: { type: "string" } },
                rejectionReasons: { type: "array", items: { type: "string" } },
                summary: { type: "string" },
              },
              required: ["overallScore", "atsScore", "skillsMatch", "strengths", "weaknesses", "missingKeywords", "suggestions", "rejectionReasons", "summary"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "submit_analysis" } },
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) return new Response(JSON.stringify({ error: "Rate limit reached. Try again in a minute." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (resp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds to continue." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const json = await resp.json();
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error("No analysis returned");
    const parsed = JSON.parse(args);
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("analyze-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
