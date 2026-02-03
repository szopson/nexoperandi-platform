/**
 * Homepage section translations for the new 12-section homepage.
 * EN: Speed & scalability messaging (UK/US market)
 * PL: Cost savings & modernization messaging (Polish market)
 */

export const homepageTranslations = {
  en: {
    // Section 1: Hero
    hero: {
      headline: 'Turn Every Lead Into a Signed Contract',
      subheadline: 'AI-powered pipeline automation that qualifies, nurtures, and closes — while your team focuses on high-value deals.',
      ctaDemo: 'Watch 90s Demo',
      ctaAudit: 'Book Free Pipeline Audit',
      badges: {
        deployment: '3–7 day deployment',
        roi: 'ROI in 90 days',
        gdpr: 'GDPR compliant',
      },
    },

    // Section 2: Problem
    problem: {
      headline: 'Your Pipeline Is Leaking Revenue',
      stat: '67% of leads die due to slow response times.',
      statSource: 'Harvard Business Review',
      items: [
        {
          title: 'Slow Response Times',
          description: 'Leads go cold while your team scrambles to respond. Every hour of delay drops conversion by 10x.',
        },
        {
          title: 'Forgotten Follow-ups',
          description: 'Deals slip through the cracks. Manual tracking means missed opportunities and lost revenue.',
        },
        {
          title: 'Inconsistent Qualification',
          description: 'Sales reps waste time on bad leads. No systematic way to score and prioritize prospects.',
        },
        {
          title: 'Manual Proposal Creation',
          description: 'Hours spent writing proposals that could be automated. Slow turnaround kills deal momentum.',
        },
      ],
    },

    // Section 3: Solution
    solution: {
      headline: 'AI Lead-to-Contract Autopilot',
      subheadline: 'From first touch to signed contract — fully automated, fully auditable.',
      steps: [
        {
          title: 'Lead Captured',
          description: 'Form submission, chat, or inbound call detected instantly.',
        },
        {
          title: 'AI Calls in <60s',
          description: 'Voice AI qualifies the lead with natural conversation. Budget, timeline, and needs — confirmed.',
        },
        {
          title: 'Lead Qualified',
          description: 'AI scores the lead based on your criteria. Hot leads escalated immediately.',
        },
        {
          title: 'Proposal Generated',
          description: 'Custom PDF proposal created from templates with dynamic pricing and terms.',
        },
        {
          title: 'Contract Sent',
          description: 'Proposal delivered via email. Follow-up sequence triggered automatically.',
        },
        {
          title: 'Team Notified',
          description: 'CRM updated, Slack notified, dashboard refreshed. Full audit trail preserved.',
        },
      ],
    },

    // Section 4: Demo
    demo: {
      headline: 'Watch a Lead Turn Into a Proposal — Automatically',
      subheadline: 'Real workflow. Real AI. No scripts, no faking.',
      ctaWatch: 'Watch Full Demo',
      proofTiles: [
        {
          label: 'AI called in <60s',
          description: 'Voice AI initiates qualification call immediately after form submission.',
        },
        {
          label: 'Proposal PDF generated',
          description: 'Custom proposal created and emailed within minutes.',
        },
        {
          label: 'CRM + Slack updated',
          description: 'All systems notified with full conversation summary.',
        },
      ],
    },

    // Section 5: Solutions Cards
    solutionsCards: {
      headline: 'Three Products. One Goal.',
      subheadline: 'Choose what fits your business — or combine them.',
      cards: [
        {
          title: 'AI Sales Autopilot',
          subtitle: 'Lead-to-Contract',
          description: 'Automate your entire sales pipeline from lead capture to signed contract.',
          features: [
            'Voice AI qualification calls',
            'Automated proposal generation',
            'CRM integration & pipeline tracking',
            'Full audit trail & analytics',
          ],
          badge: 'Most Popular',
          cta: 'See How It Works',
        },
        {
          title: 'AI Voice & Booking Concierge',
          subtitle: 'For Clinics & Service Businesses',
          description: 'AI receptionist that answers calls, books appointments, and handles inquiries 24/7.',
          features: [
            '24/7 phone answering',
            'Appointment scheduling',
            'Multi-language support',
            'Patient/client intake automation',
          ],
          badge: '',
          cta: 'Learn More',
        },
        {
          title: 'AI Content Engine',
          subtitle: 'Marketing Automation',
          description: 'Consistent, on-brand content across all channels — automated from your knowledge base.',
          features: [
            'LinkedIn, X, Instagram posts',
            'Newsletter generation',
            'SEO blog autopilot',
            'Brand voice consistency',
          ],
          badge: '',
          cta: 'Learn More',
        },
      ],
    },

    // Section 6: How It Works
    howItWorks: {
      headline: 'From Zero to Autopilot in 6 Steps',
      steps: [
        {
          title: 'Discovery Call',
          description: 'We map your current sales process, tools, and bottlenecks.',
        },
        {
          title: 'Architecture Design',
          description: 'We design the automation workflow tailored to your stack.',
        },
        {
          title: 'Build & Configure',
          description: 'We build the AI agents, integrations, and dashboards.',
        },
        {
          title: 'Test & Validate',
          description: 'End-to-end testing with your real data and processes.',
        },
        {
          title: 'Deploy & Train',
          description: 'Go live with your team trained on the new system.',
        },
        {
          title: 'Optimize & Scale',
          description: 'Continuous improvement based on real performance data.',
        },
      ],
    },

    // Section 7: Why NexOperandi
    whyUs: {
      headline: 'Why Teams Choose NexOperandi',
      items: [
        {
          title: 'Real Integrations',
          description: 'We connect to your actual tools — CRM, email, Slack, calendars. Not just screenshots.',
        },
        {
          title: 'Measurable Outcomes',
          description: 'Clear KPIs defined upfront. Weekly reports. Full transparency.',
        },
        {
          title: 'Full Auditability',
          description: 'Every AI decision logged. Call transcripts, scoring rationale, full conversation history.',
        },
        {
          title: 'Built by Engineers',
          description: '15+ years in banking, fintech, and autonomous systems. Not a no-code agency.',
        },
      ],
    },

    // Section 8: Security
    security: {
      headline: 'Security & Compliance',
      subheadline: 'Your data, your rules.',
      items: [
        { title: 'GDPR Compliant', description: 'Full data processing agreements. Right to deletion. Consent management.' },
        { title: 'End-to-End Encryption', description: 'All data encrypted in transit and at rest. No plaintext storage.' },
        { title: 'Complete Audit Logs', description: 'Every AI action logged with timestamp, input, output, and decision rationale.' },
        { title: 'EU Data Residency', description: 'Data stored in EU data centers. No transatlantic transfers without consent.' },
        { title: 'Opt-Out Controls', description: 'Leads can opt out at any time. AI identifies and respects do-not-contact signals.' },
      ],
    },

    // Section 10: Pricing Overview
    pricingOverview: {
      headline: 'Transparent Pricing',
      subheadline: 'No hidden fees. Setup + monthly. Cancel anytime.',
      tiers: [
        {
          name: 'Starter',
          description: 'For teams starting with AI automation.',
          setupPrice: '£1,500',
          monthlyPrice: '£150/mo',
          features: [
            'Lead capture automation',
            'AI chat qualification',
            'Basic CRM sync',
            'Email support',
            'Basic dashboard',
          ],
          cta: 'Get Started',
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'Full pipeline automation with voice AI.',
          setupPrice: '£2,500',
          monthlyPrice: '£250/mo',
          features: [
            'Everything in Starter',
            'AI voice calls (VAPI)',
            'Automated proposals',
            'Advanced dashboard',
            'Priority support',
            'Slack notifications',
          ],
          cta: 'Book Audit',
          highlighted: true,
          badge: 'Recommended',
        },
        {
          name: 'Enterprise',
          description: 'Custom AI architecture for complex workflows.',
          setupPrice: 'Custom',
          monthlyPrice: 'Custom',
          features: [
            'Everything in Pro',
            'Contract automation',
            'Custom integrations',
            'Dedicated account manager',
            '24/7 support + SLA',
            'On-premise option',
          ],
          cta: 'Contact Us',
          highlighted: false,
        },
      ],
      addons: {
        headline: 'Add-ons',
        items: [
          { name: 'Multi-channel (WhatsApp, SMS)', price: '+£100/mo' },
          { name: 'AI Content Engine', price: '+£200/mo' },
          { name: 'Custom integrations', price: 'Quote-based' },
        ],
      },
      viewFull: 'View Full Pricing Comparison',
    },

    // Section 11: FAQ
    faq: {
      headline: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is this just a chatbot?',
          answer: 'No. Our AI Sales Autopilot makes voice calls, qualifies leads through natural conversation, generates proposals, updates your CRM, and notifies your team — all automatically. It is a complete pipeline automation system.',
        },
        {
          question: 'What happens if the AI makes a mistake?',
          answer: 'Every AI interaction is logged with full transcripts and decision rationale. You can set confidence thresholds — below that, the system flags for human review instead of acting autonomously.',
        },
        {
          question: 'How long does deployment take?',
          answer: 'Most implementations go live within 3–7 business days. Complex enterprise setups may take 2–3 weeks. We handle all integration, testing, and training.',
        },
        {
          question: 'Will this work with my existing CRM?',
          answer: 'Yes. We integrate with HubSpot, Salesforce, Pipedrive, Airtable, and most CRMs via API. If yours is not on the list, we will build the connector.',
        },
        {
          question: 'Is my data safe?',
          answer: 'Absolutely. GDPR compliant, EU data residency, end-to-end encryption, full audit logs. We sign DPAs and can accommodate specific compliance requirements.',
        },
        {
          question: 'Can I try it before committing?',
          answer: 'Yes. Book a free Pipeline Audit — we will analyze your current process, identify leak points, and show you a working demo with your use case. No obligation.',
        },
      ],
    },

    // Section 12: Final CTA
    finalCta: {
      headline: 'Want to See What Leaks in Your Pipeline?',
      subheadline: 'Choose your next step.',
      options: [
        {
          title: 'Watch Demo',
          description: 'See the full Lead-to-Contract Autopilot in action.',
          cta: 'Watch 90s Demo',
          href: '/demo',
        },
        {
          title: 'Book Pipeline Audit',
          description: 'Free 15-min analysis of your current sales process.',
          cta: 'Book Free Audit',
          href: '/pipeline-audit',
        },
        {
          title: 'Talk to Us',
          description: 'Have questions? Send us a message.',
          cta: 'Contact',
          href: '#contact',
        },
      ],
    },
  },

  pl: {
    // Section 1: Hero
    hero: {
      headline: 'Automatyzacja sprzedaży od leada do umowy',
      subheadline: 'AI kwalifikuje, prowadzi i zamyka — Twój zespół skupia się na strategicznych transakcjach.',
      ctaDemo: 'Zobacz demo (90s)',
      ctaAudit: 'Umów bezpłatny audyt',
      badges: {
        deployment: 'Wdrożenie w 3–7 dni',
        roi: 'ROI w 90 dni',
        gdpr: 'Zgodność z RODO',
      },
    },

    // Section 2: Problem
    problem: {
      headline: 'Twój lejek sprzedażowy traci przychody',
      stat: '67% leadów przepada przez zbyt wolną reakcję.',
      statSource: 'Harvard Business Review',
      items: [
        {
          title: 'Zbyt wolna reakcja',
          description: 'Leady stygną, gdy Twój zespół nie zdąży odpowiedzieć. Każda godzina opóźnienia obniża konwersję 10-krotnie.',
        },
        {
          title: 'Zapomniane follow-upy',
          description: 'Szanse sprzedażowe giną w chaosie. Ręczne śledzenie oznacza utracone przychody.',
        },
        {
          title: 'Brak spójnej kwalifikacji',
          description: 'Handlowcy tracą czas na słabe kontakty. Nie ma systemu do scoringu i priorytetyzacji.',
        },
        {
          title: 'Ręczne tworzenie ofert',
          description: 'Godziny spędzone na pisaniu ofert, które można zautomatyzować. Wolny czas reakcji zabija impet transakcji.',
        },
      ],
    },

    // Section 3: Solution
    solution: {
      headline: 'AI Autopilot: Od leada do umowy',
      subheadline: 'Od pierwszego kontaktu do podpisanej umowy — w pełni automatycznie, w pełni audytowalnie.',
      steps: [
        {
          title: 'Lead przechwycony',
          description: 'Formularz, czat lub połączenie przychodzące — wykryte natychmiast.',
        },
        {
          title: 'AI dzwoni w <60s',
          description: 'Głosowy AI kwalifikuje leada w naturalnej rozmowie. Budżet, termin i potrzeby — potwierdzone.',
        },
        {
          title: 'Lead zakwalifikowany',
          description: 'AI ocenia leada według Twoich kryteriów. Gorące kontakty eskalowane natychmiast.',
        },
        {
          title: 'Oferta wygenerowana',
          description: 'Spersonalizowana oferta PDF z dynamicznym cennikiem i warunkami.',
        },
        {
          title: 'Oferta wysłana',
          description: 'Oferta dostarczona mailem. Sekwencja follow-up uruchomiona automatycznie.',
        },
        {
          title: 'Zespół powiadomiony',
          description: 'CRM zaktualizowany, Slack powiadomiony, dashboard odświeżony. Pełna ścieżka audytu.',
        },
      ],
    },

    // Section 4: Demo
    demo: {
      headline: 'Zobacz jak lead zamienia się w ofertę — automatycznie',
      subheadline: 'Prawdziwy workflow. Prawdziwe AI. Bez skryptów, bez udawania.',
      ctaWatch: 'Obejrzyj pełne demo',
      proofTiles: [
        {
          label: 'AI zadzwonił w <60s',
          description: 'Głosowy AI rozpoczyna rozmowę kwalifikacyjną natychmiast po wypełnieniu formularza.',
        },
        {
          label: 'Oferta PDF wygenerowana',
          description: 'Spersonalizowana oferta stworzona i wysłana w ciągu minut.',
        },
        {
          label: 'CRM + Slack zaktualizowane',
          description: 'Wszystkie systemy powiadomione z pełnym podsumowaniem rozmowy.',
        },
      ],
    },

    // Section 5: Solutions Cards
    solutionsCards: {
      headline: 'Trzy produkty. Jeden cel.',
      subheadline: 'Wybierz co pasuje do Twojego biznesu — lub połącz je.',
      cards: [
        {
          title: 'AI Sales Autopilot',
          subtitle: 'Od leada do umowy',
          description: 'Zautomatyzuj cały lejek sprzedażowy od pozyskania leada do podpisanej umowy.',
          features: [
            'Głosowa kwalifikacja AI',
            'Automatyczne generowanie ofert',
            'Integracja z CRM i śledzenie pipeline',
            'Pełna ścieżka audytu i analityka',
          ],
          badge: 'Najpopularniejszy',
          cta: 'Zobacz jak działa',
        },
        {
          title: 'AI Voice & Booking Concierge',
          subtitle: 'Dla klinik i firm usługowych',
          description: 'Recepcjonista AI, który odbiera telefony, rezerwuje wizyty i obsługuje zapytania 24/7.',
          features: [
            'Odbieranie telefonów 24/7',
            'Rezerwacja wizyt',
            'Wsparcie wielojęzyczne',
            'Automatyzacja przyjęć pacjentów/klientów',
          ],
          badge: '',
          cta: 'Dowiedz się więcej',
        },
        {
          title: 'AI Content Engine',
          subtitle: 'Automatyzacja marketingu',
          description: 'Spójny, zgodny z marką content na wszystkich kanałach — automatycznie z Twojej bazy wiedzy.',
          features: [
            'Posty na LinkedIn, X, Instagram',
            'Generowanie newsletterów',
            'SEO Blog Autopilot',
            'Spójność tonu marki',
          ],
          badge: '',
          cta: 'Dowiedz się więcej',
        },
      ],
    },

    // Section 6: How It Works
    howItWorks: {
      headline: 'Od zera do autopilota w 6 krokach',
      steps: [
        {
          title: 'Rozmowa discovery',
          description: 'Mapujemy Twój obecny proces sprzedaży, narzędzia i wąskie gardła.',
        },
        {
          title: 'Projekt architektury',
          description: 'Projektujemy workflow automatyzacji dopasowany do Twojego stosu technologicznego.',
        },
        {
          title: 'Budowa i konfiguracja',
          description: 'Budujemy agentów AI, integracje i dashboardy.',
        },
        {
          title: 'Testy i walidacja',
          description: 'Kompleksowe testy z Twoimi prawdziwymi danymi i procesami.',
        },
        {
          title: 'Wdrożenie i szkolenie',
          description: 'Start produkcyjny z przeszkolonym zespołem.',
        },
        {
          title: 'Optymalizacja i skalowanie',
          description: 'Ciągłe doskonalenie na podstawie rzeczywistych danych wydajnościowych.',
        },
      ],
    },

    // Section 7: Why NexOperandi
    whyUs: {
      headline: 'Dlaczego zespoły wybierają NexOperandi',
      items: [
        {
          title: 'Prawdziwe integracje',
          description: 'Łączymy się z Twoimi prawdziwymi narzędziami — CRM, email, Slack, kalendarze. Nie tylko screenshoty.',
        },
        {
          title: 'Mierzalne rezultaty',
          description: 'Jasne KPI ustalone z góry. Cotygodniowe raporty. Pełna transparentność.',
        },
        {
          title: 'Pełna audytowalność',
          description: 'Każda decyzja AI zalogowana. Transkrypcje rozmów, uzasadnienia scoringu, pełna historia.',
        },
        {
          title: 'Zbudowane przez inżynierów',
          description: '15+ lat w bankowości, fintechu i systemach autonomicznych. Nie agencja no-code.',
        },
      ],
    },

    // Section 8: Security
    security: {
      headline: 'Bezpieczeństwo i zgodność',
      subheadline: 'Twoje dane, Twoje zasady.',
      items: [
        { title: 'Zgodność z RODO', description: 'Pełne umowy powierzenia danych. Prawo do usunięcia. Zarządzanie zgodami.' },
        { title: 'Szyfrowanie end-to-end', description: 'Wszystkie dane szyfrowane w transmisji i w spoczynku. Brak przechowywania w postaci jawnej.' },
        { title: 'Kompletne logi audytu', description: 'Każda akcja AI zalogowana ze znacznikiem czasu, danymi wejściowymi, wyjściowymi i uzasadnieniem decyzji.' },
        { title: 'Rezydencja danych w EU', description: 'Dane przechowywane w europejskich centrach danych. Brak transferów transatlantyckich bez zgody.' },
        { title: 'Kontrole opt-out', description: 'Leady mogą zrezygnować w każdej chwili. AI identyfikuje i respektuje sygnały do-not-contact.' },
      ],
    },

    // Section 10: Pricing Overview
    pricingOverview: {
      headline: 'Przejrzyste ceny',
      subheadline: 'Bez ukrytych opłat. Setup + abonament. Rezygnacja w każdej chwili.',
      tiers: [
        {
          name: 'Starter',
          description: 'Dla zespołów rozpoczynających automatyzację AI.',
          setupPrice: '6 000 zł',
          monthlyPrice: '600 zł/mies.',
          features: [
            'Automatyzacja pozyskiwania leadów',
            'Kwalifikacja AI przez czat',
            'Podstawowa synchronizacja z CRM',
            'Wsparcie mailowe',
            'Podstawowy dashboard',
          ],
          cta: 'Zacznij',
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'Pełna automatyzacja pipeline z głosowym AI.',
          setupPrice: '10 000 zł',
          monthlyPrice: '1 000 zł/mies.',
          features: [
            'Wszystko ze Starter',
            'Głosowe rozmowy AI (VAPI)',
            'Automatyczne oferty',
            'Zaawansowany dashboard',
            'Priorytetowe wsparcie',
            'Powiadomienia Slack',
          ],
          cta: 'Umów audyt',
          highlighted: true,
          badge: 'Rekomendowany',
        },
        {
          name: 'Enterprise',
          description: 'Niestandardowa architektura AI dla złożonych workflow.',
          setupPrice: 'Indywidualnie',
          monthlyPrice: 'Indywidualnie',
          features: [
            'Wszystko z Pro',
            'Automatyzacja umów',
            'Niestandardowe integracje',
            'Dedykowany opiekun konta',
            'Wsparcie 24/7 + SLA',
            'Opcja on-premise',
          ],
          cta: 'Skontaktuj się',
          highlighted: false,
        },
      ],
      addons: {
        headline: 'Dodatki',
        items: [
          { name: 'Multi-kanał (WhatsApp, SMS)', price: '+400 zł/mies.' },
          { name: 'AI Content Engine', price: '+800 zł/mies.' },
          { name: 'Niestandardowe integracje', price: 'Wycena indywidualna' },
        ],
      },
      viewFull: 'Zobacz pełne porównanie cen',
    },

    // Section 11: FAQ
    faq: {
      headline: 'Najczęściej zadawane pytania',
      items: [
        {
          question: 'Czy to jest po prostu chatbot?',
          answer: 'Nie. Nasz AI Sales Autopilot wykonuje połączenia głosowe, kwalifikuje leady w naturalnej rozmowie, generuje oferty, aktualizuje CRM i powiadamia zespół — wszystko automatycznie. To kompletny system automatyzacji lejka sprzedażowego.',
        },
        {
          question: 'Co się stanie, jeśli AI popełni błąd?',
          answer: 'Każda interakcja AI jest logowana z pełnymi transkrypcjami i uzasadnieniem decyzji. Możesz ustawić progi pewności — poniżej nich system oznacza do przeglądu przez człowieka zamiast działać autonomicznie.',
        },
        {
          question: 'Jak długo trwa wdrożenie?',
          answer: 'Większość wdrożeń uruchamiamy w 3–7 dni roboczych. Złożone konfiguracje enterprise mogą zająć 2–3 tygodnie. Zajmujemy się całą integracją, testowaniem i szkoleniem.',
        },
        {
          question: 'Czy to zadziała z moim CRM?',
          answer: 'Tak. Integrujemy się z HubSpot, Salesforce, Pipedrive, Airtable i większością CRM przez API. Jeśli Twojego nie ma na liście, zbudujemy konektor.',
        },
        {
          question: 'Czy moje dane są bezpieczne?',
          answer: 'Absolutnie. Zgodność z RODO, rezydencja danych w EU, szyfrowanie end-to-end, pełne logi audytu. Podpisujemy umowy powierzenia danych i dostosowujemy się do specyficznych wymagań compliance.',
        },
        {
          question: 'Czy mogę to wypróbować przed podjęciem decyzji?',
          answer: 'Tak. Umów bezpłatny Audyt Pipeline — przeanalizujemy Twój obecny proces, zidentyfikujemy punkty wycieku i pokażemy działające demo dla Twojego przypadku. Bez zobowiązań.',
        },
      ],
    },

    // Section 12: Final CTA
    finalCta: {
      headline: 'Chcesz zobaczyć, gdzie Twój pipeline traci pieniądze?',
      subheadline: 'Wybierz następny krok.',
      options: [
        {
          title: 'Obejrzyj demo',
          description: 'Zobacz pełny AI Lead-to-Contract Autopilot w akcji.',
          cta: 'Zobacz demo (90s)',
          href: '/pl/demo',
        },
        {
          title: 'Umów audyt pipeline',
          description: 'Bezpłatna 15-min analiza Twojego obecnego procesu sprzedaży.',
          cta: 'Umów bezpłatny audyt',
          href: '/pl/audyt-automatyzacji',
        },
        {
          title: 'Porozmawiaj z nami',
          description: 'Masz pytania? Napisz do nas.',
          cta: 'Kontakt',
          href: '/pl#contact',
        },
      ],
    },
  },
} as const;

export type HomepageTranslations = typeof homepageTranslations;
