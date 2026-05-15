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
            "linear-gradient(135deg, #0a0a0a 0%, #0b1733 60%, #1d4ed8 100%)",
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
          NexOperandi
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 1000,
            marginBottom: 28,
          }}
        >
          AI Automation Agency
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#cbd5e1",
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          n8n workflows, voice AI, chatbots. Deployed in 3–7 days. GDPR compliant.
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
