import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { UnitList } from "@/components/unit-list";
import { UnitImage } from "@/components/unit-image";
import { getUnits, formatValue, getRarityColor } from "@/lib/units";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Calculator, Gift, Users, Star, Clock, Flame, Trophy, Sparkles, BookOpen, Search, Gamepad2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Skibi Defense Hub - Wiki, Calculator & Game Guides",
  description:
    "Your complete Skibi Defense resource hub. Explore our wiki, use the trade calculator, find working codes, and master the game with expert guides. Updated daily for Roblox players.",
  keywords: [
    "Skibi Defense",
    "Skibi Defense wiki",
    "Skibi Defense calculator",
    "Skibi Defense guide",
    "Skibi Defense codes",
    "Skibi Defense units",
    "Skibi Defense tools",
    "Roblox Skibi Defense",
  ],
  openGraph: {
    title: "Skibi Defense Hub - Wiki, Calculator & Game Guides",
    description:
      "Your complete Skibi Defense resource hub. Wiki, trade calculator, codes, and expert guides for Roblox players.",
    url: "https://skibidefense.com",
  },
  twitter: {
    title: "Skibi Defense Hub - Wiki, Calculator & Game Guides",
    description:
      "Your complete Skibi Defense resource hub. Wiki, trade calculator, codes, and expert guides for Roblox players.",
  },
  alternates: {
    canonical: "https://skibidefense.com",
  },
};

interface HomePageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search } = await searchParams;
  const units = getUnits();
  const currentYear = new Date().getFullYear();

  // Calculate stats from real data
  const skibiDefenseUnits = units.filter(u => u.game === "skibi-defense");
  const ttdUnits = units.filter(u => u.game === "toilet-tower-defense");
  const diamondUnits = units.filter(u => u.rarity === "Diamond");
  const godlyUnits = units.filter(u => u.rarity === "Godly");

  // Get trending units (Rising trend, sorted by value)
  const trendingUnits = units
    .filter(u => u.trend === "Rising" || u.trend === "Slowly Rising")
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Get most valuable units
  const topValueUnits = units
    .filter(u => u.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Get high demand units
  const highDemandUnits = units
    .filter(u => u.demand === "Very High" && u.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // FAQ Schema for rich snippets
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often is the Skibi Defense value list updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Skibi Defense value list is updated daily based on current trading data. Unit prices reflect the latest market trends."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use the Skibi Defense trade calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Add units to both sides of the calculator. It will show if the trade is fair, a win, or a loss for you."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Skibi Defense units valuable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unit value depends on rarity, demand, and availability. Limited event units and low-exist counts increase value."
        }
      },
      {
        "@type": "Question",
        "name": "Are Skibi Defense codes still working?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We maintain an updated list of working Skibi Defense codes. Check our codes page for active codes and free rewards."
        }
      }
    ]
  });

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {faqSchema}
      </Script>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-500/10 via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 text-yellow-400 border-yellow-500">
              Skibi Defense Updated Daily
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Skibi Defense Value List {currentYear}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              The most accurate and trusted Skibi Defense value list for Roblox players.
              Check current unit prices, compare trades with our Skibi Defense calculator,
              and never get scammed again.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mb-8">
              <Card className="bg-card/50 border-border">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400">{units.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Skibi Defense Units</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">{diamondUnits.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Skibi Defense Diamond</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400">{godlyUnits.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Skibi Defense Godly</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-400">Daily</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Skibi Defense Updates</div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
              >
                <Calculator className="h-5 w-5" />
                Skibi Defense Trade Calculator
              </Link>
              <Link
                href="/codes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card hover:bg-accent border border-border font-semibold rounded-lg transition-colors"
              >
                <Gift className="h-5 w-5" />
                Skibi Defense Codes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tools Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
            Skibi Defense Quick Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/calculator">
              <Card className="bg-card border-border hover:border-yellow-500/50 transition-colors h-full">
                <CardContent className="p-4 text-center">
                  <Calculator className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Skibi Defense Trade Calculator</h3>
                  <p className="text-xs text-muted-foreground mt-1">Check fair Skibi Defense trades</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/codes">
              <Card className="bg-card border-border hover:border-green-500/50 transition-colors h-full">
                <CardContent className="p-4 text-center">
                  <Gift className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Skibi Defense Codes</h3>
                  <p className="text-xs text-muted-foreground mt-1">Free Skibi Defense gems</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/search">
              <Card className="bg-card border-border hover:border-blue-500/50 transition-colors h-full">
                <CardContent className="p-4 text-center">
                  <Search className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Skibi Defense Unit Search</h3>
                  <p className="text-xs text-muted-foreground mt-1">Find any Skibi Defense unit</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/rarity">
              <Card className="bg-card border-border hover:border-purple-500/50 transition-colors h-full">
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Skibi Defense Rarity Guide</h3>
                  <p className="text-xs text-muted-foreground mt-1">Browse by Skibi Defense rarity</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Value Units Section */}
      <section className="bg-card/30 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Most Valuable Skibi Defense Units
                </h2>
              </div>
              <Link href="/search" className="text-yellow-400 hover:underline text-sm">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {topValueUnits.map((unit) => (
                <Link key={unit.id} href={`/units/${unit.slug}`}>
                  <Card className="bg-card border-border hover:border-yellow-500/50 transition-all hover:scale-[1.02]">
                    <CardContent className="p-3">
                      <div className="aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                        <UnitImage src={unit.image} alt={unit.name} fill className="object-cover" />
                      </div>
                      <h3 className="font-medium text-sm truncate">{unit.name}</h3>
                      <Badge variant="outline" className={`${getRarityColor(unit.rarity)} text-xs mt-1`}>
                        {unit.rarity}
                      </Badge>
                      <p className="text-yellow-400 font-mono text-sm mt-1">{formatValue(unit.value)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Units Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-orange-400" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Trending Skibi Defense Units
              </h2>
            </div>
            <Link href="/search" className="text-yellow-400 hover:underline text-sm">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {trendingUnits.map((unit) => (
              <Link key={unit.id} href={`/units/${unit.slug}`}>
                <Card className="bg-card border-border hover:border-orange-500/50 transition-all hover:scale-[1.02]">
                  <CardContent className="p-3">
                    <div className="aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                      <UnitImage src={unit.image} alt={unit.name} fill className="object-cover" />
                      <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> Rising
                      </div>
                    </div>
                    <h3 className="font-medium text-sm truncate">{unit.name}</h3>
                    <Badge variant="outline" className={`${getRarityColor(unit.rarity)} text-xs mt-1`}>
                      {unit.rarity}
                    </Badge>
                    <p className="text-yellow-400 font-mono text-sm mt-1">{formatValue(unit.value)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High Demand Units Section */}
      <section className="bg-card/30 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-pink-400" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  High Demand Skibi Defense Units
                </h2>
              </div>
              <Link href="/search" className="text-yellow-400 hover:underline text-sm">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {highDemandUnits.map((unit) => (
                <Link key={unit.id} href={`/units/${unit.slug}`}>
                  <Card className="bg-card border-border hover:border-pink-500/50 transition-all hover:scale-[1.02]">
                    <CardContent className="p-3">
                      <div className="aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                        <UnitImage src={unit.image} alt={unit.name} fill className="object-cover" />
                        <div className="absolute top-1 right-1 bg-pink-500 text-white text-xs px-1 rounded">
                          Hot
                        </div>
                      </div>
                      <h3 className="font-medium text-sm truncate">{unit.name}</h3>
                      <Badge variant="outline" className={`${getRarityColor(unit.rarity)} text-xs mt-1`}>
                        {unit.rarity}
                      </Badge>
                      <p className="text-yellow-400 font-mono text-sm mt-1">{formatValue(unit.value)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value List Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Skibi Defense Unit Values
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Complete Skibi Defense price list with demand and trend data
              </p>
            </div>
          </div>
          <UnitList units={units} initialSearch={search} />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8 md:mb-12">
            Why Use Our Skibi Defense Value List?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Skibi Defense Daily Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Skibi Defense values updated daily based on real Skibi Defense trading data
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full mb-4">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Skibi Defense Trend Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  See which Skibi Defense units are rising or dropping in value
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Skibi Defense Scam Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Avoid unfair Skibi Defense trades with accurate Skibi Defense price data
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-full mb-4">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Skibi Defense Community Data</h3>
                <p className="text-sm text-muted-foreground">
                  Values based on Skibi Defense community trading patterns
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rarity Guide Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
          Skibi Defense Rarity Tiers Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          <Link href="/rarity/diamond">
            <Card className="bg-cyan-500/10 border-cyan-500/30 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5 text-cyan-400" />
                  <span className="font-bold text-cyan-400">Diamond</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The rarest Skibi Defense units. Skibi Defense Diamond tier units like D UTCLM and D Gojo
                  are extremely valuable in Skibi Defense trading.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/rarity/godly">
            <Card className="bg-yellow-500/10 border-yellow-500/30 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-bold text-yellow-400">Godly</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  High-tier Skibi Defense units with strong Skibi Defense demand. Essential for competitive
                  Skibi Defense gameplay and valuable in trades.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/rarity/cursed">
            <Card className="bg-purple-900/20 border-purple-800/30 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5 text-purple-400" />
                  <span className="font-bold text-purple-400">Cursed</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Limited Skibi Defense event units from Halloween. Skibi Defense Cursed units have
                  unique dark abilities in Skibi Defense.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/rarity/secret">
            <Card className="bg-red-500/10 border-red-500/30 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5 text-red-400" />
                  <span className="font-bold text-red-400">Secret</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hidden Skibi Defense units obtained from special methods. Skibi Defense Secret units are highly sought
                  after by Skibi Defense collectors.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/rarity/event">
            <Card className="bg-pink-500/10 border-pink-500/30 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5 text-pink-400" />
                  <span className="font-bold text-pink-400">Event</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Seasonal Skibi Defense units from holiday events. These Skibi Defense Event units increase
                  in Skibi Defense value after events end.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/rarity/mythic">
            <Card className="bg-fuchsia-500/10 border-fuchsia-500/30 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5 text-fuchsia-400" />
                  <span className="font-bold text-fuchsia-400">Mythic</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Powerful Skibi Defense units from Skibi Defense mythic crates. Great starting point
                  for Skibi Defense traders building collections.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/rarity"
            className="text-yellow-400 hover:underline text-sm"
          >
            View all Skibi Defense rarity tiers →
          </Link>
        </div>
      </section>

      {/* Trading Tips Section */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
            Skibi Defense Trading Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Check Skibi Defense Values First</h3>
                  <p className="text-sm text-muted-foreground">
                    Always verify Skibi Defense unit values before accepting Skibi Defense trades.
                    Use our Skibi Defense value list to know exact prices.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Use the Skibi Defense Calculator</h3>
                  <p className="text-sm text-muted-foreground">
                    Our <Link href="/calculator" className="text-yellow-400 hover:underline">Skibi Defense trade calculator</Link> compares both sides instantly.
                    Ensure fair Skibi Defense trades every time.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Watch Skibi Defense Trends</h3>
                  <p className="text-sm text-muted-foreground">
                    Skibi Defense unit values change daily. Track rising Skibi Defense units for
                    potential profit opportunities in Skibi Defense.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Consider Skibi Defense Demand</h3>
                  <p className="text-sm text-muted-foreground">
                    High demand Skibi Defense units sell faster. Check Skibi Defense demand scores
                    in our Skibi Defense value list before trading.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Know Skibi Defense Shiny Values</h3>
                  <p className="text-sm text-muted-foreground">
                    Skibi Defense shiny variants are worth significantly more. Check Skibi Defense shiny prices
                    on individual Skibi Defense unit pages.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                  6
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Redeem Skibi Defense Codes</h3>
                  <p className="text-sm text-muted-foreground">
                    Get free Skibi Defense gems with our <Link href="/codes" className="text-yellow-400 hover:underline">Skibi Defense codes page</Link>. Use Skibi Defense gems to
                    open Skibi Defense crates for new units.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/trading-guide"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
            >
              Read Full Skibi Defense Trading Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">
          Skibi Defense Value List FAQ
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                How often is the Skibi Defense value list updated?
              </h3>
              <p className="text-sm text-muted-foreground">
                Our Skibi Defense value list is updated daily based on current Skibi Defense trading data.
                Skibi Defense unit prices reflect the latest Skibi Defense market trends.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                How do I use the Skibi Defense trade calculator?
              </h3>
              <p className="text-sm text-muted-foreground">
                Add Skibi Defense units to both sides of the Skibi Defense calculator. It will instantly show if
                the Skibi Defense trade is fair, a win, or a loss for you.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What makes Skibi Defense units valuable?
              </h3>
              <p className="text-sm text-muted-foreground">
                Skibi Defense unit value depends on Skibi Defense rarity, demand, and availability.
                Limited Skibi Defense event units and those with low exist counts are worth more in Skibi Defense.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Are there working Skibi Defense codes?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes! We maintain an updated list of working Skibi Defense codes. Check our{" "}
                <Link href="/codes" className="text-yellow-400 hover:underline">Skibi Defense codes page</Link>{" "}
                for active Skibi Defense codes and free Skibi Defense gem rewards.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              About Skibi Defense Trading
            </h2>
            <div className="text-muted-foreground space-y-4 text-sm md:text-base">
              <p>
                Skibi Defense is one of the most popular tower defense games on Roblox,
                featuring a unique unit collection and trading system. Our Skibi Defense
                value list helps players understand the true worth of their units.
              </p>
              <p>
                The Skibi Defense economy is dynamic, with Skibi Defense unit values changing based on
                supply, demand, and new Skibi Defense updates. Skibi Defense Diamond and Godly tier units command
                the highest Skibi Defense prices, while Skibi Defense event-exclusive units often appreciate over time.
              </p>
              <p>
                Whether you&apos;re a new Skibi Defense player or a veteran Skibi Defense trader, our
                Skibi Defense value list and{" "}
                <Link href="/calculator" className="text-yellow-400 hover:underline">Skibi Defense trade calculator</Link>{" "}
                are essential Skibi Defense tools. We track Skibi Defense unit prices across all Skibi Defense rarities.
              </p>
              <p>
                Our Skibi Defense database includes detailed Skibi Defense information for each Skibi Defense unit:
                Skibi Defense base value, Skibi Defense shiny value, DPS stats, traits, and existence counts.
              </p>
              <p>
                Don&apos;t forget to check our <Link href="/codes" className="text-yellow-400 hover:underline">Skibi Defense codes page</Link>{" "}
                for free Skibi Defense gems and Skibi Defense crates. Bookmark our Skibi Defense value list to stay updated with Skibi Defense.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
