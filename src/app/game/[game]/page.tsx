import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Gamepad2 } from "lucide-react";
import { UnitList } from "@/components/unit-list";
import { getUnits, formatValue } from "@/lib/units";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type GameType = "skibi-defense" | "toilet-tower-defense";

const gameInfo: Record<GameType, { name: string; description: string; color: string }> = {
  "skibi-defense": {
    name: "Skibi Defense",
    description: "Skibi Defense is a popular Roblox tower defense game featuring unique units from the Skibidi universe. Collect and trade units to build the ultimate defense team.",
    color: "yellow",
  },
  "toilet-tower-defense": {
    name: "Toilet Tower Defense",
    description: "Toilet Tower Defense (TTD) is a Roblox tower defense game with units inspired by internet culture. Trade and collect powerful units to dominate the battlefield.",
    color: "blue",
  },
};

// Generate static pages for both games
export async function generateStaticParams() {
  return [
    { game: "skibi-defense" },
    { game: "toilet-tower-defense" },
  ];
}

interface GamePageProps {
  params: Promise<{ game: string }>;
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { game } = await params;

  if (!gameInfo[game as GameType]) {
    return {
      title: "Game Not Found - Value List",
    };
  }

  const info = gameInfo[game as GameType];
  const units = getUnits().filter((u) => u.game === game);

  return {
    title: `${info.name} Value List 2025 - All Unit Prices & Trading Values`,
    description: `Complete ${info.name} value list with ${units.length} units. Check accurate gem values, demand scores, and market trends for all ${info.name} units.`,
    keywords: [
      info.name,
      `${info.name} value list`,
      `${info.name} trading`,
      `${info.name} units`,
      `${info.name} prices`,
      "Roblox tower defense",
    ],
    openGraph: {
      title: `${info.name} Value List 2025`,
      description: `Browse all ${units.length} ${info.name} units with current trading values.`,
      url: `https://skibidefense.com/game/${game}`,
    },
    alternates: {
      canonical: `https://skibidefense.com/game/${game}`,
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { game } = await params;

  if (!gameInfo[game as GameType]) {
    notFound();
  }

  const info = gameInfo[game as GameType];
  const allUnits = getUnits();
  const units = allUnits.filter((u) => u.game === game);

  // Calculate stats
  const totalValue = units.reduce((sum, u) => sum + u.value, 0);
  const avgValue = units.length > 0 ? Math.round(totalValue / units.length) : 0;
  const highDemandCount = units.filter((u) => u.demand === "High" || u.demand === "Very High").length;

  // Get rarity distribution
  const rarityDistribution = units.reduce((acc, u) => {
    acc[u.rarity] = (acc[u.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topRarities = Object.entries(rarityDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{info.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`py-8 md:py-12 bg-gradient-to-b from-${info.color}-500/10 via-background to-background`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl bg-${info.color}-500/20`}>
                <Gamepad2 className={`h-8 w-8 text-${info.color}-400`} />
              </div>
              <Badge variant="outline" className={`text-${info.color}-400 border-${info.color}-500`}>
                {units.length} Units
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {info.name} Value List
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {info.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{units.length}</div>
                  <div className="text-xs text-muted-foreground">Total Units</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{formatValue(avgValue)}</div>
                  <div className="text-xs text-muted-foreground">Avg Value</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{highDemandCount}</div>
                  <div className="text-xs text-muted-foreground">High Demand</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{Object.keys(rarityDistribution).length}</div>
                  <div className="text-xs text-muted-foreground">Rarity Tiers</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Game Navigation */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4">
            <Link
              href="/game/skibi-defense"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                game === "skibi-defense"
                  ? "bg-yellow-500 text-black"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Skibi Defense ({allUnits.filter((u) => u.game === "skibi-defense").length})
            </Link>
            <Link
              href="/game/toilet-tower-defense"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                game === "toilet-tower-defense"
                  ? "bg-blue-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Toilet Tower Defense ({allUnits.filter((u) => u.game === "toilet-tower-defense").length})
            </Link>
          </div>
        </div>
      </section>

      {/* Top Rarities */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Top Rarities in {info.name}</h2>
        <div className="flex flex-wrap gap-2">
          {topRarities.map(([rarity, count]) => (
            <Link
              key={rarity}
              href={`/rarity/${rarity.toLowerCase()}`}
              className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
            >
              {rarity} ({count})
            </Link>
          ))}
        </div>
      </section>

      {/* Unit List */}
      <section className="container mx-auto px-4 py-8">
        <UnitList units={units} />
      </section>

      {/* SEO Content */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">
              About {info.name}
            </h2>
            <div className="text-muted-foreground space-y-3 text-sm">
              <p>
                {info.name} is one of the most popular tower defense games on Roblox,
                featuring a unique unit collection and trading system. Our value list
                helps players understand the true worth of their units.
              </p>
              <p>
                With {units.length} units across {Object.keys(rarityDistribution).length} rarity tiers,
                there&apos;s always something to collect and trade. Use our trade calculator
                to compare values and ensure fair exchanges.
              </p>
              <p>
                Check back daily for updated values as the market changes with new updates,
                events, and community trading patterns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
