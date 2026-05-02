// TalentOS — single AI endpoint that handles 4 analysis kinds.
// Calls Lovable AI Gateway and returns structured JSON via tool calling.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.105.1/cors";

const MODEL = "google/gemini-2.5-flash";
const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

type Kind = "resume" | "ats" | "role_match" | "roadmap";

const schemas: Record<Kind, { name: string; description: string; parameters: unknown }> = {
  resume: {
    name: "resume_analysis",
    description: "Comprehensive resume analysis with score and suggestions.",
    parameters: {
      type: "object",
      properties: {
        score: { type: "number", description: "Overall resume score 0-100" },
        verdict: { type: "string", description: "One short sentence verdict" },
        strengths: { type: "array", items: { type: "string" }, description: "3-5 strengths" },
        weaknesses: { type: "array", items: { type: "string" }, description: "3-5 weaknesses" },
        rejection_reasons: { type: "array", items: { type: "string" }, description: "Likely reasons recruiters would reject this resume" },
        improvements: { type: "array", items: { type: "string" }, description: "5-7 concrete rewrite suggestions" },
        detected_skills: { type: "array", items: { type: "string" } },
        sections: {
          type: "object",
          properties: {
            clarity: { type: "number" },
            impact: { type: "number" },
            structure: { type: "number" },
            keywords: { type: "number" },
          },
          required: ["clarity", "impact", "structure", "keywords"],
        },
      },
      required: ["score", "verdict", "strengths", "weaknesses", "improvements", "detected_skills", "sections"],
    },
  },
  ats: {
    name: "ats_score",
    description: "ATS keyword match between resume and job description.",
    parameters: {
      type: "object",
      properties: {
        score: { type: "number", description: "ATS match score 0-100" },
        matched_keywords: { type: "array", items: { type: "string" } },
        missing_keywords: { type: "array", items: { type: "string" } },
        format_issues: { type: "array", items: { type: "string" } },
        recommendations: { type: "array", items: { type: "string" } },
        verdict: { type: "string" },
      },
      required: ["score", "matched_keywords", "missing_keywords", "recommendations", "verdict"],
    },
  },
  role_match: {
    name: "role_match",
    description: "Match candidate to a dream role at a target company.",
    parameters: {
      type: "object",
      properties: {
        match_score: { type: "number" },
        hiring_probability: { type: "number" },
        salary_range: { type: "string" },
        market_demand: { type: "string", enum: ["low", "medium", "high", "very high"] },
        missing_skills: { type: "array", items: { type: "string" } },
        required_projects: { type: "array", items: { type: "string" } },
        strengths: { type: "array", items: { type: "string" } },
        verdict: { type: "string" },
      },
      required: ["match_score", "hiring_probability", "missing_skills", "required_projects", "verdict", "salary_range", "market_demand"],
    },
  },
  roadmap: {
    name: "career_roadmap",
    description: "30/60/90 day personalized career roadmap with skills, projects and courses.",
    parameters: {
      type: "object",
      properties: {
        summary: { type: "string" },
        day_30: {
          type: "object",
          properties: {
            focus: { type: "string" },
            skills: { type: "array", items: { type: "string" } },
            projects: { type: "array", items: { type: "string" } },
            courses: { type: "array", items: { type: "string" } },
          },
          required: ["focus", "skills", "projects", "courses"],
        },
        day_60: {
          type: "object",
          properties: {
            focus: { type: "string" },
            skills: { type: "array", items: { type: "string" } },
            projects: { type: "array", items: { type: "string" } },
            courses: { type: "array", items: { type: "string" } },
          },
          required: ["focus", "skills", "projects", "courses"],
        },
        day_90: {
          type: "object",
          properties: {
            focus: { type: "string" },
            skills: { type: "array", items: { type: "string" } },
            projects: { type: "array", items: { type: "string" } },
            courses: { type: "array", items: { type: "string" } },
          },
          required: ["focus", "skills", "projects", "courses"],
        },
      },
      required: ["summary", "day_30", "day_60", "day_90"],
    },
  },
};

const systemPrompts: Record<Kind, string> = {
  resume: "You are a senior tech recruiter and resume coach. Analyze the resume text rigorously. Return only the structured tool call.",
  ats: "You are an ATS (applicant tracking system) expert. Compare resume against job description for keyword and format fit. Return only the structured tool call.",
  role_match: "You are a career intelligence engine. Estimate fit, hiring probability, salary band and gaps for the target role+company. Return only the structured tool call.",
  roadmap: "You are an elite career mentor. Build a realistic 30/60/90 day roadmap tailored to the user's goal and current level. Return only the structured tool call.",
};

function buildUserPrompt(kind: Kind, payload: Record<string, unknown>) {
  switch (kind) {
    case "resume":
      return `Analyze this resume:\n\n${payload.resumeText}`;
    case "ats":
      return `RESUME:\n${payload.resumeText}\n\nJOB DESCRIPTION:\n${payload.jobDescription}`;
    case "role_match":
      return `Target company: ${payload.company}\nTarget role: ${payload.role}\nExperience level: ${payload.level ?? "entry"}\nKnown skills: ${payload.skills ?? "n/a"}\nRecent projects: ${payload.projects ?? "n/a"}`;
    case "roadmap":
      return `Goal role: ${payload.role}\nTarget company: ${payload.company ?? "any top tech"}\nCurrent skills: ${payload.skills ?? "beginner"}\nWeekly hours available: ${payload.hours ?? 10}\nFocus areas the user is missing: ${payload.gaps ?? "general improvement"}`;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const kind = body.kind as Kind;
    if (!schemas[kind]) {
      return new Response(JSON.stringify({ error: "Invalid kind" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tool = {
      type: "function" as const,
      function: schemas[kind],
    };

    const response = await fetch(GATEWAY, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompts[kind] },
          { role: "user", content: buildUserPrompt(kind, body.payload ?? {}) },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: schemas[kind].name } },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("AI gateway error", response.status, text);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit hit. Please retry in a minute." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Workspace Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const call = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!call?.function?.arguments) {
      console.error("No tool call in response", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "AI did not return structured output" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const result = JSON.parse(call.function.arguments);

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("talent-ai error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});