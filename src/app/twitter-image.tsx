import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Skibi Defense Value List";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              background: "linear-gradient(to right, #fbbf24, #f59e0b)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 20,
            }}
          >
            Skibi Defense
          </h1>
          <h2
            style={{
              fontSize: 48,
              color: "#ffffff",
              marginBottom: 30,
            }}
          >
            Value List & Trade Calculator
          </h2>
          <p
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            The most accurate unit prices in gems. Updated daily.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20, color: "#fbbf24" }}>
            skibidefense.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
