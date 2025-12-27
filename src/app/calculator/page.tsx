import { Metadata } from "next";
import Link from "next/link";
import { TradeCalculator } from "@/components/trade-calculator";
import { getUnits } from "@/lib/units";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calculator, CheckCircle, XCircle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Skibi Defense Trade Calculator - Check Fair Trades",
  description:
    "Use our Skibi Defense trade calculator to check if trades are fair. Compare Skibi Defense unit values instantly and avoid getting scammed in Skibi Defense trading.",
  keywords: [
    "Skibi Defense trade calculator",
    "Skibi Defense trading",
    "Skibi Defense fair trade",
    "Skibi Defense value checker",
    "Skibi Defense trade checker",
  ],
  openGraph: {
    title: "Skibi Defense Trade Calculator - Check Fair Trades",
    description:
      "Compare Skibi Defense trade values and check if a trade is fair. Avoid scams with our accurate Skibi Defense trade calculator.",
    url: "https://skibidefense.com/calculator",
  },
  twitter: {
    title: "Skibi Defense Trade Calculator - Check Fair Trades",
    description:
      "Compare Skibi Defense trade values and check if a trade is fair. Avoid scams with our accurate Skibi Defense trade calculator.",
  },
  alternates: {
    canonical: "https://skibidefense.com/calculator",
  },
};

export default function CalculatorPage() {
  const units = getUnits();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-500/10 via-background to-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Skibi Defense Value List
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-full mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Skibi Defense Trade Calculator
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Compare the value of two Skibi Defense offers to ensure a fair trade.
              Add Skibi Defense units to both sides and see if the trade is balanced.
              Never get scammed in Skibi Defense trading again.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="container mx-auto px-4 py-8">
        <div className="relative max-w-5xl mx-auto">
          <TradeCalculator units={units} />
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
            How to Use the Skibi Defense Trade Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-3">1</div>
                <h3 className="font-semibold text-foreground mb-2">Add Your Skibi Defense Units</h3>
                <p className="text-sm text-muted-foreground">
                  Click &quot;Add Unit&quot; on the left side and select the Skibi Defense
                  units you&apos;re offering in the trade.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-3">2</div>
                <h3 className="font-semibold text-foreground mb-2">Add Their Skibi Defense Units</h3>
                <p className="text-sm text-muted-foreground">
                  Click &quot;Add Unit&quot; on the right side and select the Skibi Defense
                  units they&apos;re offering you.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-3">3</div>
                <h3 className="font-semibold text-foreground mb-2">Check the Skibi Defense Trade</h3>
                <p className="text-sm text-muted-foreground">
                  The calculator shows if the Skibi Defense trade is fair, a win,
                  or a loss based on current values.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trade Outcomes */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
          Understanding Skibi Defense Trade Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="font-bold text-green-400">Win</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The Skibi Defense units you&apos;re receiving are worth more than what
                you&apos;re giving. This is a profitable Skibi Defense trade for you.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Scale className="h-6 w-6 text-yellow-400" />
                <span className="font-bold text-yellow-400">Fair</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Both sides of the Skibi Defense trade are roughly equal in value.
                Neither player gains or loses significantly.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="h-6 w-6 text-red-400" />
                <span className="font-bold text-red-400">Loss</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You&apos;re giving away more Skibi Defense value than you&apos;re receiving.
                Consider asking for more Skibi Defense units or decline the trade.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
            Skibi Defense Trading Tips
          </h2>
          <div className="max-w-5xl mx-auto space-y-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Check Skibi Defense Demand
                </h3>
                <p className="text-sm text-muted-foreground">
                  High demand Skibi Defense units are easier to trade. Even if values match,
                  low demand Skibi Defense units might be harder to resell.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Watch Skibi Defense Trends
                </h3>
                <p className="text-sm text-muted-foreground">
                  Rising Skibi Defense units may be worth more soon. Consider Skibi Defense
                  trend data when evaluating trades for future value.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Verify Skibi Defense Shiny Status
                </h3>
                <p className="text-sm text-muted-foreground">
                  Shiny Skibi Defense units are worth approximately 3x more. Make sure you
                  select the correct variant in the Skibi Defense calculator.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            About the Skibi Defense Trade Calculator
          </h2>
          <div className="text-muted-foreground space-y-4 text-sm md:text-base">
            <p>
              Our Skibi Defense trade calculator is an essential tool for any Skibi Defense
              trader. It uses real-time Skibi Defense value data to compare trades instantly,
              helping you make informed decisions in Skibi Defense trading.
            </p>
            <p>
              The Skibi Defense calculator accounts for all rarity tiers from Common to Diamond.
              Whether you&apos;re trading Skibi Defense Godly units or Skibi Defense Event exclusives,
              our calculator provides accurate Skibi Defense valuations.
            </p>
            <p>
              Skibi Defense trading can be complex with hundreds of units at different values.
              Our Skibi Defense trade calculator simplifies this by showing you exactly whether
              a Skibi Defense trade benefits you, is fair, or puts you at a loss.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
