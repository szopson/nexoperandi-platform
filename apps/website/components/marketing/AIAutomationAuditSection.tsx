"use client";

import Link from "next/link";
import { getTranslations, type Lang } from "@/lib/translations";

interface AIAutomationAuditSectionProps {
  lang?: Lang;
  className?: string;
}

export default function AIAutomationAuditSection({ lang = 'en', className = "" }: AIAutomationAuditSectionProps) {
  const t = getTranslations(lang);
  const audit = t.pricing?.auditSection;

  return (
    <div className={`mt-20 ${className}`}>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              {audit?.badge || 'Step 0 — Decide what\'s worth building'}
            </p>

            <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white">
              {audit?.title || 'AI Automation Audit'}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-slate-400">
              {audit?.description || 'For teams that know AI could help, but need a clear, implementation-ready plan: what to automate, how to build it, and what it will cost.'}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {(audit?.features || [
                'Process & workflow analysis',
                'Prioritized automation opportunities',
                'Technical architecture proposal',
                'Cost & ROI breakdown',
                'Implementation roadmap',
              ]).map((feature, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-slate-500">
              {audit?.freeCallLink || 'Prefer a quick discussion?'}{" "}
              <Link
                href={lang === 'pl' ? '/pl/contact?service=free-architecture-call' : '/contact?service=free-architecture-call'}
                className="text-slate-300 underline underline-offset-4 hover:text-white transition-colors"
              >
                {audit?.freeCallLinkText || 'Book a free architecture call'} →
              </Link>
            </p>
          </div>

          {/* Right Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {audit?.cardTitle || 'AI Automation Audit'}
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">
                    {lang === 'pl' ? '3690 zł' : '$1000'}
                  </span>
                  <span className="pb-1 text-sm text-slate-500">
                    {audit?.oneTime || 'one-time'}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300 whitespace-nowrap">
                {audit?.creditBadge || (lang === 'pl' ? '3690 zł zaliczane na wdrożenie' : '$1000 credited toward implementation')}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {audit?.cardDescription || 'You get a clear decision pack: what to build, what to skip, realistic costs, and a phased plan.'}
            </p>

            <div className="mt-6">
              <Link
                href={lang === 'pl' ? '/pl/contact?service=ai-audit' : '/contact?service=ai-audit'}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              >
                {audit?.cta || 'Start with an Audit'}
              </Link>
              <p className="mt-3 text-center text-xs text-slate-500">
                {audit?.typicalCost || (lang === 'pl' ? 'Typowe wdrożenia: 8 000–20 000 zł jednorazowo' : 'Typical implementations: $2,000–$5,000 one-time')}
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs font-medium text-slate-400">
                {audit?.deliverablesTitle || 'Deliverables'}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {audit?.deliverablesDescription || 'Report (PDF), opportunity backlog, architecture proposal, cost model, implementation roadmap, and a walkthrough call.'}
              </p>
            </div>

            {/* Decision helper */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500">
                <span className="text-slate-400 font-medium">{audit?.helperTitle || 'Which one should I choose?'}</span>
                <br />
                {audit?.helperPlan || '→ Want a plan + costs + report?'}{" "}
                <span className="text-slate-300">{audit?.helperPlanAnswer || 'AI Audit'}</span>
                <br />
                {audit?.helperDirection || '→ Want quick direction?'}{" "}
                <span className="text-slate-300">{audit?.helperDirectionAnswer || 'Free call'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
