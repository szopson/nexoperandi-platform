import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import AboutPage from "@/components/marketing/pages/AboutPage";

export const metadata: Metadata = generatePageMetadata({
  title: "O nas — NexOperandi",
  description:
    "NexOperandi to agencja automatyzacji AI z siedzibą w Polsce, obsługująca klientów w UE, Wielkiej Brytanii i USA. Założona w 2024 przez zespół inżynierski z 15+ latami doświadczenia w bankowości, fintechu, infrastrukturze kryptowalut i autonomicznej jeździe. Budujemy automatyzacje n8n, głosowe AI i wysokokonwertujące strony — wdrożenie 3–7 dni.",
  path: "/pl/o-nas",
  lang: "pl",
  keywords: [
    "O NexOperandi",
    "agencja automatyzacji AI",
    "agencja n8n Polska",
    "Jakub Baranowski",
    "automatyzacja AI dla biznesu",
  ],
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://nexoperandi.cloud/pl/o-nas#aboutpage",
  url: "https://nexoperandi.cloud/pl/o-nas",
  name: "O NexOperandi",
  description:
    "NexOperandi to agencja automatyzacji AI z Polski, obsługująca klientów w UE, UK i USA. Założona w 2024 przez zespół inżynierski z 15+ latami doświadczenia.",
  inLanguage: "pl",
  mainEntity: { "@id": "https://nexoperandi.cloud/#organization" },
  about: { "@id": "https://nexoperandi.cloud/#organization" },
  isPartOf: { "@id": "https://nexoperandi.cloud/#website" },
  breadcrumb: { "@id": "https://nexoperandi.cloud/pl/o-nas#breadcrumb" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://nexoperandi.cloud/pl/o-nas#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Strona główna",
      item: "https://nexoperandi.cloud/pl",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "O nas",
      item: "https://nexoperandi.cloud/pl/o-nas",
    },
  ],
};

export default function PLAboutRoute() {
  return (
    <>
      <JsonLd id="pl-about-jsonld" data={aboutPageSchema} />
      <JsonLd id="pl-about-breadcrumb-jsonld" data={breadcrumbSchema} />
      <AboutPage lang="pl" />
    </>
  );
}
