import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { SITE_METADATA_BASE, SHARED_ROBOTS } from "@/lib/metadata";

// PL-specific title/description/openGraph/canonical live in ./pl/layout.tsx;
// this root only sets shared, language-agnostic metadata and the <html lang="pl"> shell.
export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
  authors: [{ name: "NexOperandi" }],
  creator: "NexOperandi",
  publisher: "NexOperandi",
  robots: SHARED_ROBOTS,
};

export default function PlRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell lang="pl">{children}</RootShell>;
}
