import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calculator, BookOpen, Gift, TrendingUp, Star } from "lucide-react";
import { UnitList } from "@/components/unit-list";
import { UnitImage } from "@/components/unit-image";
import { getUnits, RARITY_ORDER, getRarityColor, getRarityBgColor, formatValue } from "@/lib/units";
import { Rarity } from "@/types/unit";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Generate static pages for all rarities
export async function generateStaticParams() {
  const units = getUnits();
  const rarities = new Set<string>();
  units.forEach((unit) => rarities.add(unit.rarity.toLowerCase().replace(/\s+/g, "-")));

  return Array.from(rarities).map((rarity) => ({
    rarity,
  }));
}

// Map URL slug to actual rarity name
function getRarityFromSlug(slug: string): Rarity | null {
  const rarityMap: Record<string, Rarity> = {
    "diamond": "Diamond",
    "godly": "Godly",
    "cursed": "Cursed",
    "secret": "Secret",
    "event": "Event",
    "ultimates": "Ultimates",
    "celestials": "Celestials",
    "exclusives": "Exclusives",
    "mythic": "Mythic",
    "legendary": "Legendary",
    "epic": "Epic",
    "rare": "Rare",
    "uncommon": "Uncommon",
    "common": "Common",
    "grandmaster": "Grandmaster",
    "evolution": "Evolution",
    "cosmics": "Cosmics",
    "cosmic": "Cosmic",
    "astral": "ASTRAL",
    "divine": "Divine",
  };
  return rarityMap[slug.toLowerCase()] || null;
}

// SEO descriptions for each rarity
const rarityDescriptions: Record<string, string> = {
  "Diamond": "Diamond tier units are the rarest and most valuable in Skibi Defense. These premium units offer exceptional stats and unique abilities that dominate both gameplay and trading markets.",
  "Godly": "Godly units are high-tier powerhouses in Skibi Defense. Essential for competitive gameplay and highly sought after by traders, these units combine strong stats with consistent demand.",
  "Cursed": "Cursed units are limited Halloween event exclusives in Skibi Defense. Their dark abilities and extremely limited supply make them some of the most valuable collectibles in the game.",
  "Secret": "Secret units are hidden gems in Skibi Defense, obtained through special methods that most players never discover. Collectors prize these rare finds for their exclusivity.",
  "Event": "Event units are seasonal exclusives from Skibi Defense holiday events. Their value typically increases significantly after events end, making them excellent long-term investments.",
  "Ultimates": "Ultimate tier units represent peak power in Skibi Defense. These units dominate in both gameplay and trading, offering unmatched abilities and consistent high demand.",
  "Celestials": "Celestial units bring heavenly power to Skibi Defense. Their divine abilities and beautiful designs make them popular choices for both collectors and competitive players.",
  "Exclusives": "Exclusive units are the most coveted in Skibi Defense. Their extremely limited availability drives exceptional trading value, with some reaching millions in gem worth.",
  "Mythic": "Mythic units are powerful additions from Skibi Defense mythic crates. They offer a great balance of power and accessibility, making them an excellent starting point for traders.",
  "Legendary": "Legendary units are solid performers in Skibi Defense. They offer a good balance of value and availability, making them popular choices for active traders building portfolios.",
  "Epic": "Epic units offer reliable performance in Skibi Defense. They provide an affordable entry point for new players while still holding decent trading value.",
  "Rare": "Rare units are common finds in Skibi Defense but still useful for gameplay. They help complete collections and support early-game progress for new players.",
  "Uncommon": "Uncommon units are basic Skibi Defense units that are easy to obtain. While low in trading value, they serve as useful stepping stones for beginners.",
  "Common": "Common units are starter units in Skibi Defense. While minimal in trading value, they help new players learn game mechanics and begin their collection journey.",
  "Grandmaster": "Grandmaster units represent elite status in Skibi Defense. These prestigious units showcase dedication and skill, commanding respect in both gameplay and trading.",
  "Evolution": "Evolution units are upgraded forms in Skibi Defense. Their enhanced abilities make them significantly stronger than base versions, with values reflecting the upgrade investment.",
  "Cosmics": "Cosmic units harness universal power in Skibi Defense. Their stellar abilities and impressive visual effects make them top-tier choices for serious players.",
  "Cosmic": "Cosmic units channel the power of the cosmos in Skibi Defense. These high-value units offer impressive stats and strong demand in the trading market.",
  "ASTRAL": "Astral units are transcendent beings in Skibi Defense. Among the rarest and most powerful units available, they command astronomical values in trading.",
  "Divine": "Divine units are blessed with holy power in Skibi Defense. Their sacred abilities and limited availability make them highly desirable for collectors and traders alike.",
};

interface RarityPageProps {
  params: Promise<{ rarity: string }>;
}

export async function generateMetadata({ params }: RarityPageProps): Promise<Metadata> {
  const { rarity: raritySlug } = await params;
  const rarity = getRarityFromSlug(raritySlug);

  if (!rarity) {
    return {
      title: "Rarity Not Found - Skibi Defense Value List",
    };
  }

  const units = getUnits().filter((u) => u.rarity === rarity);
  const description = rarityDescriptions[rarity] || `Browse all ${rarity} units in Skibi Defense with current values and trading information.`;

  return {
    title: `${rarity} Units Value List - Skibi Defense ${rarity} Tier Prices 2025`,
    description: `${description} Find ${units.length} ${rarity} Skibi Defense units with accurate gem values, demand scores, and market trends. Updated daily.`,
    keywords: [
      `Skibi Defense ${rarity}`,
      `${rarity} units Skibi Defense`,
      `Skibi Defense ${rarity} value`,
      `${rarity} tier Skibi Defense`,
      `Skibi Defense ${rarity} prices`,
      "Skibi Defense value list",
      "Skibi Defense trading",
    ],
    openGraph: {
      title: `${rarity} Units - Skibi Defense Value List`,
      description: `Browse all ${units.length} ${rarity} units in Skibi Defense with current trading values.`,
      url: `https://skibidefense.com/rarity/${raritySlug}`,
    },
    alternates: {
      canonical: `https://skibidefense.com/rarity/${raritySlug}`,
    },
  };
}

export default async function RarityPage({ params }: RarityPageProps) {
  const { rarity: raritySlug } = await params;
  const rarity = getRarityFromSlug(raritySlug);

  if (!rarity) {
    notFound();
  }

  const allUnits = getUnits();
  const units = allUnits.filter((u) => u.rarity === rarity);
  const description = rarityDescriptions[rarity] || `Browse all ${rarity} units in Skibi Defense.`;

  // Calculate stats
  const totalValue = units.reduce((sum, u) => sum + u.value, 0);
  const avgValue = units.length > 0 ? Math.round(totalValue / units.length) : 0;
  const maxValue = units.length > 0 ? Math.max(...units.map((u) => u.value)) : 0;
  const highDemandCount = units.filter((u) => u.demand === "High" || u.demand === "Very High").length;

  // Get top units by value
  const topUnits = [...units].sort((a, b) => b.value - a.value).slice(0, 6);

  // Get trending units in this rarity
  const trendingUnits = units
    .filter((u) => u.trend === "Rising" || u.trend === "Slowly Rising")
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  // Get other rarities for navigation
  const availableRarities = Array.from(new Set(allUnits.map((u) => u.rarity)))
    .sort((a, b) => RARITY_ORDER.indexOf(a) - RARITY_ORDER.indexOf(b));

  // Get adjacent rarities for navigation
  const currentIndex = RARITY_ORDER.indexOf(rarity);
  const prevRarity = currentIndex > 0 ? availableRarities.find((r) => RARITY_ORDER.indexOf(r) < currentIndex) : null;
  const nextRarity = currentIndex < RARITY_ORDER.length - 1 ? availableRarities.find((r) => RARITY_ORDER.indexOf(r) > currentIndex) : null;

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
            <Link href="/rarity" className="hover:text-foreground transition-colors">
              Rarities
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{rarity}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`py-8 md:py-12 ${getRarityBgColor(rarity)} bg-opacity-20`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge variant="outline" className={`mb-4 ${getRarityColor(rarity)}`}>
              {units.length} Units
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {rarity} Units Value List
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl">
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-foreground">{units.length}</div>
                <div className="text-xs text-muted-foreground">Total Units</div>
              </div>
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-yellow-400">{formatValue(avgValue)}</div>
                <div className="text-xs text-muted-foreground">Avg Value</div>
              </div>
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-yellow-400">{formatValue(maxValue)}</div>
                <div className="text-xs text-muted-foreground">Max Value</div>
              </div>
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-green-400">{highDemandCount}</div>
                <div className="text-xs text-muted-foreground">High Demand</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rarity Navigation */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {availableRarities.map((r) => (
              <Link
                key={r}
                href={`/rarity/${r.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  r === rarity
                    ? getRarityBgColor(r) + " text-white"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Units in This Rarity */}
      {topUnits.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-foreground">Most Valuable {rarity} Units</h2>
            </div>
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
                    <div className="text-xs text-yellow-400 font-mono mt-1">{formatValue(unit.value)}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trending in This Rarity */}
      {trendingUnits.length > 0 && (
        <section className="bg-card/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <h2 className="text-lg font-bold text-foreground">Trending {rarity} Units</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingUnits.map((unit) => (
                <Link key={unit.id} href={`/units/${unit.slug}`} className="group">
                  <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
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
                          <span className="text-xs text-yellow-400 font-mono">{formatValue(unit.value)}</span>
                          <span className="text-xs text-green-400">↑ {unit.trend}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Unit List */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-foreground mb-4">All {rarity} Units</h2>
          <UnitList units={units} />
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">
              About {rarity} Units in Skibi Defense
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Trading {rarity} Units</h3>
                <p className="mb-4">
                  {rarity} units are an important tier in the Skibi Defense trading economy.
                  With {units.length} units in this tier, understanding their values helps you
                  make profitable trades and avoid potential scams.
                </p>
                <p>
                  The average value of {rarity} units is {formatValue(avgValue)} gems, with the most
                  valuable reaching {formatValue(maxValue)} gems. {highDemandCount} units in this tier
                  have high demand, making them easier to trade.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Market Trends</h3>
                <p className="mb-4">
                  Values shown are based on current market data and community trading patterns.
                  Prices fluctuate based on game updates, events, and overall demand.
                </p>
                <p>
                  Use our <Link href="/calculator" className="text-yellow-400 hover:underline">trade calculator</Link> to
                  compare {rarity} units with other rarities and ensure fair trades. Check
                  our <Link href="/trading-guide" className="text-yellow-400 hover:underline">trading guide</Link> for
                  strategies specific to this tier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Tools */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Trading Tools</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link href="/calculator">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Trade Calculator</h3>
                  <p className="text-xs text-muted-foreground">Compare {rarity} trades</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/trading-guide">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Trading Guide</h3>
                  <p className="text-xs text-muted-foreground">Learn trading strategies</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/codes">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <Gift className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Active Codes</h3>
                  <p className="text-xs text-muted-foreground">Get free gems</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="border-t border-border bg-card/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {prevRarity ? (
              <Link
                href={`/rarity/${prevRarity.toLowerCase()}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                <span>{prevRarity} Units</span>
              </Link>
            ) : (
              <div />
            )}
            <Link
              href="/rarity"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              All Rarities
            </Link>
            {nextRarity ? (
              <Link
                href={`/rarity/${nextRarity.toLowerCase()}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{nextRarity} Units</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
