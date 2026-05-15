import Script from "next/script";
import { homepageTranslations } from "@/lib/homepage-translations";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NexOperandi",
  url: "https://nexoperandi.cloud",
  logo: "https://nexoperandi.cloud/logo.webp",
  description:
    "AI automation agency. We build AI automation systems that qualify leads, book appointments, and close deals. n8n workflows, voice AI, chatbots, and web development.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    email: "hello@nexoperandi.cloud",
    availableLanguage: ["English", "Polish"],
    areaServed: ["EU", "PL", "UK", "US"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageTranslations.en.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomeJsonLd(): React.ReactElement {
  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(organizationJsonLd)}
      </Script>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(faqJsonLd)}
      </Script>
    </>
  );
}
