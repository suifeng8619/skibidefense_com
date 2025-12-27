import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Gamepad2, TrendingUp, Star, Calculator, BookOpen, Gift, Shield, Swords, Users, Sparkles } from "lucide-react";
import { UnitList } from "@/components/unit-list";
import { UnitImage } from "@/components/unit-image";
import { getUnits, formatValue, getRarityColor } from "@/lib/units";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type GameType = "skibi-defense" | "toilet-tower-defense";

const gameInfo: Record<GameType, {
  name: string;
  shortName: string;
  description: string;
  heroGradient: string;
  iconBg: string;
  iconColor: string;
  badgeClass: string;
  features: { icon: React.ReactNode; title: string; description: string }[];
}> = {
  "skibi-defense": {
    name: "Skibi Defense",
    shortName: "Skibi Defense",
    description: "Skibi Defense is a popular Roblox tower defense game featuring unique units from the Skibidi universe. Collect and trade units to build the ultimate defense team.",
    heroGradient: "from-yellow-500/10 via-background to-background",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    badgeClass: "text-yellow-400 border-yellow-500",
    features: [
      { icon: <Swords className="h-5 w-5" />, title: "Epic Battles", description: "Face waves of enemies with strategic unit placement" },
      { icon: <Users className="h-5 w-5" />, title: "Unit Collection", description: "Collect unique units from the Skibidi universe" },
      { icon: <Shield className="h-5 w-5" />, title: "Defense Strategy", description: "Build the ultimate defense team" },
      { icon: <Sparkles className="h-5 w-5" />, title: "Trading System", description: "Trade units with other players" },
    ],
  },
  "toilet-tower-defense": {
    name: "Toilet Tower Defense",
    shortName: "TTD",
    description: "Toilet Tower Defense (TTD) is a Roblox tower defense game with units inspired by internet culture. Trade and collect powerful units to dominate the battlefield.",
    heroGradient: "from-blue-500/10 via-background to-background",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    badgeClass: "text-blue-400 border-blue-500",
    features: [
      { icon: <Swords className="h-5 w-5" />, title: "Intense Gameplay", description: "Challenge yourself with increasingly difficult waves" },
      { icon: <Users className="h-5 w-5" />, title: "Huge Roster", description: "Hundreds of unique units to collect" },
      { icon: <Shield className="h-5 w-5" />, title: "Team Synergy", description: "Combine units for powerful effects" },
      { icon: <Sparkles className="h-5 w-5" />, title: "Active Trading", description: "Vibrant player-to-player economy" },
    ],
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
    description: `Complete ${info.name} value list with ${units.length} units. Check accurate gem values, demand scores, and market trends for all ${info.name} units. Updated daily with current trading prices.`,
    keywords: [
      info.name,
      `${info.name} value list`,
      `${info.name} trading`,
      `${info.name} units`,
      `${info.name} prices`,
      `${info.name} trade calculator`,
      `${info.name} codes`,
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

  // Get top valued units
  const topUnits = [...units]
    .filter((u) => u.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Get trending units
  const trendingUnits = units
    .filter((u) => u.trend === "Rising" || u.trend === "Slowly Rising")
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  // Get high demand units
  const highDemandUnits = units
    .filter((u) => u.demand === "Very High" && u.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  // Get the other game for cross-linking
  const otherGame = game === "skibi-defense" ? "toilet-tower-defense" : "skibi-defense";
  const otherGameInfo = gameInfo[otherGame as GameType];

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
      <section className={`py-8 md:py-12 bg-gradient-to-b ${info.heroGradient}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${info.iconBg}`}>
                <Gamepad2 className={`h-8 w-8 ${info.iconColor}`} />
              </div>
              <Badge variant="outline" className={info.badgeClass}>
                {units.length} Units
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {info.name} Value List
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {info.description} Use our{" "}
              <Link href="/calculator" className="text-yellow-400 hover:underline">trade calculator</Link>{" "}
              to compare unit values before trading.
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
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-muted-foreground">Top Rarities in {info.name}</h2>
          <Link href="/rarity" className="text-xs text-muted-foreground hover:text-foreground">
            View all rarities →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {topRarities.map(([rarity, count]) => (
            <Link
              key={rarity}
              href={`/rarity/${rarity.toLowerCase()}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors hover:opacity-80 ${getRarityColor(rarity)}`}
            >
              {rarity} ({count})
            </Link>
          ))}
        </div>
      </section>

      {/* Top Valued Units */}
      {topUnits.length > 0 && (
        <section className="bg-card/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-bold text-foreground">Top {info.shortName} Units</h2>
              </div>
              <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground">
                Search all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {topUnits.map((unit) => (
                <Link key={unit.id} href={`/units/${unit.slug}`} className="group">
                  <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-3">
                      <div className="w-full aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                        <UnitImage
                          src={unit.image}
                          alt={unit.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xs font-medium text-foreground truncate">{unit.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-yellow-400 font-mono">{formatValue(unit.value)}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${getRarityColor(unit.rarity)}`}>
                          {unit.rarity}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending & High Demand */}
      {(trendingUnits.length > 0 || highDemandUnits.length > 0) && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Trending Units */}
              {trendingUnits.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <h2 className="text-lg font-bold text-foreground">Trending Up</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {trendingUnits.map((unit) => (
                      <Link key={unit.id} href={`/units/${unit.slug}`} className="group">
                        <Card className="transition-all hover:scale-[1.02]">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="w-12 h-12 relative bg-muted rounded-md overflow-hidden flex-shrink-0">
                              <UnitImage
                                src={unit.image}
                                alt={unit.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-medium text-foreground truncate">{unit.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-yellow-400">{formatValue(unit.value)}</span>
                                <span className="text-xs text-green-400">↑</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* High Demand Units */}
              {highDemandUnits.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="h-5 w-5 text-orange-400" />
                    <h2 className="text-lg font-bold text-foreground">High Demand</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {highDemandUnits.map((unit) => (
                      <Link key={unit.id} href={`/units/${unit.slug}`} className="group">
                        <Card className="transition-all hover:scale-[1.02]">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="w-12 h-12 relative bg-muted rounded-md overflow-hidden flex-shrink-0">
                              <UnitImage
                                src={unit.image}
                                alt={unit.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-medium text-foreground truncate">{unit.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-yellow-400">{formatValue(unit.value)}</span>
                                <Badge variant="outline" className="text-[10px] px-1 py-0 text-orange-400 border-orange-500">
                                  Hot
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Unit List */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <UnitList units={units} />
        </div>
      </section>

      {/* Game Features */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            {info.name} Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {info.features.map((feature, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex items-center justify-center p-3 ${info.iconBg} rounded-full mb-3`}>
                    <span className={info.iconColor}>{feature.icon}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Tools CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            {info.name} Trading Tools
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link href="/calculator" className="group">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-full mb-3">
                    <Calculator className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Trade Calculator</h3>
                  <p className="text-xs text-muted-foreground">
                    Compare {info.shortName} unit values
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/trading-guide" className="group">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full mb-3">
                    <BookOpen className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Trading Guide</h3>
                  <p className="text-xs text-muted-foreground">
                    Learn trading strategies
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/codes" className="group">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-full mb-3">
                    <Gift className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{info.shortName} Codes</h3>
                  <p className="text-xs text-muted-foreground">
                    Get free gems & rewards
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">
              About {info.name}
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm">
              <p>
                {info.name} is one of the most popular tower defense games on Roblox,
                featuring a unique unit collection and trading system. Our comprehensive{" "}
                <Link href="/" className="text-yellow-400 hover:underline">value list</Link>{" "}
                helps players understand the true worth of their units before engaging in trades.
              </p>
              <p>
                With {units.length} units across {Object.keys(rarityDistribution).length} rarity tiers,
                there&apos;s always something to collect and trade. Use our{" "}
                <Link href="/calculator" className="text-yellow-400 hover:underline">trade calculator</Link>{" "}
                to compare values and ensure fair exchanges. New to trading? Check out our{" "}
                <Link href="/trading-guide" className="text-yellow-400 hover:underline">trading guide</Link>{" "}
                to learn essential strategies and avoid common scams.
              </p>
              <p>
                Check back daily for updated values as the market changes with new updates,
                events, and community trading patterns. Don&apos;t forget to redeem our{" "}
                <Link href="/codes" className="text-yellow-400 hover:underline">active codes</Link>{" "}
                for free gems and exclusive rewards!
              </p>
              <p>
                Looking for specific units? Use our{" "}
                <Link href="/search" className="text-yellow-400 hover:underline">search feature</Link>{" "}
                to find any unit by name, rarity, or traits. You can also browse by{" "}
                <Link href="/rarity" className="text-yellow-400 hover:underline">rarity tier</Link>{" "}
                to discover all available units in each category.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Game Link */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              Also play {otherGameInfo.name}?
            </p>
            <Link
              href={`/game/${otherGame}`}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                otherGame === "skibi-defense"
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              <Gamepad2 className="h-5 w-5" />
              View {otherGameInfo.name} Values
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
