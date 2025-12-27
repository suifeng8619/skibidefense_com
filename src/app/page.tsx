import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { UnitList } from "@/components/unit-list";
import { getUnits } from "@/lib/units";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Calculator, Gift, Users, Star, Clock } from "lucide-react";

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
              Updated Daily
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
                  <div className="text-xs md:text-sm text-muted-foreground">Diamond Units</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400">{godlyUnits.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Godly Units</div>
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

      {/* Value List Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Skibi Defense Unit Values
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete price list with demand and trend data
            </p>
          </div>
        </div>
        <UnitList units={units} initialSearch={search} />
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
                <h3 className="font-semibold text-foreground mb-2">Daily Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Skibi Defense values updated daily based on real trading data
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
                <h3 className="font-semibold text-foreground mb-2">Scam Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Avoid unfair trades with accurate Skibi Defense price data
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
                  The rarest Skibi Defense units. Diamond tier units like D UTCLM and D Gojo
                  are extremely valuable in trading.
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
                  High-tier Skibi Defense units with strong demand. Essential for competitive
                  gameplay and valuable in trades.
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
                  Limited Skibi Defense event units from Halloween. Cursed units have
                  unique dark abilities.
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
                  Hidden Skibi Defense units obtained from special methods. Highly sought
                  after by collectors.
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
                  Seasonal Skibi Defense units from holiday events. These units increase
                  in value after events end.
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
                  Powerful Skibi Defense units from mythic crates. Great starting point
                  for traders building collections.
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
            View all rarity tiers →
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
                    Always verify Skibi Defense unit values before accepting trades.
                    Use our value list to know exact prices.
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
                    Our <Link href="/calculator" className="text-yellow-400 hover:underline">trade calculator</Link> compares both sides instantly.
                    Ensure fair trades every time.
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
                    Unit values change daily. Track rising units for
                    potential profit opportunities.
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
                    High demand Skibi Defense units sell faster. Check demand scores
                    in our value list before trading.
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
                    Skibi Defense shiny variants are worth significantly more. Check shiny prices
                    on individual unit pages.
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
                    Get free gems with our <Link href="/codes" className="text-yellow-400 hover:underline">Skibi Defense codes page</Link>. Use gems to
                    open crates for new units.
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
              Read Full Trading Guide →
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
                Our Skibi Defense value list is updated daily based on current trading data.
                Unit prices reflect the latest market trends.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                How do I use the Skibi Defense trade calculator?
              </h3>
              <p className="text-sm text-muted-foreground">
                Add units to both sides of the calculator. It will instantly show if
                the trade is fair, a win, or a loss for you.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What makes Skibi Defense units valuable?
              </h3>
              <p className="text-sm text-muted-foreground">
                Skibi Defense unit value depends on rarity, demand, and availability.
                Limited event units and those with low exist counts are worth more.
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
                <Link href="/codes" className="text-yellow-400 hover:underline">codes page</Link>{" "}
                for active codes and free gem rewards.
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
                The Skibi Defense economy is dynamic, with unit values changing based on
                supply, demand, and new updates. Diamond and Godly tier units command
                the highest prices, while event-exclusive units often appreciate over time.
              </p>
              <p>
                Whether you&apos;re a new Skibi Defense player or a veteran trader, our
                value list and{" "}
                <Link href="/calculator" className="text-yellow-400 hover:underline">trade calculator</Link>{" "}
                are essential tools. We track Skibi Defense unit prices across all rarities.
              </p>
              <p>
                Our Skibi Defense database includes detailed information for each unit:
                base value, shiny value, DPS stats, traits, and existence counts.
              </p>
              <p>
                Don&apos;t forget to check our <Link href="/codes" className="text-yellow-400 hover:underline">Skibi Defense codes page</Link>{" "}
                for free gems and crates. Bookmark our Skibi Defense value list to stay updated.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
