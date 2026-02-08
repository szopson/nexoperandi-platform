import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import PipelineAuditPage from "@/components/marketing/pages/PipelineAuditPage";

export const metadata: Metadata = generatePageMetadata({
  title: "Free Pipeline Audit — NexOperandi",
  description: "Get a free analysis of your sales pipeline. We'll identify leak points, score automation opportunities, and provide a custom action plan.",
  path: "/pipeline-audit",
  lang: "en",
  keywords: ["pipeline audit", "sales audit", "automation assessment", "free audit", "lead-to-contract analysis"],
});

export default function PipelineAuditRoute() {
  return <PipelineAuditPage lang="en" />;
}
