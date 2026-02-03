import { homepageTranslations } from "@/lib/homepage-translations";
import type { Lang } from "@/lib/translations";

interface HowItWorksProps {
  lang?: Lang;
}

export default function HowItWorks({ lang = "en" }: HowItWorksProps) {
  const t = homepageTranslations[lang].howItWorks;

  return (
    <section className="py-24 px-6" id="how-it-works">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.headline}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-blue-600/20 to-transparent" />

          <div className="space-y-8">
            {t.steps.map((step, index) => (
              <div key={index} className="relative flex items-start gap-6 md:gap-8">
                {/* Step number */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-black border border-blue-500/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-mono font-bold text-sm md:text-base">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 md:pt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
