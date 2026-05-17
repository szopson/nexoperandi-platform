import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/translations";

interface AboutPageProps {
  lang: Lang;
}

const copy = {
  en: {
    eyebrow: "About NexOperandi",
    h1: "Built by engineers. Driven by real-world experience.",
    lede:
      "NexOperandi is an AI automation agency based in Poland, serving EU, UK, and US clients. We build n8n workflow automation, voice AI agents, chatbots, and high-converting websites — deployed in 3–7 days. Founded in 2024 by a husband-and-wife engineering team with 15+ years of combined experience in banking, fintech, crypto infrastructure, and autonomous driving systems.",
    sectionsH2: {
      who: "Who we are",
      what: "What we build",
      how: "How we work",
      founder: "Founders",
      contact: "Talk to us",
    },
    who: [
      "Founded by a husband-and-wife engineering team, we bring over 15 years of combined experience delivering complex IT systems in demanding, real-world environments.",
      "Our work spans banking and financial platforms, cryptocurrency infrastructure, large-scale IT system integration, and software supporting autonomous driving systems — helping companies optimize processes, integrate systems, and improve operational efficiency and profitability.",
      "Today, AI is our long-term passion, combined with strong engineering discipline. We build reliable, scalable, and cost-efficient AI automation designed to grow with the business — not break under it.",
      "We work as a founder-led team, supported by a trusted network of experienced engineers and specialists, allowing us to scale expertise when projects demand it.",
    ],
    what: [
      { name: "AI Sales Autopilot", desc: "Qualifies leads, books appointments, and drafts proposals automatically — voice AI replies in under 60 seconds, updates your CRM, and notifies your team in Slack." },
      { name: "Voice AI Concierge", desc: "Handles inbound calls 24/7, transcribes conversations, escalates by your rules, and writes structured summaries to your dashboard." },
      { name: "AI Content Engine", desc: "Brand-consistent content across LinkedIn, X, newsletters, and SEO blog — published on your schedule, in your voice." },
      { name: "Web Design & E-commerce", desc: "Next.js sites, WooCommerce stores, clinic websites, and high-conversion landing pages — built to perform, not just to look good." },
      { name: "AI Automation Audit", desc: "Paid diagnostic: what to build, what to skip, and a phased implementation plan grounded in your actual pipeline and tooling." },
    ],
    how: [
      { title: "Engineering discipline", desc: "We treat AI like production software: version-controlled, monitored, observable, with clear SLAs and rollback paths. No magical demos that fall apart in week three." },
      { title: "Outcome-first scoping", desc: "We start with the business outcome — booked meetings, hours saved, leak points closed — and reverse-engineer the system. Tools are chosen last, not first." },
      { title: "Deploy in 3–7 days", desc: "Tight, focused builds. We optimize for time-to-first-value over scope creep. If something will take six weeks, we'll tell you and split it into shippable phases." },
      { title: "GDPR compliant by default", desc: "Data residency, consent flows, retention policies — handled. We work with EU-regulated industries, so this is table stakes, not an upsell." },
    ],
    founderBio:
      "Founded by a husband-and-wife engineering team, we bring 15+ years of combined experience delivering complex IT systems in demanding, real-world environments. Our work spans banking and financial platforms, cryptocurrency infrastructure, large-scale IT system integration, and software supporting autonomous driving — helping companies optimize processes, integrate systems, and improve operational efficiency and profitability. Today, AI is our long-term passion combined with strong engineering discipline: we build reliable, scalable, cost-efficient automation that grows with the business — not breaks under it.",
    cta: "Book a free pipeline audit",
    ctaSub: "30 minutes. We map your highest-leak processes and tell you which ones AI should automate first.",
    ctaHref: "/pipeline-audit",
    contactHref: "/contact",
  },
  pl: {
    eyebrow: "O NexOperandi",
    h1: "Zbudowane przez inżynierów. Napędzane doświadczeniem.",
    lede:
      "NexOperandi to agencja automatyzacji AI z siedzibą w Polsce, obsługująca klientów w UE, Wielkiej Brytanii i USA. Budujemy automatyzacje n8n, głosowych agentów AI, chatboty i wysokokonwertujące strony internetowe — wdrożenie 3–7 dni. Założona w 2024 przez zespół inżynierski (mąż i żona) z 15+ latami łącznego doświadczenia w bankowości, fintechu, infrastrukturze kryptowalut i systemach autonomicznej jazdy.",
    sectionsH2: {
      who: "Kim jesteśmy",
      what: "Co budujemy",
      how: "Jak pracujemy",
      founder: "Założyciele",
      contact: "Porozmawiajmy",
    },
    who: [
      "Założeni przez zespół inżynierski (mąż i żona), wnosimy ponad 15 lat łącznego doświadczenia w dostarczaniu złożonych systemów IT w wymagających środowiskach produkcyjnych.",
      "Nasze projekty obejmują platformy bankowe i finansowe, infrastrukturę kryptowalut, integracje systemów IT na dużą skalę i oprogramowanie wspierające autonomiczną jazdę — pomagamy firmom optymalizować procesy, integrować systemy i poprawiać efektywność operacyjną i rentowność.",
      "Dziś AI to nasza długoterminowa pasja, połączona z silną dyscypliną inżynierską. Budujemy niezawodne, skalowalne i opłacalne automatyzacje AI zaprojektowane tak, by rosły razem z biznesem — a nie pękały pod jego ciężarem.",
      "Pracujemy jako zespół prowadzony przez founderów, wspierany przez zaufaną sieć doświadczonych inżynierów i specjalistów, co pozwala nam skalować ekspertyzę gdy projekt tego wymaga.",
    ],
    what: [
      { name: "AI Sales Autopilot", desc: "Kwalifikuje leady, umawia spotkania i tworzy oferty automatycznie — głosowe AI dzwoni w mniej niż 60 sekund, aktualizuje CRM i powiadamia zespół w Slacku." },
      { name: "Voice AI Concierge", desc: "Odbiera połączenia 24/7, transkrybuje rozmowy, eskaluje według Twoich reguł i zapisuje strukturalne podsumowania w panelu." },
      { name: "AI Content Engine", desc: "Spójny brandowo content na LinkedIn, X, newslettery i bloga SEO — publikowany w Twoim harmonogramie, Twoim głosem." },
      { name: "Strony i e-commerce", desc: "Strony Next.js, sklepy WooCommerce, strony dla klinik i wysokokonwertujące landing page'e — budowane by działały, nie tylko ładnie wyglądały." },
      { name: "Audyt automatyzacji AI", desc: "Płatna diagnostyka: co zbudować, czego nie, plan wdrożenia w fazach — oparty na Twoim realnym pipeline i narzędziach." },
    ],
    how: [
      { title: "Dyscyplina inżynierska", desc: "Traktujemy AI jak oprogramowanie produkcyjne: kontrola wersji, monitoring, observability, jasne SLA i ścieżki rollbacku. Żadnych magicznych dem które rozpadną się w trzecim tygodniu." },
      { title: "Skoping od wyniku", desc: "Zaczynamy od wyniku biznesowego — umówione spotkania, zaoszczędzone godziny, zamknięte punkty wycieku — i odwracamy proces. Narzędzia wybieramy ostatnie, nie pierwsze." },
      { title: "Wdrożenie w 3–7 dni", desc: "Zwięzłe, skupione projekty. Optymalizujemy time-to-first-value zamiast scope creep. Jeśli coś zajmie sześć tygodni, powiemy to i podzielimy na wdrażalne fazy." },
      { title: "GDPR compliant z definicji", desc: "Rezydencja danych, zgody, retencja — załatwione. Pracujemy z branżami regulowanymi w UE, więc to standard, nie upsell." },
    ],
    founderBio:
      "Założone przez małżeński zespół inżynierów, wnosimy ponad 15 lat łącznego doświadczenia w dostarczaniu złożonych systemów IT w wymagających, rzeczywistych środowiskach. Nasza praca obejmuje platformy bankowe i finansowe, infrastrukturę kryptowalutową, integrację systemów IT na dużą skalę oraz oprogramowanie wspierające systemy jazdy autonomicznej — pomagając firmom optymalizować procesy, integrować systemy i poprawiać efektywność operacyjną oraz rentowność. Dziś AI to nasza długoterminowa pasja, połączona z silną dyscypliną inżynierską. Budujemy niezawodną, skalowalną i kosztowo efektywną automatyzację AI zaprojektowaną tak, by rosła razem z biznesem — nie łamała się pod jego ciężarem.",
    cta: "Zamów bezpłatny audyt pipeline",
    ctaSub: "30 minut. Mapujemy procesy z największym wyciekiem i mówimy które z nich AI powinno zautomatyzować jako pierwsze.",
    ctaHref: "/pl/audyt-automatyzacji",
    contactHref: "/pl/kontakt",
  },
} as const;

export default function AboutPage({ lang }: AboutPageProps) {
  const c = copy[lang];

  return (
    <main className="min-h-screen bg-black pt-24 pb-16 text-slate-300">
      <article className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <header className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-indigo-400 mb-4">
            {c.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            {c.h1}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {c.lede}
          </p>
        </header>

        {/* Founders image */}
        <div className="mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/founders.webp"
              alt={lang === "pl" ? "Założyciele NexOperandi" : "Founders of NexOperandi"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Who we are */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {c.sectionsH2.who}
          </h2>
          <div className="space-y-5 text-slate-300 text-base md:text-lg leading-[1.75]">
            {c.who.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* What we build */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {c.sectionsH2.what}
          </h2>
          <ul className="space-y-4">
            {c.what.map((item) => (
              <li
                key={item.name}
                className="p-5 rounded-xl bg-slate-900/50 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How we work */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {c.sectionsH2.how}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.how.map((p) => (
              <div
                key={p.title}
                className="p-5 rounded-xl bg-slate-900/50 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {c.sectionsH2.founder}
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-[1.75] mb-4">
            {c.founderBio}
          </p>
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <a
                href="https://www.linkedin.com/in/jakub-baranowski-42a01261/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://x.com/NexOperandi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                X / Twitter
              </a>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {c.sectionsH2.contact}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">{c.ctaSub}</p>
          <Link
            href={c.ctaHref}
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
          >
            {c.cta}
          </Link>
        </section>
      </article>
    </main>
  );
}
