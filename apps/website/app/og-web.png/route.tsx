import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0b1733 55%, #7c3aed 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#60a5fa",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          NexOperandi · Web & Stores
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 1000,
            marginBottom: 28,
          }}
        >
          Web Design & E-commerce Development
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#cbd5e1",
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          High-converting websites and online stores. Mobile-first, SEO-ready,
          measurable. From €2,500.
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
