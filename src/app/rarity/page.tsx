import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { getUnits, RARITY_ORDER, getRarityColor, getRarityBgColor, formatValue } from "@/lib/units";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Skibi Defense Rarity Tiers Guide - All Unit Rarities Explained",
  description:
    "Complete guide to all Skibi Defense rarity tiers. Learn about Diamond, Godly, Cosmic, Exclusives, and more. Find unit counts and average values for each rarity.",
  keywords: [
    "Skibi Defense rarity",
    "Skibi Defense tiers",
    "Skibi Defense Diamond units",
    "Skibi Defense Godly units",
    "Skibi Defense Cosmic units",
    "Skibi Defense rarity guide",
  ],
  openGraph: {
    title: "Skibi Defense Rarity Tiers Guide",
    description: "Complete guide to all Skibi Defense rarity tiers with unit counts and values.",
    url: "https://skibidefense.com/rarity",
  },
  alternates: {
    canonical: "https://skibidefense.com/rarity",
  },
};

export default function RarityIndexPage() {
  const units = getUnits();

  // Calculate stats for each rarity
  const rarityStats = RARITY_ORDER.map((rarity) => {
    const rarityUnits = units.filter((u) => u.rarity === rarity);
    if (rarityUnits.length === 0) return null;

    const totalValue = rarityUnits.reduce((sum, u) => sum + u.value, 0);
    const avgValue = Math.round(totalValue / rarityUnits.length);
    const maxValue = Math.max(...rarityUnits.map((u) => u.value));
    const highDemand = rarityUnits.filter((u) => u.demand === "High" || u.demand === "Very High").length;

    return {
      rarity,
      count: rarityUnits.length,
      avgValue,
      maxValue,
      highDemand,
      slug: rarity.toLowerCase(),
    };
  }).filter(Boolean);

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
            <span className="text-foreground">Rarities</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-500/10 via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-purple-400 border-purple-500">
            {rarityStats.length} Rarity Tiers
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Skibi Defense Rarity Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore all rarity tiers in Skibi Defense. Each tier has different unit availability,
            trading values, and demand levels.
          </p>
        </div>
      </section>

      {/* Rarity Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rarityStats.map((stat) => (
            <Link
              key={stat!.rarity}
              href={`/rarity/${stat!.slug}`}
              className="group"
            >
              <Card className={`h-full transition-all hover:scale-[1.02] hover:shadow-lg border-2 ${getRarityColor(stat!.rarity).split(" ")[1]}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${getRarityBgColor(stat!.rarity)}`}>
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className={`font-bold text-lg ${getRarityColor(stat!.rarity).split(" ")[0]}`}>
                        {stat!.rarity}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {stat!.count} units
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Avg Value</div>
                      <div className="font-mono text-yellow-400">
                        {formatValue(stat!.avgValue)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Max Value</div>
                      <div className="font-mono text-yellow-400">
                        {formatValue(stat!.maxValue)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">High Demand</div>
                      <div className="text-green-400">
                        {stat!.highDemand} units
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">% of Total</div>
                      <div className="text-foreground">
                        {((stat!.count / units.length) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      View all {stat!.rarity} units →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Understanding Skibi Defense Rarity System
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">How Rarity Affects Value</h3>
                <p>
                  In Skibi Defense, rarity directly impacts a unit&apos;s trading value. Higher rarity
                  units are harder to obtain and typically offer better stats, making them more
                  valuable in the trading market.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Trading Tips by Rarity</h3>
                <p>
                  When trading, always compare units within the same rarity tier first. Use our
                  trade calculator to ensure fair exchanges, especially when trading across
                  different rarity levels.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Event and Limited Rarities</h3>
                <p>
                  Some rarities like Event, Cursed, and Secret contain limited-time units.
                  These often appreciate in value after events end, making them good investments.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Demand vs Rarity</h3>
                <p>
                  High rarity doesn&apos;t always mean high demand. Check individual unit demand
                  scores to understand true market desirability before making trades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
