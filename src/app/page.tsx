import { Metadata } from "next";
import Link from "next/link";
import { UnitList } from "@/components/unit-list";
import { getUnits } from "@/lib/units";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Calculator, Gift, Zap, Users, Star, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Skibi Defense Value List 2025 - Unit Prices & Trade Calculator",
  description:
    "Skibi Defense value list with accurate unit prices in gems. Use our Skibi Defense trade calculator to check fair trades. Updated daily Skibi Defense trading values for all rarities.",
  keywords: [
    "Skibi Defense",
    "Skibi Defense value list",
    "Skibi Defense trade calculator",
    "Skibi Defense unit values",
    "Skibi Defense trading",
    "Skibi Defense gems",
    "Skibi Defense prices",
    "Roblox Skibi Defense",
  ],
  openGraph: {
    title: "Skibi Defense Value List 2025 - Unit Prices & Trade Calculator",
    description:
      "The most accurate Skibi Defense value list. Check Skibi Defense unit prices and use our trade calculator. Updated daily.",
    url: "https://skibidefense.com",
  },
  twitter: {
    title: "Skibi Defense Value List 2025 - Unit Prices & Trade Calculator",
    description:
      "The most accurate Skibi Defense value list. Check Skibi Defense unit prices and use our trade calculator.",
  },
  alternates: {
    canonical: "https://skibidefense.com",
  },
};

export default function HomePage() {
  const units = getUnits();
  const currentYear = new Date().getFullYear();

  // Calculate stats from real data
  const skibiDefenseUnits = units.filter(u => u.game === "skibi-defense");
  const ttdUnits = units.filter(u => u.game === "toilet-tower-defense");
  const diamondUnits = units.filter(u => u.rarity === "Diamond");
  const godlyUnits = units.filter(u => u.rarity === "Godly");

  return (
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
              Check current Skibi Defense unit prices, compare trades with our calculator,
              and never get scammed in Skibi Defense trading again.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mb-8">
              <Card className="bg-card/50 border-border">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400">{units.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Total Units</div>
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
                  <div className="text-xs md:text-sm text-muted-foreground">Updates</div>
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
              Complete Skibi Defense price list with demand and trend data
            </p>
          </div>
        </div>
        <UnitList units={units} />
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
                <h3 className="font-semibold text-foreground mb-2">Trend Tracking</h3>
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
                  Avoid unfair Skibi Defense trades with accurate price data
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-full mb-4">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community Data</h3>
                <p className="text-sm text-muted-foreground">
                  Skibi Defense values based on community trading patterns
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
          <Card className="bg-cyan-500/10 border-cyan-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-cyan-400" />
                <span className="font-bold text-cyan-400">Diamond</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The rarest Skibi Defense units. Diamond tier units like D UTCLM and D Gojo
                are extremely valuable in Skibi Defense trading.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-bold text-yellow-400">Godly</span>
              </div>
              <p className="text-sm text-muted-foreground">
                High-tier Skibi Defense units with strong demand. Godly units are
                essential for competitive Skibi Defense gameplay.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 border-purple-800/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-purple-400" />
                <span className="font-bold text-purple-400">Cursed</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Limited event Skibi Defense units from Halloween. Cursed units have
                unique dark abilities in Skibi Defense.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-red-400" />
                <span className="font-bold text-red-400">Secret</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Hidden Skibi Defense units obtained from special methods. Secret units
                are highly sought after by Skibi Defense collectors.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-pink-500/10 border-pink-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-pink-400" />
                <span className="font-bold text-pink-400">Event</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Seasonal Skibi Defense units from holiday events. Event units increase
                in value when Skibi Defense events end.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-fuchsia-500/10 border-fuchsia-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-fuchsia-400" />
                <span className="font-bold text-fuchsia-400">Mythic</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Powerful Skibi Defense units from mythic crates. Great starting point
                for Skibi Defense traders building collections.
              </p>
            </CardContent>
          </Card>
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
                    Our Skibi Defense trade calculator compares both sides instantly.
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
                    Skibi Defense unit values change daily. Track rising units for
                    potential profit in Skibi Defense trading.
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
                    in our Skibi Defense value list.
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
                    Shiny Skibi Defense units are worth 3x more. Check shiny prices
                    on unit detail pages.
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
                    Get free gems with our Skibi Defense codes page. Use gems to
                    open crates for Skibi Defense units.
                  </p>
                </div>
              </div>
            </div>
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
                Skibi Defense unit prices reflect the latest market trends.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                How do I use the Skibi Defense trade calculator?
              </h3>
              <p className="text-sm text-muted-foreground">
                Add Skibi Defense units to both sides of the calculator. It will show if
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
                Skibi Defense unit value depends on rarity, demand, and availability.
                Limited Skibi Defense event units and low-exist counts increase value.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Are Skibi Defense codes still working?
              </h3>
              <p className="text-sm text-muted-foreground">
                We maintain an updated list of working Skibi Defense codes. Check our
                Skibi Defense codes page for active codes and free rewards.
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
                value list helps players understand the true worth of their Skibi Defense
                units in the trading market.
              </p>
              <p>
                The Skibi Defense economy is dynamic, with unit values changing based on
                supply, demand, and new Skibi Defense updates. Diamond and Godly tier
                Skibi Defense units command the highest prices, while event-exclusive
                Skibi Defense units often appreciate over time.
              </p>
              <p>
                Whether you&apos;re a new Skibi Defense player or a veteran trader, our
                Skibi Defense value list and trade calculator are essential tools. We
                track Skibi Defense unit prices across all rarities, from common to
                Diamond tier Skibi Defense units.
              </p>
              <p>
                Our Skibi Defense database includes detailed information for each unit:
                base value, shiny value, DPS stats, traits, and existence counts. This
                comprehensive Skibi Defense data helps you make informed trading decisions.
              </p>
              <p>
                Don&apos;t forget to check our Skibi Defense codes page for free gems and
                crates. New Skibi Defense codes are released regularly during updates
                and events. Bookmark our Skibi Defense value list to stay updated with
                the latest prices and never miss a profitable Skibi Defense trade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
