import { ImageResponse } from "next/og";
import { virksomhed } from "@/content/virksomhed";

export const runtime = "edge";
export const alt = "MT Vagt — autoriseret vagtselskab i trekantsområdet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamisk OG-billede i brandets stil.
export default function OgBillede() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(120% 90% at 80% 10%, #16324a 0%, #0d1926 40%, #0b0f14 75%)",
          color: "#eef1f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#d42233",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9aa2ab",
            }}
          >
            Autoriseret vagtselskab · Fredericia
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02 }}>
            Tryghed hele døgnet
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02 }}>
            i <span style={{ color: "#d42233" }}>trekantsområdet</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 30,
            color: "#c9d0d6",
          }}
        >
          <div style={{ fontWeight: 700 }}>
            MT<span style={{ color: "#d42233" }}>vagt</span>
          </div>
          <div>{virksomhed.telefon.visning}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
