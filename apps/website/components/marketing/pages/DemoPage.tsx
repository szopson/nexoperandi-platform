"use client";

import { useState, useCallback } from "react";
import { pagesTranslations } from "@/lib/pages-translations";
import { useModal } from "@/context/ModalContext";
import type { Lang } from "@/lib/translations";

const YOUTUBE_ID = "vHOyG3RncXk";

interface DemoPageProps {
  lang?: Lang;
}

export default function DemoPage({ lang = "en" }: DemoPageProps) {
  const t = pagesTranslations[lang].demo;
  const { openDemoVideo } = useModal();
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});

  const handleLoadVideo = useCallback((index: number) => {
    setLoadedVideos((prev) => ({ ...prev, [index]: true }));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Video Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            {t.subtitle}
          </p>

          {/* Main Video */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
              {t.heroVideo.title}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6">
              {t.heroVideo.description}
            </p>

            {/* YouTube Facade */}
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group border border-white/10"
              onClick={openDemoVideo}
            >
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                alt={t.heroVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Tiles */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            {t.proof.title}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.proof.items.map((item, i) => (
              <div
                key={i}
                className="bg-gray-900/50 border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="text-green-500 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-semibold text-white text-sm">
                    {item.label}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Workflows */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.workflows.title}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              {t.workflows.subtitle}
            </p>
          </div>

          <div className="space-y-8">
            {t.workflows.items.map((item, i) => (
              <div
                key={i}
                className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <a
            href={lang === "pl" ? "/pl/audyt-automatyzacji" : "/pipeline-audit"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            {t.cta.button}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
