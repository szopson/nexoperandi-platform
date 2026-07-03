import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { generatePageMetadata } from "@/lib/metadata";
import { buildServiceSchema } from "@/lib/jsonld";
import PipelineAuditPage from "@/components/marketing/pages/PipelineAuditPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Free Pipeline Audit",
  description: "Get a free analysis of your sales pipeline. We'll identify leak points, score automation opportunities, and provide a custom action plan.",
  path: "/pipeline-audit",
  lang: "en",
  keywords: ["pipeline audit", "sales audit", "automation assessment", "free audit", "lead-to-contract analysis"],
});

const serviceSchema = buildServiceSchema({
  name: "Free Pipeline Audit",
  description: "Free analysis of your sales pipeline: leak points, automation opportunities, and a custom action plan.",
  path: "/pipeline-audit",
  serviceType: "Sales Pipeline Audit",
});

export default function PipelineAuditRoute() {
  return (
    <>
      <JsonLd id="pipeline-audit-jsonld" data={serviceSchema} />
      <PipelineAuditPage lang="en" />
    </>
  );
}
