"use client";

import { getTranslations, type Lang } from "@/lib/translations";

interface ArchitectureProps {
  lang?: Lang;
}

export default function Architecture({ lang = 'en' }: ArchitectureProps) {
  const t = getTranslations(lang);

  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 bg-[#020617] border-y border-slate-900/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Left: Explanation */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-medium text-sm tracking-wide uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {t.architecture?.badge || 'Programmable Intelligence'}
            </div>

            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.2]">
              {t.architecture?.title || 'We engineer the logic.'}{' '}
              <span className="text-slate-500">
                {t.architecture?.titleAccent || 'You reap the results.'}
              </span>
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed font-light">
              {t.architecture?.description || 'Our methodology involves deeply understanding your business logic and encoding it into sophisticated system prompts. We don\'t just "use AI"; we architect custom cognitive layers that sit on top of your existing stack.'}
            </p>

            <div className="space-y-6 pt-4">
              {/* Feature 1: Prompt Engineering */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">
                    {t.architecture?.features?.promptEngineering?.title || 'Prompt Engineering'}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.architecture?.features?.promptEngineering?.description || 'Advanced chain-of-thought prompting to ensure high-fidelity outputs and strict adherence to brand guidelines.'}
                  </p>
                </div>
              </div>

              {/* Feature 2: Modular Integration */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">
                    {t.architecture?.features?.modularIntegration?.title || 'Modular Integration'}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.architecture?.features?.modularIntegration?.description || 'Connects seamlessly with CRM, Database, and API endpoints without disrupting your current workflow.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: IDE / Prompt Editor Visualization - hidden on mobile/tablet */}
          <div className="relative group hidden lg:block">
            {/* Glow behind IDE */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-[#0F1117] rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              {/* IDE Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex gap-4 text-[11px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5 text-slate-300 bg-[#0F1117] px-3 py-1 rounded-t border-t border-l border-r border-slate-800 -mb-3.5 relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    </svg>
                    system_prompt.md
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <path d="M16.5 9.4 7.55 4.24" />
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.29 7 12 12 20.71 7" />
                      <line x1="12" y1="22" x2="12" y2="12" />
                    </svg>
                    agent_config.py
                  </div>
                </div>
                <div className="opacity-0 sm:opacity-100 text-[10px] text-slate-600 font-mono">
                  UTF-8
                </div>
              </div>

              {/* IDE Body */}
              <div className="p-6 font-mono text-xs md:text-sm leading-7 overflow-x-auto">
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">1</span>
                  <span className="syntax-keyword">### ROLE DEFINITION</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">2</span>
                  <span>You are <span className="syntax-string">&quot;NexAgent&quot;</span>, an autonomous specialist.</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">3</span>
                  <span>Your goal is to <span className="syntax-func">analyze_inbound_leads()</span> and score them.</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">4</span>
                  <span className="text-transparent">.</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">5</span>
                  <span className="syntax-keyword">### CONSTRAINTS</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">6</span>
                  <span>- Maintain a professional, empathetic tone.</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">7</span>
                  <span>- If Budget &lt; 5000: <span className="syntax-func">route_to_email_nurture()</span></span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">8</span>
                  <span>- If Budget &gt; 5000: <span className="syntax-func">schedule_meeting(priority=&quot;HIGH&quot;)</span></span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">9</span>
                  <span className="text-transparent">.</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">10</span>
                  <span className="syntax-keyword">### CONTEXT INJECTION</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">11</span>
                  <span className="syntax-comment">// Loading recent company case studies...</span>
                </div>
                <div className="flex">
                  <span className="w-8 text-slate-700 select-none text-right pr-3">12</span>
                  <span>Use knowledge_base <span className="typing-cursor" /></span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-[#161b22] py-1 px-3 flex justify-between items-center border-t border-slate-800">
                <div className="flex gap-3">
                  <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Connected
                  </span>
                  <span className="text-[10px] text-slate-500">Ln 12, Col 24</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">JavaScript / Python</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
