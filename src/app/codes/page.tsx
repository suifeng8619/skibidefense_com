import { Metadata } from "next";
import { Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeCard } from "@/components/code-card";
import codesData from "@/data/codes.json";
import { Code } from "@/types/unit";

export const metadata: Metadata = {
  title: "Redeem Codes",
  description:
    "All working Skibi Defense codes. Get free gems, crates, and exclusive rewards. Updated regularly with new codes.",
  openGraph: {
    title: "Skibi Defense Codes - Free Gems & Rewards",
    description:
      "All working Skibi Defense codes. Get free gems, crates, and exclusive rewards. Updated regularly with new codes.",
  },
};

export default function CodesPage() {
  const codes = codesData as Code[];
  const activeCodes = codes.filter((c) => c.status === "active");
  const expiredCodes = codes.filter((c) => c.status === "expired");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-full mb-4">
          <Gift className="h-8 w-8 text-yellow-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Skibi Defense Codes
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Redeem these codes in-game to get free gems, crates, and exclusive
          rewards. Click on a code to copy it.
        </p>
      </header>

      {/* How to Redeem */}
      <Card className="mb-8 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">How to Redeem Codes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>1. Launch Skibi Defense on Roblox</p>
          <p>2. Click the Twitter/Codes button on the side</p>
          <p>3. Enter the code in the text box</p>
          <p>4. Click Redeem to claim your rewards</p>
        </CardContent>
      </Card>

      {/* Active Codes */}
      <section className="max-w-2xl mx-auto mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          Active Codes ({activeCodes.length})
        </h2>
        <div className="space-y-3">
          {activeCodes.map((code) => (
            <CodeCard key={code.code} codeData={code} />
          ))}
          {activeCodes.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No active codes at the moment. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* Expired Codes */}
      {expiredCodes.length > 0 && (
        <section className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500" />
            Expired Codes ({expiredCodes.length})
          </h2>
          <div className="space-y-3">
            {expiredCodes.map((code) => (
              <CodeCard key={code.code} codeData={code} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
