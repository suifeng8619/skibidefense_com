import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { UnitList } from "@/components/unit-list";
import { getUnits, RARITY_ORDER, getRarityColor, getRarityBgColor } from "@/lib/units";
import { Rarity } from "@/types/unit";
import { Badge } from "@/components/ui/badge";

// Generate static pages for all rarities
export async function generateStaticParams() {
  const units = getUnits();
  const rarities = new Set<string>();
  units.forEach((unit) => rarities.add(unit.rarity.toLowerCase().replace(/\s+/g, "-")));

  return Array.from(rarities).map((rarity) => ({
    rarity,
  }));
}

// Map URL slug to actual rarity name
function getRarityFromSlug(slug: string): Rarity | null {
  const rarityMap: Record<string, Rarity> = {
    "diamond": "Diamond",
    "godly": "Godly",
    "cursed": "Cursed",
    "secret": "Secret",
    "event": "Event",
    "ultimates": "Ultimates",
    "celestials": "Celestials",
    "exclusives": "Exclusives",
    "mythic": "Mythic",
    "legendary": "Legendary",
    "epic": "Epic",
    "rare": "Rare",
    "uncommon": "Uncommon",
    "common": "Common",
    "grandmaster": "Grandmaster",
    "evolution": "Evolution",
    "cosmics": "Cosmics",
    "cosmic": "Cosmic",
    "astral": "ASTRAL",
    "divine": "Divine",
  };
  return rarityMap[slug.toLowerCase()] || null;
}

// SEO descriptions for each rarity
const rarityDescriptions: Record<string, string> = {
  "Diamond": "Diamond tier units are the rarest and most valuable in Skibi Defense. These premium units offer exceptional stats and unique abilities.",
  "Godly": "Godly units are high-tier powerhouses in Skibi Defense. Essential for competitive gameplay and highly sought after by traders.",
  "Cursed": "Cursed units are limited Halloween event exclusives in Skibi Defense. Their dark abilities and limited supply make them valuable collectibles.",
  "Secret": "Secret units are hidden gems in Skibi Defense, obtained through special methods. Collectors prize these rare finds.",
  "Event": "Event units are seasonal exclusives from Skibi Defense holiday events. Their value increases when events end.",
  "Ultimates": "Ultimate tier units represent peak power in Skibi Defense. These units dominate in both gameplay and trading.",
  "Celestials": "Celestial units bring heavenly power to Skibi Defense. Their divine abilities make them popular choices.",
  "Exclusives": "Exclusive units are the most coveted in Skibi Defense. Limited availability drives their exceptional trading value.",
  "Mythic": "Mythic units are powerful additions from Skibi Defense mythic crates. Great starting point for traders building collections.",
  "Legendary": "Legendary units are solid performers in Skibi Defense. Good balance of value and availability for active traders.",
  "Epic": "Epic units offer reliable performance in Skibi Defense. Affordable entry point for new players building their teams.",
  "Rare": "Rare units are common finds in Skibi Defense but still useful. Good for completing collections and early-game progress.",
  "Uncommon": "Uncommon units are basic Skibi Defense units. Easy to obtain and useful for beginners.",
  "Common": "Common units are starting units in Skibi Defense. While low in value, they help new players learn game mechanics.",
  "Grandmaster": "Grandmaster units represent elite status in Skibi Defense. These units showcase mastery and dedication.",
  "Evolution": "Evolution units are upgraded forms in Skibi Defense. Their enhanced abilities make them stronger than base versions.",
  "Cosmics": "Cosmic units harness universal power in Skibi Defense. Their stellar abilities make them top-tier choices.",
  "Cosmic": "Cosmic units channel the power of the cosmos in Skibi Defense. High-value units with impressive stats.",
  "ASTRAL": "Astral units are transcendent beings in Skibi Defense. Among the rarest and most powerful units available.",
  "Divine": "Divine units are blessed with holy power in Skibi Defense. Their sacred abilities make them highly desirable.",
};

interface RarityPageProps {
  params: Promise<{ rarity: string }>;
}

export async function generateMetadata({ params }: RarityPageProps): Promise<Metadata> {
  const { rarity: raritySlug } = await params;
  const rarity = getRarityFromSlug(raritySlug);

  if (!rarity) {
    return {
      title: "Rarity Not Found - Skibi Defense Value List",
    };
  }

  const units = getUnits().filter((u) => u.rarity === rarity);
  const description = rarityDescriptions[rarity] || `Browse all ${rarity} units in Skibi Defense with current values and trading information.`;

  return {
    title: `${rarity} Units Value List - Skibi Defense ${rarity} Tier Prices`,
    description: `${description} Find ${units.length} ${rarity} Skibi Defense units with accurate gem values, demand scores, and market trends.`,
    keywords: [
      `Skibi Defense ${rarity}`,
      `${rarity} units Skibi Defense`,
      `Skibi Defense ${rarity} value`,
      `${rarity} tier Skibi Defense`,
      "Skibi Defense value list",
      "Skibi Defense trading",
    ],
    openGraph: {
      title: `${rarity} Units - Skibi Defense Value List`,
      description: `Browse all ${units.length} ${rarity} units in Skibi Defense with current trading values.`,
      url: `https://skibidefense.com/rarity/${raritySlug}`,
    },
    alternates: {
      canonical: `https://skibidefense.com/rarity/${raritySlug}`,
    },
  };
}

export default async function RarityPage({ params }: RarityPageProps) {
  const { rarity: raritySlug } = await params;
  const rarity = getRarityFromSlug(raritySlug);

  if (!rarity) {
    notFound();
  }

  const allUnits = getUnits();
  const units = allUnits.filter((u) => u.rarity === rarity);
  const description = rarityDescriptions[rarity] || `Browse all ${rarity} units in Skibi Defense.`;

  // Calculate stats
  const totalValue = units.reduce((sum, u) => sum + u.value, 0);
  const avgValue = units.length > 0 ? Math.round(totalValue / units.length) : 0;
  const highDemandCount = units.filter((u) => u.demand === "High" || u.demand === "Very High").length;

  // Get other rarities for navigation
  const availableRarities = Array.from(new Set(allUnits.map((u) => u.rarity)))
    .sort((a, b) => RARITY_ORDER.indexOf(a) - RARITY_ORDER.indexOf(b));

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
            <Link href="/rarity" className="hover:text-foreground transition-colors">
              Rarities
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{rarity}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`py-8 md:py-12 ${getRarityBgColor(rarity)} bg-opacity-20`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge variant="outline" className={`mb-4 ${getRarityColor(rarity)}`}>
              {units.length} Units
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {rarity} Units Value List
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-foreground">{units.length}</div>
                <div className="text-xs text-muted-foreground">Total Units</div>
              </div>
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-yellow-400">{avgValue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Avg Value</div>
              </div>
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-green-400">{highDemandCount}</div>
                <div className="text-xs text-muted-foreground">High Demand</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rarity Navigation */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {availableRarities.map((r) => (
              <Link
                key={r}
                href={`/rarity/${r.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  r === rarity
                    ? getRarityBgColor(r) + " text-white"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Unit List */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <UnitList units={units} />
      </section>

      {/* SEO Content */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">
              About {rarity} Units in Skibi Defense
            </h2>
            <div className="text-muted-foreground space-y-3 text-sm">
              <p>
                {rarity} units are an important tier in the Skibi Defense trading economy.
                Understanding their values helps you make profitable trades and avoid scams.
              </p>
              <p>
                The values shown are based on current market data and community trading patterns.
                Prices can fluctuate based on game updates, events, and overall demand.
              </p>
              <p>
                Use our Skibi Defense trade calculator to compare {rarity} units with other
                rarities and ensure fair trades every time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
