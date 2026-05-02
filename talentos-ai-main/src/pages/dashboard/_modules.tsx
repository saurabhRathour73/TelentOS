import { ComingSoon } from "@/components/dashboard/ComingSoon";
import { AIModule, ScoreCard, ListCard, SummaryCard, StrengthIcon, WarnIcon, SparkIcon } from "@/components/dashboard/AIModule";

export const ATSScore = () => (
  <AIModule
    module="ats-score"
    title="ATS Score"
    description="Audit your resume against Applicant Tracking Systems."
    fields={[
      { name: "resumeText", label: "Resume text", type: "textarea", rows: 10, required: true, placeholder: "Paste your resume..." },
      { name: "jobDescription", label: "Job description (optional)", type: "textarea", rows: 6, placeholder: "Paste the JD for keyword match..." },
    ]}
    ctaLabel="Run ATS audit"
    renderResult={(r) => (
      <>
        <div className="grid grid-cols-3 gap-3">
          <ScoreCard score={r.atsScore} label="ATS Score" />
          <ScoreCard score={r.keywordCoverage} label="Keyword Coverage" />
          <ScoreCard score={r.formatScore} label="Format" />
        </div>
        <SummaryCard text={r.summary} />
        <ListCard title="Matched keywords" items={r.matchedKeywords} pills />
        <ListCard title="Missing keywords" items={r.missingKeywords} pills />
        <ListCard title="Format issues" items={r.formatIssues} icon={<WarnIcon />} />
        <ListCard title="Suggestions" items={r.suggestions} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const Rejection = () => (
  <AIModule
    module="rejection"
    title="Rejection Insights"
    description="Why your resume might get filtered out — and how to fix it."
    fields={[
      { name: "resumeText", label: "Resume text", type: "textarea", rows: 10, required: true },
      { name: "targetRole", label: "Target role (optional)" },
    ]}
    ctaLabel="Predict rejection risk"
    renderResult={(r) => (
      <>
        <div className="grid grid-cols-1 gap-3">
          <ScoreCard score={r.rejectionRisk} label="Rejection Risk" />
        </div>
        <SummaryCard text={r.summary} />
        <ListCard title="Top reasons" items={r.topReasons} icon={<WarnIcon />} />
        <ListCard title="Red flags" items={r.redFlags} icon={<WarnIcon />} />
        <ListCard title="Quick fixes" items={r.quickFixes} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const RoleMatch = () => (
  <AIModule
    module="role-match"
    title="Role Match"
    description="See which role archetypes you fit best."
    fields={[{ name: "resumeText", label: "Resume text", type: "textarea", rows: 12, required: true }]}
    ctaLabel="Match my roles"
    renderResult={(r) => (
      <>
        <SummaryCard text={r.summary} />
        <div className="space-y-3">
          {r.matches?.map((m: any, i: number) => (
            <div key={i} className="surface-card p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{m.role}</div>
                <div className="text-sm font-semibold text-primary">{m.score}%</div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{m.reason}</p>
            </div>
          ))}
        </div>
      </>
    )}
  />
);

export const SkillGap = () => (
  <AIModule
    module="skill-gap"
    title="Skill Gap"
    description="What you have, what's missing, and what to learn next."
    fields={[
      { name: "resumeText", label: "Resume text", type: "textarea", rows: 8, required: true },
      { name: "jobDescription", label: "Job description", type: "textarea", rows: 6 },
      { name: "targetRole", label: "Target role" },
    ]}
    ctaLabel="Analyze gaps"
    renderResult={(r) => (
      <>
        <SummaryCard text={r.summary} />
        <ListCard title="You already have" items={r.haveSkills} icon={<StrengthIcon />} pills />
        <ListCard title="Missing skills" items={r.missingSkills} icon={<WarnIcon />} pills />
        <div className="surface-card p-5">
          <div className="mb-3 text-sm font-semibold">Learning priority</div>
          <div className="space-y-2">
            {r.priority?.map((p: any, i: number) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="text-sm font-medium">{p.skill}</div>
                  <div className="text-xs text-muted-foreground">~{p.weeksToLearn} weeks</div>
                </div>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{p.importance}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    )}
  />
);

export const HiringProbability = () => (
  <AIModule
    module="hiring"
    title="Hiring Probability"
    description="Your AI-estimated odds for a given role + company."
    fields={[
      { name: "resumeText", label: "Resume text", type: "textarea", rows: 8, required: true },
      { name: "targetRole", label: "Target role", required: true },
      { name: "company", label: "Target company" },
    ]}
    ctaLabel="Estimate odds"
    renderResult={(r) => (
      <>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ScoreCard score={r.probability} label={`Hiring probability (${r.confidence} confidence)`} />
          <div className="surface-card p-5 text-sm text-muted-foreground">{r.summary}</div>
        </div>
        <ListCard title="Boosters" items={r.boosters} icon={<StrengthIcon />} />
        <ListCard title="Blockers" items={r.blockers} icon={<WarnIcon />} />
        <ListCard title="Next actions" items={r.nextActions} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const SalaryTrends = () => (
  <AIModule
    module="salary"
    title="Salary Trends"
    description="Market ranges by role, location, and experience."
    fields={[
      { name: "role", label: "Role", required: true, placeholder: "e.g. Senior Frontend Engineer" },
      { name: "location", label: "Location", placeholder: "e.g. Berlin, Remote-EU" },
      { name: "experienceYears", label: "Years of experience", placeholder: "e.g. 5" },
    ]}
    ctaLabel="Show salary range"
    renderResult={(r) => (
      <>
        <div className="grid grid-cols-3 gap-3">
          <ScoreCard score={r.low / 1000} label={`Low (${r.currency}k)`} max={Math.max(r.high / 1000, 100)} />
          <ScoreCard score={r.median / 1000} label={`Median (${r.currency}k)`} max={Math.max(r.high / 1000, 100)} />
          <ScoreCard score={r.high / 1000} label={`High (${r.currency}k)`} max={Math.max(r.high / 1000, 100)} />
        </div>
        <SummaryCard text={r.summary} />
        <div className="surface-card p-5">
          <div className="mb-2 text-sm font-semibold">Trend</div>
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary capitalize">{r.trend}</span>
        </div>
        <ListCard title="Top payers" items={r.topPayers} pills />
        <ListCard title="Notes" items={r.notes} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const MarketTrends = () => (
  <AIModule
    module="market"
    title="Market Trends"
    description="Hot skills, emerging roles, and demand signals."
    fields={[
      { name: "industry", label: "Industry", placeholder: "e.g. Fintech, AI, Web3" },
      { name: "region", label: "Region", placeholder: "e.g. Europe, US, India" },
    ]}
    ctaLabel="Generate market report"
    renderResult={(r) => (
      <>
        <div className="grid grid-cols-1 gap-3">
          <ScoreCard score={r.demandIndex} label="Hiring Demand Index" />
        </div>
        <SummaryCard text={r.summary} />
        <ListCard title="Hot skills" items={r.hotSkills} pills icon={<SparkIcon />} />
        <ListCard title="Emerging roles" items={r.emergingRoles} icon={<StrengthIcon />} />
        <ListCard title="Declining roles" items={r.decliningRoles} icon={<WarnIcon />} />
        <ListCard title="Strategic insights" items={r.insights} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const LinkedInAnalyzer = () => (
  <AIModule
    module="linkedin"
    title="LinkedIn Analyzer"
    description="Brand strength, headline ideas, and recruiter searchability."
    fields={[
      { name: "profileText", label: "Paste your LinkedIn profile (headline + about + experience)", type: "textarea", rows: 12, required: true },
      { name: "targetRole", label: "Target role" },
    ]}
    ctaLabel="Audit LinkedIn"
    renderResult={(r) => (
      <>
        <ScoreCard score={r.brandScore} label="Brand Score" />
        <SummaryCard text={r.summary} />
        <ListCard title="Headline suggestions" items={r.headlineSuggestions} icon={<SparkIcon />} />
        <div className="surface-card p-5">
          <div className="mb-2 text-sm font-semibold">Rewritten About</div>
          <p className="whitespace-pre-line text-sm text-muted-foreground">{r.aboutRewrite}</p>
        </div>
        <ListCard title="Strengths" items={r.strengths} icon={<StrengthIcon />} />
        <ListCard title="Weaknesses" items={r.weaknesses} icon={<WarnIcon />} />
        <ListCard title="Keywords to add" items={r.keywordsToAdd} pills />
      </>
    )}
  />
);

export const GitHubAnalyzer = () => (
  <AIModule
    module="github"
    title="GitHub Analyzer"
    description="Repo quality, language mix, and contribution patterns."
    fields={[
      { name: "username", label: "GitHub username" },
      { name: "profileText", label: "Paste your repo list / READMEs / pinned repos", type: "textarea", rows: 10 },
    ]}
    ctaLabel="Audit GitHub"
    renderResult={(r) => (
      <>
        <div className="grid grid-cols-2 gap-3">
          <ScoreCard score={r.repoQualityScore} label="Repo Quality" />
          <ScoreCard score={r.activityScore} label="Activity" />
        </div>
        <SummaryCard text={r.summary} />
        <ListCard title="Languages" items={r.languageMix} pills />
        <ListCard title="Top repos" items={r.topRepos} icon={<StrengthIcon />} />
        <ListCard title="Improvements" items={r.improvements} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const LeetCodeAnalyzer = () => (
  <AIModule
    module="leetcode"
    title="LeetCode Analyzer"
    description="Strong/weak topics and a focused 4-week prep plan."
    fields={[
      { name: "stats", label: "Paste your LeetCode stats / topic breakdown / recent problems", type: "textarea", rows: 10, required: true },
    ]}
    ctaLabel="Build prep plan"
    renderResult={(r) => (
      <>
        <ScoreCard score={r.skillScore} label="DSA Skill Score" />
        <SummaryCard text={r.summary} />
        <ListCard title="Strong topics" items={r.strongTopics} pills icon={<StrengthIcon />} />
        <ListCard title="Weak topics" items={r.weakTopics} pills icon={<WarnIcon />} />
        <ListCard title="Prep plan (week-by-week)" items={r.prepPlan} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const PortfolioAnalyzer = () => (
  <AIModule
    module="portfolio"
    title="Portfolio Analyzer"
    description="UX, content, and performance audit of your portfolio."
    fields={[
      { name: "url", label: "Portfolio URL", placeholder: "https://you.dev" },
      { name: "description", label: "Describe your portfolio (sections, projects, stack)", type: "textarea", rows: 8, required: true },
    ]}
    ctaLabel="Audit portfolio"
    renderResult={(r) => (
      <>
        <div className="grid grid-cols-3 gap-3">
          <ScoreCard score={r.designScore} label="Design" />
          <ScoreCard score={r.contentScore} label="Content" />
          <ScoreCard score={r.performanceScore} label="Performance" />
        </div>
        <SummaryCard text={r.summary} />
        <ListCard title="Strengths" items={r.strengths} icon={<StrengthIcon />} />
        <ListCard title="Issues" items={r.issues} icon={<WarnIcon />} />
        <ListCard title="Improvements" items={r.improvements} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const TechPresence = () => (
  <AIModule
    module="presence"
    title="Tech Presence"
    description="Unified visibility score across the dev ecosystem."
    fields={[
      { name: "links", label: "Links (LinkedIn, GitHub, portfolio, blog, X, etc.)", type: "textarea", rows: 5, required: true },
      { name: "notes", label: "Anything else worth knowing", type: "textarea", rows: 4 },
    ]}
    ctaLabel="Score my presence"
    renderResult={(r) => (
      <>
        <ScoreCard score={r.presenceScore} label="Presence Score" />
        <SummaryCard text={r.summary} />
        <div className="surface-card p-5">
          <div className="mb-3 text-sm font-semibold">Channel breakdown</div>
          <div className="space-y-2">
            {r.breakdown?.map((b: any, i: number) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="text-sm font-medium">{b.channel}</div>
                  <div className="text-xs text-muted-foreground">{b.note}</div>
                </div>
                <div className="text-sm font-semibold text-primary">{b.score}</div>
              </div>
            ))}
          </div>
        </div>
        <ListCard title="Top actions" items={r.actions} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const ProjectStrength = () => (
  <AIModule
    module="projects"
    title="Project Strength"
    description="Weak / Average / Strong / Elite — rated by AI."
    fields={[
      { name: "projects", label: "Describe your projects (one per paragraph)", type: "textarea", rows: 12, required: true },
    ]}
    ctaLabel="Rate my projects"
    renderResult={(r) => (
      <>
        <div className="surface-card flex items-center justify-between p-5">
          <div>
            <div className="text-xs text-muted-foreground">Tier</div>
            <div className="text-2xl font-semibold text-primary">{r.rating}</div>
          </div>
          <ScoreCard score={r.score} label="Project Score" />
        </div>
        <SummaryCard text={r.summary} />
        <ListCard title="Impact" items={r.impact} icon={<StrengthIcon />} />
        <ListCard title="Complexity" items={r.complexity} icon={<SparkIcon />} />
        <ListCard title="How to push to next tier" items={r.upgrades} icon={<SparkIcon />} />
      </>
    )}
  />
);

/* Recruiter Simulation — interactive turn-based chat using the same backend module. */
import { useState as _useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { runAIModule } from "@/services/aiService";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Turn = { q: string; a?: string; feedback?: string; score?: number };

export const RecruiterSimulation = () => {
  const [role, setRole] = _useState("");
  const [turns, setTurns] = _useState<Turn[]>([]);
  const [answer, setAnswer] = _useState("");
  const [loading, setLoading] = _useState(false);
  const [done, setDone] = _useState(false);
  const [score, setScore] = _useState(0);

  const start = async () => {
    setLoading(true);
    setTurns([]);
    setDone(false);
    setScore(0);
    try {
      const r: any = await runAIModule("recruiter", { role, history: "", lastAnswer: "" });
      setTurns([{ q: r.nextQuestion }]);
      setScore(r.score || 0);
    } catch (e: any) { toast.error(e.message || "Failed"); }
    finally { setLoading(false); }
  };

  const submit = async () => {
    if (!answer.trim()) return toast.error("Type your answer");
    setLoading(true);
    const last = turns[turns.length - 1];
    const updated = [...turns];
    updated[updated.length - 1] = { ...last, a: answer };
    const history = updated.map((t, i) => `Q${i + 1}: ${t.q}\nA${i + 1}: ${t.a || ""}`).join("\n");
    try {
      const r: any = await runAIModule("recruiter", { role, history, lastAnswer: answer });
      updated[updated.length - 1] = { ...updated[updated.length - 1], feedback: r.feedback, score: r.score };
      if (!r.done) updated.push({ q: r.nextQuestion });
      setTurns(updated);
      setAnswer("");
      setScore(r.score || 0);
      setDone(!!r.done);
    } catch (e: any) { toast.error(e.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Recruiter Simulation" description="AI plays a recruiter and screens you in real time." />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="surface-card space-y-4 p-6 lg:col-span-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target role</label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Backend Engineer" />
          </div>
          <Button onClick={start} disabled={loading} size="lg" className="w-full rounded-full">
            {loading && turns.length === 0 ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting...</> : <><Sparkles className="mr-2 h-4 w-4" /> Start interview</>}
          </Button>
          {turns.length > 0 && (
            <div className="rounded-xl border p-4 text-sm">
              <div className="text-xs text-muted-foreground">Running score</div>
              <div className="text-2xl font-semibold text-primary">{score}</div>
            </div>
          )}
        </div>
        <div className="lg:col-span-3 space-y-4">
          {turns.length === 0 && !loading && (
            <div className="surface-card flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
              <Sparkles className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Set a role and start the interview.</p>
            </div>
          )}
          {turns.map((t, i) => (
            <div key={i} className="surface-card p-5 space-y-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Recruiter</div>
                <div className="mt-1 text-sm">{t.q}</div>
              </div>
              {t.a && <div><div className="text-xs uppercase tracking-wide text-muted-foreground">You</div><div className="mt-1 text-sm">{t.a}</div></div>}
              {t.feedback && <div className="rounded-lg bg-primary-soft p-3 text-sm text-primary">{t.feedback}</div>}
            </div>
          ))}
          {turns.length > 0 && !done && (
            <div className="surface-card p-5 space-y-3">
              <Textarea rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer..." />
              <Button onClick={submit} disabled={loading} className="rounded-full">
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send answer"}
              </Button>
            </div>
          )}
          {done && <div className="surface-card p-5 text-sm text-muted-foreground">Interview complete. Final score: <strong className="text-primary">{score}</strong></div>}
        </div>
      </div>
    </div>
  );
};

export const StrongProjects = () => (
  <AIModule
    module="projects"
    title="Strong Project Builder"
    description="AI rates your projects and suggests upgrades to reach Elite tier."
    fields={[
      { name: "projects", label: "List your projects (or ideas) — one per paragraph", type: "textarea", rows: 12, required: true },
    ]}
    ctaLabel="Get upgrade plan"
    renderResult={(r) => (
      <>
        <div className="surface-card flex items-center justify-between p-5">
          <div>
            <div className="text-xs text-muted-foreground">Current tier</div>
            <div className="text-2xl font-semibold text-primary">{r.rating}</div>
          </div>
          <ScoreCard score={r.score} label="Score" />
        </div>
        <SummaryCard text={r.summary} />
        <ListCard title="Upgrade ideas" items={r.upgrades} icon={<SparkIcon />} />
      </>
    )}
  />
);

export const Courses = () => (
  <AIModule
    module="courses"
    title="Course Suggestions"
    description="A personalized learning path tailored to your goal."
    fields={[
      { name: "goal", label: "Your goal", required: true, placeholder: "e.g. Land a Senior ML Engineer role" },
      { name: "currentLevel", label: "Current level", placeholder: "beginner / intermediate / advanced" },
    ]}
    ctaLabel="Build my path"
    renderResult={(r) => (
      <>
        <SummaryCard text={r.summary} />
        <div className="surface-card p-5">
          <div className="mb-3 text-sm font-semibold">Plan ({r.weeks} weeks)</div>
          <div className="space-y-3">
            {r.path?.map((c: any, i: number) => (
              <a key={i} href={c.url} target="_blank" rel="noreferrer" className="block rounded-lg border p-4 transition-colors hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.title}</div>
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{c.level}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{c.provider} · {c.durationHours}h</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.why}</p>
              </a>
            ))}
          </div>
        </div>
      </>
    )}
  />
);

export const Settings = () => <ComingSoon title="Settings" description="Profile, integrations, preferences." />;
