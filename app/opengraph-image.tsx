import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = `${site.name} — ${site.fullName}, IIT Delhi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1033",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 30%, rgba(155,127,212,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(245,166,35,0.15) 0%, transparent 45%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#f5a623",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#ffffff",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            {site.fullName}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.6)",
              marginTop: 24,
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 48,
              padding: "12px 32px",
              borderRadius: 4,
              border: "2px solid rgba(155,127,212,0.4)",
              color: "#9b7fd4",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            IIT Delhi
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
