import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Skibi Defense Trading Guide - Tips & Strategies for Success",
  description:
    "Complete Skibi Defense trading guide with tips, strategies, and scam prevention. Learn how to maximize value, spot good trades, and protect your units.",
  keywords: [
    "Skibi Defense trading guide",
    "Skibi Defense trading tips",
    "Skibi Defense scam prevention",
    "how to trade Skibi Defense",
    "Skibi Defense value trading",
  ],
  openGraph: {
    title: "Skibi Defense Trading Guide",
    description: "Master Skibi Defense trading with our comprehensive guide.",
    url: "https://skibidefense.com/trading-guide",
  },
  alternates: {
    canonical: "https://skibidefense.com/trading-guide",
  },
};

export default function TradingGuidePage() {
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
            <span className="text-foreground">Trading Guide</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-500/10 via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Skibi Defense Trading Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master the art of trading in Skibi Defense. Learn proven strategies, avoid scams,
            and build your dream collection.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-5xl mx-auto bg-card border-border">
          <CardContent className="p-6">
            <h2 className="font-semibold text-foreground mb-4">Quick Navigation</h2>
            <nav className="grid sm:grid-cols-2 gap-2 text-sm">
              <a href="#basics" className="text-muted-foreground hover:text-foreground transition-colors">
                1. Trading Basics
              </a>
              <a href="#values" className="text-muted-foreground hover:text-foreground transition-colors">
                2. Understanding Values
              </a>
              <a href="#demand" className="text-muted-foreground hover:text-foreground transition-colors">
                3. Demand & Trends
              </a>
              <a href="#scams" className="text-muted-foreground hover:text-foreground transition-colors">
                4. Avoiding Scams
              </a>
              <a href="#strategies" className="text-muted-foreground hover:text-foreground transition-colors">
                5. Trading Strategies
              </a>
              <a href="#tips" className="text-muted-foreground hover:text-foreground transition-colors">
                6. Pro Tips
              </a>
            </nav>
          </CardContent>
        </Card>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Section 1: Basics */}
          <div id="basics">
            <Badge variant="outline" className="mb-3 text-blue-400 border-blue-500">
              Chapter 1
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-4">Trading Basics</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Trading is a core feature of Skibi Defense, allowing players to exchange units
                and build their collections. Before you start, understanding the fundamentals
                will help you make better decisions.
              </p>
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Key Concepts</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Value:</strong> The gem worth of a unit based on market data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Demand:</strong> How actively players are seeking a unit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Trend:</strong> Whether a unit&apos;s value is rising or falling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Rarity:</strong> The tier classification affecting base value</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 2: Values */}
          <div id="values">
            <Badge variant="outline" className="mb-3 text-yellow-400 border-yellow-500">
              Chapter 2
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-4">Understanding Values</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Unit values in Skibi Defense are measured in gems. These values fluctuate based
                on several factors including rarity, availability, and community demand.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">Value Factors</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Rarity tier (Diamond to Common)</li>
                      <li>• Total units in existence</li>
                      <li>• How unit was obtained</li>
                      <li>• Unit stats and abilities</li>
                      <li>• Event exclusivity</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">Shiny Multiplier</h3>
                    <p className="text-sm">
                      Shiny versions of units are typically worth 3x their base value.
                      Some rare shinies can be worth even more due to extremely low exist counts.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="p-4 flex gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Always check our value list before trading.
                    Values can change daily based on game updates and market conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 3: Demand */}
          <div id="demand">
            <Badge variant="outline" className="mb-3 text-green-400 border-green-500">
              Chapter 3
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-4">Demand & Trends</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Understanding demand and trends is crucial for profitable trading. A high-value
                unit with low demand can be harder to trade than a mid-value unit everyone wants.
              </p>
              <div className="space-y-3">
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-emerald-400 mb-2">Very High Demand</h3>
                    <p className="text-sm">
                      These units sell instantly. Players actively seek them out and you can
                      often get overpays. Great units to hold.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-400 mb-2">High Demand</h3>
                    <p className="text-sm">
                      Easy to trade with consistent interest. Good balance of value and liquidity.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-400 mb-2">Normal Demand</h3>
                    <p className="text-sm">
                      Average trading activity. May take some time to find the right buyer.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-red-400 mb-2">Low Demand</h3>
                    <p className="text-sm">
                      Hard to sell. You might need to accept underpays or be patient.
                      Be cautious when trading for these.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Section 4: Scams */}
          <div id="scams">
            <Badge variant="outline" className="mb-3 text-red-400 border-red-500">
              Chapter 4
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-4">Avoiding Scams</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Unfortunately, scammers exist in every trading community. Learning to recognize
                and avoid common scams will protect your valuable units.
              </p>
              <Card className="bg-red-500/10 border-red-500/30">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-400 mb-2">Common Scam Tactics</h3>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span><strong>Value Manipulation:</strong> Claiming a unit is worth more than it actually is</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span><strong>Trust Trading:</strong> Asking you to give units first with promises to pay back</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span><strong>Fake Middlemen:</strong> Pretending to be trusted traders or moderators</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span><strong>Pressure Tactics:</strong> Rushing you to accept before you can verify values</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-green-500/10 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-400 mb-2">How to Stay Safe</h3>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Always verify values on our value list before accepting trades</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Use the trade calculator to compare both sides instantly</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Never trust trade outside of the official trading system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Take your time - legitimate traders will not rush you</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 5: Strategies */}
          <div id="strategies">
            <Badge variant="outline" className="mb-3 text-purple-400 border-purple-500">
              Chapter 5
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-4">Trading Strategies</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Whether you want to grow your collection or maximize gem value, these strategies
                will help you trade more effectively.
              </p>
              <div className="space-y-4">
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <TrendingUp className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Buy Low, Sell High</h3>
                        <p className="text-sm">
                          Watch for units with &quot;Rising&quot; trends and acquire them before prices peak.
                          Sell units showing &quot;Dropping&quot; trends before they lose more value.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Demand Trading</h3>
                        <p className="text-sm">
                          Trade low-demand units for high-demand ones of similar value.
                          High-demand units are easier to trade and often get overpays.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <TrendingUp className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Event Investing</h3>
                        <p className="text-sm">
                          Event-exclusive units often rise in value after the event ends.
                          Collect event units while available for potential future profits.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Section 6: Tips */}
          <div id="tips">
            <Badge variant="outline" className="mb-3 text-orange-400 border-orange-500">
              Chapter 6
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-4">Pro Tips</h2>
            <div className="text-muted-foreground space-y-4">
              <div className="grid gap-3">
                {[
                  "Check values daily - the market changes constantly",
                  "Keep some high-demand units for easy trading",
                  "Diversify your collection across multiple rarities",
                  "Join trading communities to find better deals",
                  "Be patient - good trades come to those who wait",
                  "Track your trades to learn from successes and mistakes",
                  "Consider shiny values when evaluating trades",
                  "Redeem codes regularly for free gems and units",
                ].map((tip, index) => (
                  <Card key={index} className="bg-card/50">
                    <CardContent className="p-3 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm">{tip}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-foreground mb-4">Start Trading Smarter</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Now that you know the basics, put your knowledge to use with our trading tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
            >
              Check Values
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-6 py-3 bg-card hover:bg-accent border border-border font-semibold rounded-lg transition-colors"
            >
              Use Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
