"use client";

import { useState } from "react";
import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";

interface DemoEmbedProps {
  lang?: Lang;
}

export default function DemoEmbed({ lang = "en" }: DemoEmbedProps) {
  const t = homepageTranslations[lang].demo;
  const [videoLoaded, setVideoLoaded] = useState(false);

  const youtubeId = t.youtubeId;

  return (
    <section className="py-24 px-6" id="demo">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.headline}
          </h2>
          <p className="text-slate-400 text-lg">
            {t.subheadline}
          </p>
        </div>

        {/* Video Embed - YouTube Facade Pattern */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50">
            {!videoLoaded ? (
              <button
                onClick={() => setVideoLoaded(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
                aria-label={t.ctaWatch}
              >
                {/* Thumbnail background */}
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                {/* Play button */}
                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={t.headline}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>

        {/* Proof Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {t.proofTiles.map((tile, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center hover:border-green-500/20 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-green-400 mb-1">{tile.label}</h3>
              <p className="text-xs text-slate-400">{tile.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
