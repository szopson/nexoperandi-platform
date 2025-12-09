"use client";

import Image from "next/image";
import { getTranslations, type Lang } from "@/lib/translations";

interface DigitalBrainProps {
  lang?: Lang;
}

export default function DigitalBrain({ lang = 'en' }: DigitalBrainProps) {
  const t = getTranslations(lang);

  return (
    <div className="flex lg:justify-end order-1 lg:order-2 w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative items-center justify-center">
      {/* Central Focus Container */}
      <div className="flex w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] max-w-[500px] relative items-center justify-center">

        {/* Connecting Data Pipes (SVG) - hidden on very small screens */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pipe-grad" gradientUnits="userSpaceOnUse" x1="250" y1="250" x2="100" y2="100">
              <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Adjusted Paths for wider layout */}
          <path d="M250,250 L80,110" stroke="url(#pipe-grad)" strokeWidth="1" className="animate-radiate" style={{ animationDuration: '4s' }} />
          <path d="M250,250 L420,80" stroke="url(#pipe-grad)" strokeWidth="1" className="animate-radiate" style={{ animationDelay: '-1s', animationDuration: '5s' }} />
          <path d="M250,250 L440,320" stroke="url(#pipe-grad)" strokeWidth="1" className="animate-radiate" style={{ animationDelay: '-0.5s', animationDuration: '3s' }} />
          <path d="M250,250 L100,400" stroke="url(#pipe-grad)" strokeWidth="1" className="animate-radiate" style={{ animationDelay: '-2s', animationDuration: '4.5s' }} />
        </svg>

        {/* THE CORE: Digital Brain in Compact Frame */}
        <div className="relative z-30 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 brain-container rounded-3xl flex items-center justify-center group transform transition-transform duration-700 hover:scale-105 border border-cyan-500/20">

          {/* Glowing Corners */}
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 rounded-tl-xl border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 rounded-tr-xl border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 rounded-bl-xl border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 rounded-br-xl border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

          {/* Scan Line Animation Overlay */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl z-30 opacity-40 pointer-events-none">
            <div className="brain-scan-line" />
          </div>

          {/* Brain Visual */}
          <div className="relative w-[88%] h-[88%] rounded-2xl overflow-hidden bg-[#020617] flex items-center justify-center border border-white/5">
            <div className="absolute inset-0 mix-blend-overlay z-10 bg-cyan-900/30" />
            {/* Brain Image - optimized */}
            <Image
              src="/assets/brain.png"
              alt="Digital Brain"
              fill
              priority
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
              className="contrast-125 saturate-0 opacity-90 object-cover z-20"
            />
            <div className="z-30 opacity-20 mix-blend-overlay absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
          </div>

          {/* Label Integrated into Frame Bottom */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-[#020617] border border-cyan-500/30 px-2 sm:px-3 py-1 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[8px] sm:text-[10px] font-mono font-bold text-cyan-400 tracking-[0.1em] uppercase whitespace-nowrap">
                {t.hero.systemCore || 'System Core'}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Nodes - hidden on very small screens, scaled on small screens */}

        {/* Node 1: Input */}
        <div className="absolute top-[8%] left-[0%] sm:-left-[5%] animate-float-delayed z-20 hidden sm:block">
          <div className="glass-card flex gap-2 sm:gap-3 w-28 sm:w-36 md:w-40 rounded-xl p-2 sm:p-3 items-center border-l-2 border-l-blue-500">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 sm:w-4 sm:h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] text-blue-400 uppercase font-bold tracking-wider">
                {t.hero.nodes?.input || 'Input'}
              </span>
              <span className="text-[10px] sm:text-[12px] font-medium text-slate-200 truncate">
                {t.hero.nodes?.rawData || 'Raw Data'}
              </span>
            </div>
          </div>
        </div>

        {/* Node 2: Logic */}
        <div className="absolute top-[0%] right-[0%] sm:-right-[5%] animate-float z-20 hidden sm:block">
          <div className="glass-card p-2 sm:p-3 rounded-xl border-l-2 border-l-cyan-500 flex items-center gap-2 sm:gap-3 w-32 sm:w-40 md:w-44 shadow-lg shadow-cyan-900/20">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 animate-spin-slow sm:w-4 sm:h-4" style={{ animationDuration: '3s' }}>
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] text-cyan-400 uppercase font-bold tracking-wider">
                {t.hero.nodes?.logic || 'Logic'}
              </span>
              <span className="text-[10px] sm:text-[12px] font-medium text-slate-200 truncate">
                {t.hero.nodes?.aiAgent || 'AI Agent'}
              </span>
            </div>
          </div>
        </div>

        {/* Node 3: Execution */}
        <div className="animate-float-delayed absolute bottom-[15%] right-[0%] sm:-right-[8%] z-20 hidden sm:block">
          <div className="glass-card p-2 sm:p-3 rounded-xl border-l-2 border-l-indigo-500 flex items-center gap-2 sm:gap-3 w-28 sm:w-36 md:w-40">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 sm:w-4 sm:h-4">
                <path d="M5 12l5 5 9-9" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] text-indigo-400 uppercase font-bold tracking-wider">
                {t.hero.nodes?.output || 'Output'}
              </span>
              <span className="text-[10px] sm:text-[12px] font-medium text-slate-200 truncate">
                {t.hero.nodes?.execution || 'Execution'}
              </span>
            </div>
          </div>
        </div>

        {/* Node 4: Sync */}
        <div className="absolute bottom-[5%] left-[0%] sm:-left-[5%] animate-float z-20 hidden sm:block">
          <div className="glass-card p-2 sm:p-3 rounded-xl border-l-2 border-l-emerald-500 flex items-center gap-2 sm:gap-3 w-32 sm:w-40 md:w-44">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 sm:w-4 sm:h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] text-emerald-400 uppercase font-bold tracking-wider">
                {t.hero.nodes?.sync || 'Sync'}
              </span>
              <span className="text-[10px] sm:text-[12px] font-medium text-slate-200 truncate">
                {t.hero.nodes?.cloudDb || 'Cloud Db'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
