import { Metadata } from "next";
import Link from "next/link";
import { Gift, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeCard } from "@/components/code-card";
import codesData from "@/data/codes.json";
import { Code } from "@/types/unit";

export const metadata: Metadata = {
  title: "Skibi Defense Codes 2025 - Free Gems & Rewards",
  description:
    "All working Skibi Defense codes for free gems, crates, and exclusive rewards. Updated list of active Skibi Defense codes. Redeem Skibi Defense codes now!",
  keywords: [
    "Skibi Defense codes",
    "Skibi Defense free gems",
    "Skibi Defense redeem codes",
    "Skibi Defense rewards",
    "Skibi Defense codes 2025",
    "Roblox Skibi Defense codes",
  ],
  openGraph: {
    title: "Skibi Defense Codes 2025 - Free Gems & Rewards",
    description:
      "All working Skibi Defense codes for free gems, crates, and exclusive rewards. Updated daily with new Skibi Defense codes.",
    url: "https://skibidefense.com/codes",
  },
  twitter: {
    title: "Skibi Defense Codes 2025 - Free Gems & Rewards",
    description:
      "All working Skibi Defense codes for free gems, crates, and exclusive rewards. Updated daily with new Skibi Defense codes.",
  },
  alternates: {
    canonical: "https://skibidefense.com/codes",
  },
};

export default function CodesPage() {
  const codes = codesData as Code[];
  const activeCodes = codes.filter((c) => c.status === "active");
  const expiredCodes = codes.filter((c) => c.status === "expired");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-yellow-500/10 via-background to-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Skibi Defense Value List
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-full mb-4">
              <Gift className="h-8 w-8 text-yellow-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Skibi Defense Codes 2025
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Redeem these Skibi Defense codes in-game to get free gems, crates, and
              exclusive rewards. All Skibi Defense codes are tested and verified working.
              Click on any Skibi Defense code to copy it.
            </p>
          </div>
        </div>
      </section>

      {/* How to Redeem */}
      <section className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              How to Redeem Skibi Defense Codes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">1</span>
              <p>Launch Skibi Defense on Roblox</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">2</span>
              <p>Click the Twitter/Codes button on the side of the Skibi Defense game screen</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">3</span>
              <p>Enter the Skibi Defense code in the text box (click codes below to copy)</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">4</span>
              <p>Click Redeem to claim your Skibi Defense rewards</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Active Codes */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Active Skibi Defense Codes ({activeCodes.length})
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            These Skibi Defense codes are currently working. Redeem them before they expire!
          </p>
          <div className="space-y-3">
            {activeCodes.map((code) => (
              <CodeCard key={code.code} codeData={code} />
            ))}
            {activeCodes.length === 0 && (
              <Card className="bg-card border-border">
                <CardContent className="py-8 text-center">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No active Skibi Defense codes at the moment. Check back soon for new
                    Skibi Defense codes!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Expired Codes */}
      {expiredCodes.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-500" />
              Expired Skibi Defense Codes ({expiredCodes.length})
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              These Skibi Defense codes are no longer working. Keep them for reference.
            </p>
            <div className="space-y-3 opacity-60">
              {expiredCodes.map((code) => (
                <CodeCard key={code.code} codeData={code} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Code Tips */}
      <section className="bg-card/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
            Skibi Defense Codes Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2">Check Regularly</h3>
                <p className="text-sm text-muted-foreground">
                  New Skibi Defense codes are released during updates, events, and milestones.
                  Bookmark this page for the latest Skibi Defense codes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2">Case Sensitive</h3>
                <p className="text-sm text-muted-foreground">
                  Skibi Defense codes are case sensitive. Copy them exactly as shown to
                  successfully redeem your Skibi Defense rewards.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2">One-Time Use</h3>
                <p className="text-sm text-muted-foreground">
                  Each Skibi Defense code can only be redeemed once per account.
                  Make sure to use all active Skibi Defense codes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            About Skibi Defense Codes
          </h2>
          <div className="text-muted-foreground space-y-4 text-sm md:text-base">
            <p>
              Skibi Defense codes are special promotional codes released by the game developers.
              These Skibi Defense codes give players free gems, crates, and exclusive items
              that can help you progress faster in Skibi Defense.
            </p>
            <p>
              We update our Skibi Defense codes list regularly to ensure all codes are working.
              When new Skibi Defense codes are released, we test them and add them to this page.
              Expired Skibi Defense codes are moved to the expired section for reference.
            </p>
            <p>
              Skibi Defense codes are typically released during game updates, holiday events,
              and when the game reaches player milestones. Follow official Skibi Defense social
              media channels and check this page regularly for the latest Skibi Defense codes.
            </p>
            <p>
              Use the gems from Skibi Defense codes to open crates and obtain new units.
              Check our <Link href="/" className="text-yellow-400 hover:underline">Skibi Defense value list</Link> to
              see which units are most valuable in Skibi Defense trading.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
