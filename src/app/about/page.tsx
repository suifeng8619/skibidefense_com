import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, TrendingUp, Calculator, Users, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getUnits } from "@/lib/units";

export const metadata: Metadata = {
  title: "About Skibi Defense Value List - Accurate Trading Values",
  description:
    "Learn about Skibi Defense Value List, the most trusted source for Skibi Defense unit prices and trading values. Daily updates, community-driven data, and fair trade tools.",
  keywords: [
    "about Skibi Defense value list",
    "Skibi Defense trading guide",
    "Skibi Defense community",
    "Skibi Defense prices",
  ],
  openGraph: {
    title: "About Skibi Defense Value List",
    description: "The most trusted source for Skibi Defense trading values.",
    url: "https://skibidefense.com/about",
  },
  alternates: {
    canonical: "https://skibidefense.com/about",
  },
};

export default function AboutPage() {
  const units = getUnits();
  const rarityCount = new Set(units.map((u) => u.rarity)).size;

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
            <span className="text-foreground">About</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-500/10 via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About Skibi Defense Value List
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted source for accurate Skibi Defense trading values, helping players
            make fair trades and avoid scams since 2024.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{units.length}</div>
              <div className="text-xs text-muted-foreground">Units Tracked</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400">{rarityCount}</div>
              <div className="text-xs text-muted-foreground">Rarity Tiers</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">Daily</div>
              <div className="text-xs text-muted-foreground">Updates</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">100%</div>
              <div className="text-xs text-muted-foreground">Free</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Mission</h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              Skibi Defense Value List was created with one goal: to help players trade fairly.
              We believe every player deserves access to accurate, up-to-date trading information
              without having to rely on guesswork or risk getting scammed.
            </p>
            <p>
              Our team monitors the Skibi Defense trading community daily, analyzing trade data
              and market trends to provide the most accurate values possible. We track everything
              from common units to the rarest Diamond tier collectibles.
            </p>
            <p>
              Whether you are a new player learning to trade or a veteran collector looking for
              specific values, our tools are designed to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-full mb-4">
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Accurate Values</h3>
                <p className="text-sm text-muted-foreground">
                  Every unit value is based on real trading data from the Skibi Defense community.
                  We update prices daily to reflect current market conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-full mb-4">
                  <Calculator className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Trade Calculator</h3>
                <p className="text-sm text-muted-foreground">
                  Our trade calculator instantly compares both sides of any trade.
                  See at a glance if a deal is fair, a win, or a loss for you.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Scam Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Know the true value before you trade. Our data helps you avoid
                  unfair deals and protect your valuable units.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-full mb-4">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Our values come from real trades happening in the community.
                  We listen to player feedback to improve accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center p-3 bg-orange-500/20 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Daily Updates</h3>
                <p className="text-sm text-muted-foreground">
                  The Skibi Defense market changes constantly. We update our database
                  daily to keep values current and reliable.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center p-3 bg-red-500/20 rounded-full mb-4">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Free Forever</h3>
                <p className="text-sm text-muted-foreground">
                  All our tools and data are completely free. No subscriptions,
                  no premium features locked behind paywalls.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-4">Disclaimer</h2>
          <div className="text-sm text-muted-foreground space-y-3 bg-card/50 p-6 rounded-lg border border-border">
            <p>
              Skibi Defense Value List is a fan-made resource and is not affiliated with,
              endorsed by, or connected to Roblox Corporation or the developers of Skibi Defense.
            </p>
            <p>
              All game assets, names, and trademarks are the property of their respective owners.
              We provide trading information as a community service.
            </p>
            <p>
              While we strive for accuracy, trading values are estimates based on community data.
              Actual trade values may vary based on individual negotiations and market conditions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-foreground mb-4">Ready to Trade?</h2>
          <p className="text-muted-foreground mb-6">
            Start using our tools to make smarter trades today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
            >
              View Value List
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-6 py-3 bg-card hover:bg-accent border border-border font-semibold rounded-lg transition-colors"
            >
              Try Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
