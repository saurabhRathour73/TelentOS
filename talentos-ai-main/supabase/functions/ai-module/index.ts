// Universal AI module endpoint — powers all "Coming Soon" features via Lovable AI Gateway.
// Each module is defined by a slug and a JSON schema for structured output.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ModuleDef = {
  system: string;
  buildUser: (input: Record<string, unknown>) => string;
  schema: Record<string, unknown>;
  fnName: string;
};

const scoreArr = (name: string) => ({
  type: "array",
  items: { type: "string" },
  description: name,
});

const MODULES: Record<string, ModuleDef> = {
  "ats-score": {
    fnName: "submit_ats",
    system: "You are an elite ATS (Applicant Tracking System) auditor. Score keyword density, formatting, parseability, and section coverage.",
    buildUser: ({ resumeText, jobDescription }) =>
      `Audit this resume against ATS systems${jobDescription ? " for the job description below" : ""}.\n\nResume:\n${resumeText}\n\n${jobDescription ? `Job description:\n${jobDescription}` : ""}`,
    schema: {
      type: "object",
      properties: {
        atsScore: { type: "number" },
        keywordCoverage: { type: "number" },
        formatScore: { type: "number" },
        matchedKeywords: scoreArr("Keywords found in resume"),
        missingKeywords: scoreArr("Keywords missing"),
        formatIssues: scoreArr("Formatting issues to fix"),
        suggestions: scoreArr("Concrete fixes"),
        summary: { type: "string" },
      },
      required: ["atsScore", "keywordCoverage", "formatScore", "matchedKeywords", "missingKeywords", "formatIssues", "suggestions", "summary"],
      additionalProperties: false,
    },
  },
  "rejection": {
    fnName: "submit_rejection",
    system: "You are a no-nonsense recruiter. Predict the top reasons this resume gets rejected at major companies.",
    buildUser: ({ resumeText, targetRole }) =>
      `Resume:\n${resumeText}\n\n${targetRole ? `Target role: ${targetRole}` : ""}`,
    schema: {
      type: "object",
      properties: {
        rejectionRisk: { type: "number", description: "0-100 risk of rejection" },
        topReasons: scoreArr("Top reasons for rejection"),
        redFlags: scoreArr("Red flags recruiters notice"),
        quickFixes: scoreArr("Fast wins to reduce rejection"),
        summary: { type: "string" },
      },
      required: ["rejectionRisk", "topReasons", "redFlags", "quickFixes", "summary"],
      additionalProperties: false,
    },
  },
  "role-match": {
    fnName: "submit_role_match",
    system: "You match candidates to role archetypes (frontend, backend, full-stack, data, ML, devops, PM, design).",
    buildUser: ({ resumeText }) => `Resume:\n${resumeText}\n\nRank top 5 role archetypes for this candidate.`,
    schema: {
      type: "object",
      properties: {
        matches: {
          type: "array",
          items: {
            type: "object",
            properties: {
              role: { type: "string" },
              score: { type: "number" },
              reason: { type: "string" },
            },
            required: ["role", "score", "reason"],
            additionalProperties: false,
          },
        },
        summary: { type: "string" },
      },
      required: ["matches", "summary"],
      additionalProperties: false,
    },
  },
  "skill-gap": {
    fnName: "submit_skill_gap",
    system: "You compare a candidate's skills against a target role/JD and surface gaps with learning order.",
    buildUser: ({ resumeText, jobDescription, targetRole }) =>
      `Candidate resume:\n${resumeText}\n\n${jobDescription ? `Job description:\n${jobDescription}` : ""}${targetRole ? `\n\nTarget role: ${targetRole}` : ""}`,
    schema: {
      type: "object",
      properties: {
        haveSkills: scoreArr("Skills candidate has"),
        missingSkills: scoreArr("Skills missing for target"),
        priority: {
          type: "array",
          items: {
            type: "object",
            properties: {
              skill: { type: "string" },
              importance: { type: "string", enum: ["critical", "high", "medium", "low"] },
              weeksToLearn: { type: "number" },
            },
            required: ["skill", "importance", "weeksToLearn"],
            additionalProperties: false,
          },
        },
        summary: { type: "string" },
      },
      required: ["haveSkills", "missingSkills", "priority", "summary"],
      additionalProperties: false,
    },
  },
  "hiring": {
    fnName: "submit_hiring",
    system: "You estimate hiring probability (0-100%) based on profile vs target role/company.",
    buildUser: ({ resumeText, targetRole, company }) =>
      `Resume:\n${resumeText}\n\nTarget role: ${targetRole || "not specified"}\nCompany: ${company || "not specified"}`,
    schema: {
      type: "object",
      properties: {
        probability: { type: "number" },
        confidence: { type: "string", enum: ["low", "medium", "high"] },
        boosters: scoreArr("Things that increase odds"),
        blockers: scoreArr("Things that lower odds"),
        nextActions: scoreArr("Top 3 actions to improve odds"),
        summary: { type: "string" },
      },
      required: ["probability", "confidence", "boosters", "blockers", "nextActions", "summary"],
      additionalProperties: false,
    },
  },
  "salary": {
    fnName: "submit_salary",
    system: "You are a compensation analyst with deep market knowledge. Use realistic 2025 ranges in USD unless region specifies otherwise.",
    buildUser: ({ role, location, experienceYears }) =>
      `Role: ${role}\nLocation: ${location || "global"}\nExperience: ${experienceYears || "any"} years`,
    schema: {
      type: "object",
      properties: {
        currency: { type: "string" },
        low: { type: "number" },
        median: { type: "number" },
        high: { type: "number" },
        topPayers: scoreArr("Companies known to pay top of market"),
        trend: { type: "string", enum: ["rising", "flat", "declining"] },
        notes: scoreArr("Key insights"),
        summary: { type: "string" },
      },
      required: ["currency", "low", "median", "high", "topPayers", "trend", "notes", "summary"],
      additionalProperties: false,
    },
  },
  "market": {
    fnName: "submit_market",
    system: "You are a tech labor market analyst. Surface hot skills, emerging roles, and demand signals.",
    buildUser: ({ industry, region }) =>
      `Industry: ${industry || "software"}\nRegion: ${region || "global"}\nGenerate a 2025 market outlook.`,
    schema: {
      type: "object",
      properties: {
        hotSkills: scoreArr("Hottest skills right now"),
        emergingRoles: scoreArr("Emerging job titles"),
        decliningRoles: scoreArr("Declining job titles"),
        demandIndex: { type: "number", description: "0-100 overall hiring demand" },
        insights: scoreArr("Strategic insights"),
        summary: { type: "string" },
      },
      required: ["hotSkills", "emergingRoles", "decliningRoles", "demandIndex", "insights", "summary"],
      additionalProperties: false,
    },
  },
  "linkedin": {
    fnName: "submit_linkedin",
    system: "You audit LinkedIn profiles for headline, about, experience, and recruiter searchability.",
    buildUser: ({ profileText, targetRole }) =>
      `LinkedIn profile (pasted text or URL summary):\n${profileText}\n\n${targetRole ? `Target role: ${targetRole}` : ""}`,
    schema: {
      type: "object",
      properties: {
        brandScore: { type: "number" },
        headlineSuggestions: scoreArr("Better headline options"),
        aboutRewrite: { type: "string", description: "Rewritten About section" },
        strengths: scoreArr("What's working"),
        weaknesses: scoreArr("What's hurting visibility"),
        keywordsToAdd: scoreArr("Keywords to add for recruiter search"),
        summary: { type: "string" },
      },
      required: ["brandScore", "headlineSuggestions", "aboutRewrite", "strengths", "weaknesses", "keywordsToAdd", "summary"],
      additionalProperties: false,
    },
  },
  "github": {
    fnName: "submit_github",
    system: "You audit a GitHub presence: repo depth, language mix, README quality, contribution cadence.",
    buildUser: ({ username, profileText }) =>
      `GitHub username: ${username || "n/a"}\nProfile / repo summary:\n${profileText || "(none)"}\nEvaluate even from sparse signals.`,
    schema: {
      type: "object",
      properties: {
        repoQualityScore: { type: "number" },
        activityScore: { type: "number" },
        languageMix: scoreArr("Primary languages observed"),
        topRepos: scoreArr("Repos worth highlighting"),
        improvements: scoreArr("Concrete improvements"),
        summary: { type: "string" },
      },
      required: ["repoQualityScore", "activityScore", "languageMix", "topRepos", "improvements", "summary"],
      additionalProperties: false,
    },
  },
  "leetcode": {
    fnName: "submit_leetcode",
    system: "You evaluate DSA / LeetCode performance and recommend a focused prep plan.",
    buildUser: ({ stats }) =>
      `Stats / pasted profile:\n${stats}\nIdentify weak topics and recommend a 4-week prep plan.`,
    schema: {
      type: "object",
      properties: {
        skillScore: { type: "number" },
        strongTopics: scoreArr("Strong DSA topics"),
        weakTopics: scoreArr("Weak DSA topics"),
        prepPlan: scoreArr("Week-by-week prep plan"),
        summary: { type: "string" },
      },
      required: ["skillScore", "strongTopics", "weakTopics", "prepPlan", "summary"],
      additionalProperties: false,
    },
  },
  "portfolio": {
    fnName: "submit_portfolio",
    system: "You audit personal portfolios: UX, content, project storytelling, performance.",
    buildUser: ({ url, description }) =>
      `Portfolio URL: ${url || "n/a"}\nDescription:\n${description || ""}`,
    schema: {
      type: "object",
      properties: {
        designScore: { type: "number" },
        contentScore: { type: "number" },
        performanceScore: { type: "number" },
        strengths: scoreArr("What works"),
        issues: scoreArr("Issues to fix"),
        improvements: scoreArr("Concrete improvements"),
        summary: { type: "string" },
      },
      required: ["designScore", "contentScore", "performanceScore", "strengths", "issues", "improvements", "summary"],
      additionalProperties: false,
    },
  },
  "presence": {
    fnName: "submit_presence",
    system: "You compute a unified Tech Presence score across LinkedIn, GitHub, portfolio, blogs, communities.",
    buildUser: ({ links, notes }) =>
      `Links: ${links || "n/a"}\nNotes:\n${notes || ""}`,
    schema: {
      type: "object",
      properties: {
        presenceScore: { type: "number" },
        breakdown: {
          type: "array",
          items: {
            type: "object",
            properties: {
              channel: { type: "string" },
              score: { type: "number" },
              note: { type: "string" },
            },
            required: ["channel", "score", "note"],
            additionalProperties: false,
          },
        },
        actions: scoreArr("Top actions to raise visibility"),
        summary: { type: "string" },
      },
      required: ["presenceScore", "breakdown", "actions", "summary"],
      additionalProperties: false,
    },
  },
  "projects": {
    fnName: "submit_projects",
    system: "You rate project portfolios as Weak / Average / Strong / Elite based on impact, complexity, originality.",
    buildUser: ({ projects }) => `Projects:\n${projects}`,
    schema: {
      type: "object",
      properties: {
        rating: { type: "string", enum: ["Weak", "Average", "Strong", "Elite"] },
        score: { type: "number" },
        impact: scoreArr("Impact observations"),
        complexity: scoreArr("Complexity observations"),
        upgrades: scoreArr("How to push to next tier"),
        summary: { type: "string" },
      },
      required: ["rating", "score", "impact", "complexity", "upgrades", "summary"],
      additionalProperties: false,
    },
  },
  "recruiter": {
    fnName: "submit_recruiter",
    system: "You are a senior recruiter running a behavioral screen. Generate the next question, evaluate the previous answer if any, and track score.",
    buildUser: ({ role, history, lastAnswer }) =>
      `Role: ${role || "Software Engineer"}\nConversation so far:\n${history || "(start of interview)"}\n${lastAnswer ? `Candidate's last answer:\n${lastAnswer}` : ""}`,
    schema: {
      type: "object",
      properties: {
        feedback: { type: "string", description: "Feedback on last answer (or empty if first turn)" },
        score: { type: "number", description: "0-100 running score" },
        nextQuestion: { type: "string" },
        done: { type: "boolean" },
      },
      required: ["feedback", "score", "nextQuestion", "done"],
      additionalProperties: false,
    },
  },
  "courses": {
    fnName: "submit_courses",
    system: "You design personalized learning paths. Use real, well-known courses (Coursera, Udemy, freeCodeCamp, official docs, YouTube channels).",
    buildUser: ({ goal, currentLevel }) =>
      `Goal: ${goal}\nCurrent level: ${currentLevel || "beginner"}`,
    schema: {
      type: "object",
      properties: {
        path: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              provider: { type: "string" },
              url: { type: "string" },
              durationHours: { type: "number" },
              level: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
              why: { type: "string" },
            },
            required: ["title", "provider", "url", "durationHours", "level", "why"],
            additionalProperties: false,
          },
        },
        weeks: { type: "number" },
        summary: { type: "string" },
      },
      required: ["path", "weeks", "summary"],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { module, input } = await req.json();
    const def = MODULES[module];
    if (!def) {
      return new Response(JSON.stringify({ error: `Unknown module: ${module}` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const safeInput = (input ?? {}) as Record<string, unknown>;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: def.system },
          { role: "user", content: def.buildUser(safeInput) },
        ],
        tools: [{
          type: "function",
          function: {
            name: def.fnName,
            description: `Submit structured result for module ${module}`,
            parameters: def.schema,
          },
        }],
        tool_choice: { type: "function", function: { name: def.fnName } },
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
    if (!args) throw new Error("No structured result returned");
    const parsed = JSON.parse(args);
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("ai-module error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});