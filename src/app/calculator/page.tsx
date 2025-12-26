import { Metadata } from "next";
import { TradeCalculator } from "@/components/trade-calculator";
import { getUnits } from "@/lib/units";

export const metadata: Metadata = {
  title: "Trade Calculator",
  description:
    "Compare Skibi Defense trade values and check if a trade is fair. Avoid scams with our accurate trade calculator.",
  openGraph: {
    title: "Skibi Defense Trade Calculator",
    description:
      "Compare Skibi Defense trade values and check if a trade is fair. Avoid scams with our accurate trade calculator.",
  },
};

export default function CalculatorPage() {
  const units = getUnits();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Trade Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare the value of two offers to ensure a fair trade. Add units to
          both sides and see if the trade is balanced.
        </p>
      </header>

      {/* Calculator */}
      <div className="relative max-w-4xl mx-auto">
        <TradeCalculator units={units} />
      </div>

      {/* How to Use */}
      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-foreground mb-4 text-center">
          How to Use
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-yellow-400 mb-2">1</div>
            <p className="text-sm text-muted-foreground">
              Add units to &quot;Your Offer&quot; column
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-yellow-400 mb-2">2</div>
            <p className="text-sm text-muted-foreground">
              Add units to &quot;Their Offer&quot; column
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <div className="text-2xl font-bold text-yellow-400 mb-2">3</div>
            <p className="text-sm text-muted-foreground">
              Check the verdict to see if the trade is fair
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
