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

    // Section 5: Pricing Overview
    pricingOverview: {
      headline: 'Transparent Pricing',
      subheadline: 'No hidden fees. Setup + monthly. Cancel anytime.',
      promoMessage: 'Launch promo — 50% off setup, limited time!',
      tiers: [
        {
          name: 'Starter',
          description: 'For teams starting with AI automation.',
          setupPrice: '£1,500',
          originalSetupPrice: '£3,000',
          monthlyPrice: '£150/mo',
          features: [
            'AI chatbot answering inquiries 24/7',
            'Automatic lead capture from forms',
            'Lead scoring and qualification',
            'CRM sync (HubSpot, Pipedrive, etc.)',
            'Email support within 24 hours',
          ],
          cta: 'Get Started',
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'Full pipeline automation with voice AI.',
          setupPrice: '£2,500',
          originalSetupPrice: '£5,000',
          monthlyPrice: '£250/mo',
          features: [
            'Everything in Starter',
            'AI phone calls — qualification in under 60 seconds',
            'Automated proposal generation (PDF)',
            'Dedicated AI agent for your business',
            'Priority support — response within 4 hours',
            'Slack/Teams notifications',
          ],
          cta: 'Book Audit',
          highlighted: true,
          badge: '50% off setup',
        },
        {
          name: 'Enterprise',
          description: 'Custom AI architecture for complex workflows.',
          setupPrice: 'Custom',
          monthlyPrice: 'Custom',
          features: [
            'Everything in Pro',
            'Automatic contract generation',
            'Custom integrations with your systems',
            'Dedicated account manager',
            'Round-the-clock support — response within 2 hours',
            'Installation on your servers (full data control)',
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

    // Section 5: Pricing Overview
    pricingOverview: {
      headline: 'Przejrzyste ceny',
      subheadline: 'Bez ukrytych opłat. Setup + abonament. Rezygnacja w każdej chwili.',
      promoMessage: 'Promocja startowa — 50% taniej na setup!',
      tiers: [
        {
          name: 'Starter',
          description: 'Dla zespołów rozpoczynających automatyzację AI.',
          setupPrice: '1 500 zł',
          originalSetupPrice: '3 000 zł',
          monthlyPrice: '600 zł/mies.',
          features: [
            'Chatbot AI odpowiadający na zapytania 24/7',
            'Automatyczne pozyskiwanie leadów z formularzy',
            'Scoring i kwalifikacja leadów',
            'Synchronizacja z CRM (HubSpot, Pipedrive, itp.)',
            'Wsparcie mailowe w ciągu 24 godzin',
          ],
          cta: 'Zacznij',
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'Pełna automatyzacja lejka z głosowym AI.',
          setupPrice: '3 000 zł',
          originalSetupPrice: '6 000 zł',
          monthlyPrice: '1 000 zł/mies.',
          features: [
            'Wszystko ze Starter',
            'Telefony AI — kwalifikacja w mniej niż 60 sekund',
            'Automatyczne generowanie ofert (PDF)',
            'Dedykowany agent AI dla Twojej firmy',
            'Priorytetowe wsparcie — odpowiedź w 4 godziny',
            'Powiadomienia Slack/Teams',
          ],
          cta: 'Umów audyt',
          highlighted: true,
          badge: '-50% na setup',
        },
        {
          name: 'Enterprise',
          description: 'Niestandardowa architektura AI dla złożonych procesów.',
          setupPrice: 'Indywidualnie',
          monthlyPrice: 'Indywidualnie',
          features: [
            'Wszystko z Pro',
            'Automatyczne generowanie umów',
            'Integracje z Twoimi systemami',
            'Dedykowany opiekun konta',
            'Wsparcie całodobowe — odpowiedź w 2 godziny',
            'Instalacja na Twoich serwerach (pełna kontrola danych)',
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
  },
} as const;

export type HomepageTranslations = typeof homepageTranslations;
