import dynamic from "next/dynamic";
import Hero from "@/components/marketing/Hero";

// Lazy load below-fold sections to improve LCP
const Founders = dynamic(() => import("@/components/marketing/Founders"), {
  ssr: true,
});
const Pricing = dynamic(() => import("@/components/marketing/Pricing"), {
  ssr: true,
});
const Architecture = dynamic(() => import("@/components/marketing/Architecture"), {
  ssr: true,
});
const Results = dynamic(() => import("@/components/marketing/Results"), {
  ssr: true,
});
const CTABanner = dynamic(() => import("@/components/marketing/CTABanner"), {
  ssr: true,
});
const ContactSection = dynamic(() => import("@/components/marketing/ContactSection"), {
  ssr: true,
});

export default function PLHomePage() {
  return (
    <>
      <Hero lang="pl" />
      <Results lang="pl" />        {/* Dowody */}
      <Pricing lang="pl" />        {/* Usługi */}
      <Architecture lang="pl" />   {/* Proces */}
      <Founders lang="pl" />       {/* O nas */}
      <CTABanner lang="pl" />      {/* CTA */}
      <ContactSection lang="pl" /> {/* Kontakt */}
    </>
  );
}
