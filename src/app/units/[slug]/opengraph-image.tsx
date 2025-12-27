import { ImageResponse } from "next/og";
import { getUnitBySlug, formatValue } from "@/lib/units";

export const runtime = "edge";

export const alt = "Skibi Defense Unit Value";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);

  if (!unit) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            fontSize: 48,
          }}
        >
          Unit Not Found
        </div>
      ),
      { ...size }
    );
  }

  const rarityColors: Record<string, string> = {
    Common: "#9ca3af",
    Uncommon: "#22c55e",
    Rare: "#3b82f6",
    Epic: "#a855f7",
    Legendary: "#f59e0b",
    Mythic: "#ef4444",
    Secret: "#ec4899",
    Limited: "#06b6d4",
    Exclusive: "#8b5cf6",
    Event: "#f97316",
    Godly: "#fbbf24",
    Divine: "#ffffff",
    Celestial: "#c084fc",
    Unobtainable: "#6b7280",
    Premium: "#fcd34d",
    Exotic: "#f472b6",
    Titan: "#dc2626",
    Unique: "#14b8a6",
    Admin: "#ff0000",
  };

  const rarityColor = rarityColors[unit.rarity] || "#fbbf24";

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: rarityColor,
                padding: "8px 20px",
                border: `2px solid ${rarityColor}`,
                borderRadius: 8,
              }}
            >
              {unit.rarity}
            </span>
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {unit.name}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              marginBottom: 30,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: "bold",
                color: "#fbbf24",
              }}
            >
              {formatValue(unit.value)}
            </span>
            <span style={{ fontSize: 36, color: "#a1a1aa" }}>Gems</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 40,
              fontSize: 24,
              color: "#a1a1aa",
            }}
          >
            <span>Demand: {unit.demand}</span>
            <span>Trend: {unit.trend}</span>
          </div>
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
          <span style={{ fontSize: 20, color: "#71717a" }}>
            Skibi Defense Value List
          </span>
          <span style={{ fontSize: 20, color: "#3f3f46" }}>•</span>
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
