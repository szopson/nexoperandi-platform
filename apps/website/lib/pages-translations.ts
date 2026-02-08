/**
 * Translations for new pages: Demo, Solutions, Pricing, Pipeline Audit.
 * EN: Speed & scalability messaging (UK/US market)
 * PL: Cost savings & modernization messaging (Polish market)
 */

export const pagesTranslations = {
  en: {
    // Demo Page
    demo: {
      title: 'See It in Action',
      subtitle: 'Watch real AI automation workflows — no scripts, no faking.',
      heroVideo: {
        title: 'From Lead to Proposal in 3 Minutes',
        description: 'Watch our AI Sales Autopilot handle a real lead — from inbound form submission to voice qualification call to custom PDF proposal. Fully automated.',
      },
      proof: {
        title: 'What You Just Saw',
        items: [
          { label: 'AI called in <60 seconds', description: 'Voice AI initiated qualification call immediately after form submission.' },
          { label: 'Natural conversation', description: 'AI asked about budget, timeline, and needs — in a natural, professional tone.' },
          { label: 'Proposal generated', description: 'Custom PDF proposal created and emailed to the lead within minutes.' },
          { label: 'CRM updated', description: 'Lead scored, CRM updated, Slack notified — full audit trail preserved.' },
        ],
      },
      workflows: {
        title: 'More Workflows in Action',
        subtitle: 'Each demo shows a real, production-grade automation.',
        items: [
          {
            title: 'Lead Qualification via Voice AI',
            description: 'AI calls inbound leads within 60 seconds, qualifies them through natural conversation, and routes hot leads to your sales team.',
            tags: ['VAPI', 'n8n', 'CRM'],
          },
          {
            title: 'Automated Proposal Generation',
            description: 'Based on qualification data, AI generates custom PDF proposals with dynamic pricing, terms, and case studies.',
            tags: ['Claude AI', 'PDF', 'Email'],
          },
          {
            title: 'AI Booking Concierge',
            description: '24/7 AI receptionist that answers calls, books appointments, and handles inquiries for clinics and service businesses.',
            tags: ['VAPI', 'Calendar', 'SMS'],
          },
        ],
      },
      cta: {
        title: 'Want This for Your Business?',
        subtitle: 'Book a free pipeline audit — we\'ll show you exactly how this applies to your sales process.',
        button: 'Book Free Pipeline Audit',
      },
    },

    // Solutions Page
    solutions: {
      title: 'AI Automation Solutions',
      subtitle: 'Purpose-built AI systems that integrate with your existing tools and processes.',
      cards: [
        {
          title: 'AI Sales Autopilot',
          subtitle: 'Lead-to-Contract Automation',
          badge: 'Most Popular',
          description: 'Automate your entire sales pipeline from lead capture to signed contract. AI qualifies leads via voice calls, generates proposals, and keeps your team in the loop.',
          features: [
            { title: 'Voice AI Qualification', description: 'AI calls leads within 60 seconds, qualifies through natural conversation.' },
            { title: 'Automated Proposals', description: 'Custom PDF proposals generated from templates with dynamic pricing.' },
            { title: 'CRM Integration', description: 'Seamless sync with HubSpot, Salesforce, Pipedrive, and more.' },
            { title: 'Pipeline Analytics', description: 'Real-time dashboard with conversion rates, response times, and revenue tracking.' },
            { title: 'Follow-up Sequences', description: 'Automated email and call sequences to nurture leads through the funnel.' },
            { title: 'Full Audit Trail', description: 'Every AI decision logged with transcripts, scores, and rationale.' },
          ],
          useCases: ['B2B Sales Teams', 'Real Estate', 'Financial Services', 'SaaS Companies'],
          cta: 'Book Pipeline Audit',
          ctaHref: '/pipeline-audit',
        },
        {
          title: 'AI Voice & Booking Concierge',
          subtitle: 'For Clinics & Service Businesses',
          badge: '',
          description: 'AI receptionist that answers calls 24/7, books appointments, handles inquiries, and manages patient or client intake — in multiple languages.',
          features: [
            { title: '24/7 Call Answering', description: 'Never miss a call. AI handles inquiries even outside business hours.' },
            { title: 'Smart Scheduling', description: 'Books appointments directly into your calendar system.' },
            { title: 'Multi-Language Support', description: 'Handles calls in English, Polish, and other languages.' },
            { title: 'Intake Automation', description: 'Collects patient/client information before the appointment.' },
            { title: 'Call Summaries', description: 'Automatic transcription and summary of every call.' },
            { title: 'Escalation Rules', description: 'Routes urgent calls to staff immediately based on your rules.' },
          ],
          useCases: ['Medical Clinics', 'Dental Offices', 'Law Firms', 'Beauty Salons'],
          cta: 'Learn More',
          ctaHref: '/contact',
        },
        {
          title: 'AI Content Engine',
          subtitle: 'Marketing Automation',
          badge: '',
          description: 'Generate consistent, on-brand content across all channels — automatically from your knowledge base, past content, and brand guidelines.',
          features: [
            { title: 'Social Media Posts', description: 'LinkedIn, X, Instagram — on-brand posts generated and scheduled.' },
            { title: 'Newsletter Generation', description: 'Weekly or monthly newsletters from your content pipeline.' },
            { title: 'SEO Blog Autopilot', description: 'Research-backed blog posts optimized for search rankings.' },
            { title: 'Brand Voice Lock', description: 'AI trained on your brand guidelines ensures consistency.' },
            { title: 'Content Calendar', description: 'Automated scheduling across all channels.' },
            { title: 'Performance Analytics', description: 'Track engagement, reach, and conversion per channel.' },
          ],
          useCases: ['Startups', 'Marketing Agencies', 'E-commerce', 'Personal Brands'],
          cta: 'Learn More',
          ctaHref: '/contact',
        },
      ],
      faq: {
        title: 'Solution FAQs',
        items: [
          { question: 'Can I combine multiple solutions?', answer: 'Yes. All three products share the same infrastructure. Combining them gives you a unified dashboard and shared AI memory across your entire customer lifecycle.' },
          { question: 'Do I need technical staff to manage this?', answer: 'No. We handle setup, integration, and ongoing maintenance. Your team interacts through familiar tools like Slack, email, and your existing CRM.' },
          { question: 'How do you handle edge cases?', answer: 'Every workflow has configurable confidence thresholds. When AI is uncertain, it flags for human review. You set the rules for when AI acts autonomously vs. escalates.' },
        ],
      },
      cta: {
        title: 'Not Sure Which Solution Fits?',
        subtitle: 'Book a free pipeline audit. We\'ll map your current process and recommend the right setup.',
        button: 'Book Free Audit',
      },
    },

    // Pricing Page
    pricing: {
      title: 'Pricing',
      subtitle: 'Transparent pricing. Setup + monthly. No hidden fees. Cancel anytime.',
      promoMessage: 'Launch promo — 50% off setup, limited time!',
      tiers: [
        {
          name: 'Starter',
          description: 'For businesses starting their AI journey.',
          setupPrice: '€375',
          originalSetupPrice: '€750',
          savings: 'You save €375',
          monthlyPrice: '€150/mo',
          features: [
            { name: 'Automatic inquiry capture', included: true },
            { name: 'AI chatbot 24/7', included: true },
            { name: 'Connected to your CRM', included: true },
            { name: 'Email support', included: true },
            { name: 'Basic dashboard', included: true },
            { name: 'Voice AI assistant', included: false },
            { name: 'Automatic proposals', included: false },
            { name: 'Weekly reports', included: false },
            { name: 'Priority support', included: false },
            { name: 'Custom connections', included: false },
          ],
          cta: 'Get Started',
          ctaHref: '/contact?plan=starter',
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'Complete sales system with voice AI.',
          setupPrice: '€750',
          originalSetupPrice: '€1,500',
          savings: 'You save €750',
          monthlyPrice: '€250/mo',
          badge: '50% off setup',
          features: [
            { name: 'Automatic inquiry capture', included: true },
            { name: 'AI chatbot 24/7', included: true },
            { name: 'Connected to your CRM', included: true },
            { name: 'Email support', included: true },
            { name: 'Advanced dashboard', included: true },
            { name: 'Voice AI assistant', included: true },
            { name: 'Automatic proposals', included: true },
            { name: 'Weekly reports', included: true },
            { name: 'Priority support — 4h response', included: true },
            { name: 'Custom connections', included: false },
          ],
          cta: 'Book Audit',
          ctaHref: '/pipeline-audit',
          highlighted: true,
        },
        {
          name: 'Enterprise',
          description: 'Tailored solutions for complex needs.',
          setupPrice: 'Custom',
          monthlyPrice: 'Custom',
          features: [
            { name: 'Automatic inquiry capture', included: true },
            { name: 'AI chatbot 24/7', included: true },
            { name: 'Connected to your CRM', included: true },
            { name: 'Email support', included: true },
            { name: 'Advanced dashboard', included: true },
            { name: 'Voice AI assistant', included: true },
            { name: 'Automatic proposals', included: true },
            { name: 'Weekly reports', included: true },
            { name: '24/7 support — 2h response', included: true },
            { name: 'Custom connections', included: true },
          ],
          cta: 'Contact Us',
          ctaHref: '/contact',
          highlighted: false,
        },
      ],
      guarantee: {
        title: '',
        description: '',
      },
      faq: {
        title: 'Pricing FAQs',
        items: [
          { question: 'What does the setup fee cover?', answer: 'Architecture design, AI agent configuration, CRM integration, testing with your data, team training, and go-live support. It\'s a one-time investment.' },
          { question: 'Can I upgrade later?', answer: 'Yes. You can upgrade from Starter to Pro at any time. We\'ll handle the migration with zero downtime.' },
          { question: 'What if I need to cancel?', answer: 'Cancel anytime. No lock-in contracts. We\'ll export your data and provide a clean handoff.' },
          { question: 'Are there any hidden costs?', answer: 'No. The monthly fee covers all infrastructure, AI API costs, and standard support. Only custom development or high-volume usage may incur additional charges, discussed upfront.' },
        ],
      },
      cta: {
        title: 'Not Sure Which Plan Fits?',
        subtitle: 'Book a free audit. We\'ll recommend the right plan based on your pipeline.',
        button: 'Book Free Audit',
      },
    },

    // Pipeline Audit Page
    pipelineAudit: {
      title: 'Free Pipeline Audit',
      subtitle: 'We\'ll analyze your current sales process, identify leak points, and show you exactly where AI automation can drive results.',
      benefits: {
        title: 'What You Get',
        items: [
          { title: 'Process Mapping', description: 'We map your current lead-to-contract flow and identify bottlenecks.' },
          { title: 'Leak Point Analysis', description: 'Find exactly where leads drop off and revenue is lost.' },
          { title: 'AI Opportunity Score', description: 'We score each stage for automation potential and expected ROI.' },
          { title: 'Custom Recommendation', description: 'Actionable plan with specific tools, timelines, and expected outcomes.' },
        ],
      },
      form: {
        title: 'Request Your Free Audit',
        fields: {
          company: { label: 'Company Name', placeholder: 'Acme Corp' },
          industry: { label: 'Industry', placeholder: 'e.g. SaaS, Real Estate, Healthcare' },
          leadVolume: { label: 'Monthly Lead Volume', placeholder: 'e.g. 100-500' },
          challenge: { label: 'Biggest Pipeline Challenge', placeholder: 'Tell us about your main pain point...' },
          name: { label: 'Your Name', placeholder: 'John Smith' },
          email: { label: 'Work Email', placeholder: 'john@acme.com' },
          phone: { label: 'Phone (optional)', placeholder: '+44 20 1234 5678' },
        },
        submit: 'Request Free Audit',
        submitting: 'Submitting...',
        success: 'Thank you! We\'ll review your pipeline and get back to you within 24 hours.',
        error: 'Something went wrong. Please try again or email us directly.',
      },
      social: {
        title: 'Prefer to talk?',
        calendly: 'Book a 15-min call instead',
      },
    },
  },

  pl: {
    // Demo Page
    demo: {
      title: 'Zobacz w akcji',
      subtitle: 'Obejrzyj prawdziwe workflow automatyzacji AI — bez skryptów, bez udawania.',
      heroVideo: {
        title: 'Od leada do oferty w 3 minuty',
        description: 'Zobacz jak nasz AI Sales Autopilot obsługuje prawdziwego leada — od wypełnienia formularza, przez kwalifikację głosową, po spersonalizowaną ofertę PDF. W pełni automatycznie.',
      },
      proof: {
        title: 'Co właśnie zobaczyłeś',
        items: [
          { label: 'AI zadzwonił w <60 sekund', description: 'Głosowy AI rozpoczął rozmowę kwalifikacyjną natychmiast po wypełnieniu formularza.' },
          { label: 'Naturalna rozmowa', description: 'AI zapytał o budżet, termin i potrzeby — w naturalnym, profesjonalnym tonie.' },
          { label: 'Oferta wygenerowana', description: 'Spersonalizowana oferta PDF stworzona i wysłana do leada w ciągu minut.' },
          { label: 'CRM zaktualizowany', description: 'Lead oceniony, CRM zaktualizowany, Slack powiadomiony — pełna ścieżka audytu.' },
        ],
      },
      workflows: {
        title: 'Więcej workflow w akcji',
        subtitle: 'Każde demo pokazuje prawdziwą, produkcyjną automatyzację.',
        items: [
          {
            title: 'Kwalifikacja leadów przez głosowe AI',
            description: 'AI dzwoni do leadów przychodzących w ciągu 60 sekund, kwalifikuje ich w naturalnej rozmowie i przekazuje gorące kontakty do Twojego zespołu sprzedaży.',
            tags: ['VAPI', 'n8n', 'CRM'],
          },
          {
            title: 'Automatyczne generowanie ofert',
            description: 'Na podstawie danych kwalifikacyjnych AI generuje spersonalizowane oferty PDF z dynamicznym cennikiem, warunkami i case studies.',
            tags: ['Claude AI', 'PDF', 'Email'],
          },
          {
            title: 'AI Booking Concierge',
            description: 'Recepcjonista AI 24/7, który odbiera telefony, rezerwuje wizyty i obsługuje zapytania dla klinik i firm usługowych.',
            tags: ['VAPI', 'Kalendarz', 'SMS'],
          },
        ],
      },
      cta: {
        title: 'Chcesz to w swoim biznesie?',
        subtitle: 'Umów bezpłatny audyt pipeline — pokażemy Ci dokładnie, jak to się przekłada na Twój proces sprzedaży.',
        button: 'Umów bezpłatny audyt',
      },
    },

    // Solutions Page
    solutions: {
      title: 'Rozwiązania automatyzacji AI',
      subtitle: 'Systemy AI zaprojektowane pod Twoje narzędzia i procesy.',
      cards: [
        {
          title: 'AI Sales Autopilot',
          subtitle: 'Automatyzacja od leada do umowy',
          badge: 'Najpopularniejszy',
          description: 'Zautomatyzuj cały lejek sprzedażowy od pozyskania leada do podpisanej umowy. AI kwalifikuje leady przez rozmowy głosowe, generuje oferty i informuje Twój zespół.',
          features: [
            { title: 'Głosowa kwalifikacja AI', description: 'AI dzwoni do leadów w ciągu 60 sekund, kwalifikuje w naturalnej rozmowie.' },
            { title: 'Automatyczne oferty', description: 'Spersonalizowane oferty PDF z szablonów z dynamicznym cennikiem.' },
            { title: 'Integracja z CRM', description: 'Bezproblemowa synchronizacja z HubSpot, Salesforce, Pipedrive i innymi.' },
            { title: 'Analityka pipeline', description: 'Dashboard real-time z konwersjami, czasami reakcji i śledzeniem przychodów.' },
            { title: 'Sekwencje follow-up', description: 'Automatyczne sekwencje email i telefoniczne do prowadzenia leadów przez lejek.' },
            { title: 'Pełna ścieżka audytu', description: 'Każda decyzja AI zalogowana z transkrypcjami, scoringiem i uzasadnieniem.' },
          ],
          useCases: ['Zespoły sprzedaży B2B', 'Nieruchomości', 'Usługi finansowe', 'Firmy SaaS'],
          cta: 'Umów audyt pipeline',
          ctaHref: '/pl/audyt-automatyzacji',
        },
        {
          title: 'AI Voice & Booking Concierge',
          subtitle: 'Dla klinik i firm usługowych',
          badge: '',
          description: 'Recepcjonista AI, który odbiera telefony 24/7, rezerwuje wizyty, obsługuje zapytania i zarządza przyjęciami pacjentów lub klientów — w wielu językach.',
          features: [
            { title: 'Odbieranie telefonów 24/7', description: 'Nigdy nie przegap telefonu. AI obsługuje zapytania nawet poza godzinami pracy.' },
            { title: 'Inteligentne rezerwacje', description: 'Rezerwuje wizyty bezpośrednio w Twoim systemie kalendarzowym.' },
            { title: 'Wsparcie wielojęzyczne', description: 'Obsługuje rozmowy po polsku, angielsku i w innych językach.' },
            { title: 'Automatyzacja przyjęć', description: 'Zbiera dane pacjentów/klientów przed wizytą.' },
            { title: 'Podsumowania rozmów', description: 'Automatyczna transkrypcja i podsumowanie każdej rozmowy.' },
            { title: 'Reguły eskalacji', description: 'Przekierowuje pilne rozmowy do personelu natychmiast wg Twoich zasad.' },
          ],
          useCases: ['Kliniki medyczne', 'Gabinety stomatologiczne', 'Kancelarie prawne', 'Salony kosmetyczne'],
          cta: 'Dowiedz się więcej',
          ctaHref: '/pl/contact',
        },
        {
          title: 'AI Content Engine',
          subtitle: 'Automatyzacja marketingu',
          badge: '',
          description: 'Generuj spójny, zgodny z marką content na wszystkich kanałach — automatycznie z Twojej bazy wiedzy, dotychczasowych treści i wytycznych marki.',
          features: [
            { title: 'Posty w social media', description: 'LinkedIn, X, Instagram — posty zgodne z marką, generowane i planowane.' },
            { title: 'Generowanie newsletterów', description: 'Tygodniowe lub miesięczne newslettery z Twojego pipeline treści.' },
            { title: 'SEO Blog Autopilot', description: 'Artykuły oparte na researchu, zoptymalizowane pod pozycjonowanie.' },
            { title: 'Blokada tonu marki', description: 'AI trenowane na Twoich wytycznych marki zapewnia spójność.' },
            { title: 'Kalendarz treści', description: 'Automatyczne planowanie publikacji na wszystkich kanałach.' },
            { title: 'Analityka wyników', description: 'Śledź zaangażowanie, zasięg i konwersje per kanał.' },
          ],
          useCases: ['Startupy', 'Agencje marketingowe', 'E-commerce', 'Marki osobiste'],
          cta: 'Dowiedz się więcej',
          ctaHref: '/pl/contact',
        },
      ],
      faq: {
        title: 'FAQ rozwiązań',
        items: [
          { question: 'Czy mogę połączyć kilka rozwiązań?', answer: 'Tak. Wszystkie trzy produkty dzielą tę samą infrastrukturę. Połączenie daje Ci zunifikowany dashboard i wspólną pamięć AI w całym cyklu życia klienta.' },
          { question: 'Czy potrzebuję personelu technicznego?', answer: 'Nie. Zajmujemy się setupem, integracją i bieżącym utrzymaniem. Twój zespół korzysta ze znanych narzędzi jak Slack, email i Twój obecny CRM.' },
          { question: 'Jak obsługujecie edge case\'y?', answer: 'Każdy workflow ma konfigurowalne progi pewności. Gdy AI nie jest pewne, oznacza do przeglądu przez człowieka. Ty ustalasz zasady, kiedy AI działa autonomicznie, a kiedy eskaluje.' },
        ],
      },
      cta: {
        title: 'Nie wiesz, które rozwiązanie pasuje?',
        subtitle: 'Umów bezpłatny audyt pipeline. Zmapujemy Twój obecny proces i zaproponujemy odpowiedni setup.',
        button: 'Umów bezpłatny audyt',
      },
    },

    // Pricing Page
    pricing: {
      title: 'Cennik',
      subtitle: 'Przejrzyste ceny. Wdrożenie + abonament. Bez ukrytych opłat. Rezygnacja w każdej chwili.',
      promoMessage: 'Promocja startowa — 50% taniej na wdrożenie!',
      tiers: [
        {
          name: 'Starter',
          description: 'Dla firm zaczynających przygodę z AI.',
          setupPrice: '1 500 zł',
          originalSetupPrice: '3 000 zł',
          savings: 'Oszczędzasz 1 500 zł',
          monthlyPrice: '600 zł/mies.',
          features: [
            { name: 'Automatyczne zbieranie zapytań', included: true },
            { name: 'Chatbot AI 24/7', included: true },
            { name: 'Połączenie z Twoim CRM', included: true },
            { name: 'Wsparcie mailowe', included: true },
            { name: 'Podstawowy panel', included: true },
            { name: 'Asystent głosowy AI', included: false },
            { name: 'Automatyczne oferty', included: false },
            { name: 'Cotygodniowe raporty', included: false },
            { name: 'Wsparcie priorytetowe', included: false },
            { name: 'Własne połączenia', included: false },
          ],
          cta: 'Zacznij',
          ctaHref: '/pl/contact?plan=starter',
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'Kompletny system sprzedaży z głosowym AI.',
          setupPrice: '3 000 zł',
          originalSetupPrice: '6 000 zł',
          savings: 'Oszczędzasz 3 000 zł',
          monthlyPrice: '1 000 zł/mies.',
          badge: '-50% na wdrożenie',
          features: [
            { name: 'Automatyczne zbieranie zapytań', included: true },
            { name: 'Chatbot AI 24/7', included: true },
            { name: 'Połączenie z Twoim CRM', included: true },
            { name: 'Wsparcie mailowe', included: true },
            { name: 'Zaawansowany panel', included: true },
            { name: 'Asystent głosowy AI', included: true },
            { name: 'Automatyczne oferty', included: true },
            { name: 'Cotygodniowe raporty', included: true },
            { name: 'Wsparcie priorytetowe — odpowiedź w 4h', included: true },
            { name: 'Własne połączenia', included: false },
          ],
          cta: 'Umów audyt',
          ctaHref: '/pl/audyt-automatyzacji',
          highlighted: true,
        },
        {
          name: 'Enterprise',
          description: 'Rozwiązania indywidualne dla dużych potrzeb.',
          setupPrice: 'Indywidualnie',
          monthlyPrice: 'Indywidualnie',
          features: [
            { name: 'Automatyczne zbieranie zapytań', included: true },
            { name: 'Chatbot AI 24/7', included: true },
            { name: 'Połączenie z Twoim CRM', included: true },
            { name: 'Wsparcie mailowe', included: true },
            { name: 'Zaawansowany panel', included: true },
            { name: 'Asystent głosowy AI', included: true },
            { name: 'Automatyczne oferty', included: true },
            { name: 'Cotygodniowe raporty', included: true },
            { name: 'Wsparcie 24/7 — odpowiedź w 2h', included: true },
            { name: 'Własne połączenia', included: true },
          ],
          cta: 'Skontaktuj się',
          ctaHref: '/pl/contact',
          highlighted: false,
        },
      ],
      guarantee: {
        title: '',
        description: '',
      },
      faq: {
        title: 'FAQ cennika',
        items: [
          { question: 'Co obejmuje opłata za setup?', answer: 'Projekt architektury, konfiguracja agentów AI, integracja z CRM, testy na Twoich danych, szkolenie zespołu i wsparcie przy starcie. To jednorazowa inwestycja.' },
          { question: 'Czy mogę później zmienić plan?', answer: 'Tak. Możesz przejść ze Starter na Pro w każdej chwili. Zajmiemy się migracją bez przestojów.' },
          { question: 'Co jeśli chcę zrezygnować?', answer: 'Rezygnacja w dowolnym momencie. Bez umów lock-in. Wyeksportujemy Twoje dane i zapewnimy czysty handoff.' },
          { question: 'Czy są jakieś ukryte koszty?', answer: 'Nie. Abonament miesięczny pokrywa całą infrastrukturę, koszty API AI i standardowe wsparcie. Jedynie niestandardowe prace deweloperskie lub duże wolumeny mogą wiązać się z dodatkowymi opłatami, omówionymi z góry.' },
        ],
      },
      cta: {
        title: 'Nie wiesz, który plan pasuje?',
        subtitle: 'Umów bezpłatny audyt. Zaproponujemy odpowiedni plan na podstawie Twojego pipeline.',
        button: 'Umów bezpłatny audyt',
      },
    },

    // Pipeline Audit Page
    pipelineAudit: {
      title: 'Bezpłatny audyt pipeline',
      subtitle: 'Przeanalizujemy Twój obecny proces sprzedaży, zidentyfikujemy punkty wycieku i pokażemy dokładnie, gdzie automatyzacja AI może przynieść rezultaty.',
      benefits: {
        title: 'Co otrzymasz',
        items: [
          { title: 'Mapowanie procesu', description: 'Mapujemy Twój obecny flow lead-to-contract i identyfikujemy wąskie gardła.' },
          { title: 'Analiza punktów wycieku', description: 'Znajdziemy dokładnie, gdzie leady odpadają i gdzie tracisz przychody.' },
          { title: 'Scoring możliwości AI', description: 'Oceniamy każdy etap pod kątem potencjału automatyzacji i oczekiwanego ROI.' },
          { title: 'Spersonalizowana rekomendacja', description: 'Konkretny plan z narzędziami, harmonogramem i oczekiwanymi wynikami.' },
        ],
      },
      form: {
        title: 'Zamów bezpłatny audyt',
        fields: {
          company: { label: 'Nazwa firmy', placeholder: 'Firma sp. z o.o.' },
          industry: { label: 'Branża', placeholder: 'np. SaaS, Nieruchomości, Zdrowie' },
          leadVolume: { label: 'Miesięczny wolumen leadów', placeholder: 'np. 100-500' },
          challenge: { label: 'Największe wyzwanie pipeline', placeholder: 'Opowiedz nam o głównym punkcie bólu...' },
          name: { label: 'Twoje imię i nazwisko', placeholder: 'Jan Kowalski' },
          email: { label: 'Email służbowy', placeholder: 'jan@firma.pl' },
          phone: { label: 'Telefon (opcjonalnie)', placeholder: '+48 123 456 789' },
        },
        submit: 'Zamów bezpłatny audyt',
        submitting: 'Wysyłanie...',
        success: 'Dziękujemy! Przeanalizujemy Twój pipeline i skontaktujemy się w ciągu 24 godzin.',
        error: 'Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.',
      },
      social: {
        title: 'Wolisz porozmawiać?',
        calendly: 'Umów 15-min rozmowę zamiast tego',
      },
    },
  },
} as const;

export type PagesTranslations = typeof pagesTranslations;
