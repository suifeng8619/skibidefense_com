import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { UnitList } from "@/components/unit-list";
import { getUnits } from "@/lib/units";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Search Skibi Defense Units - Find Unit Values & Stats",
  description:
    "Search all Skibi Defense units by name, rarity, or traits. Find exact unit values, demand scores, and trading information instantly.",
  keywords: [
    "Skibi Defense search",
    "find Skibi Defense units",
    "Skibi Defense unit lookup",
    "Skibi Defense value search",
  ],
  openGraph: {
    title: "Search Skibi Defense Units",
    description: "Find any Skibi Defense unit instantly with our powerful search.",
    url: "https://skibidefense.com/search",
  },
  alternates: {
    canonical: "https://skibidefense.com/search",
  },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const units = getUnits();

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
            <span className="text-foreground">Search</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500/10 via-background to-background py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-full mb-4">
            <Search className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Search Skibi Defense Units
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Find any unit by name, rarity, or traits. Get instant access to values and trading info.
          </p>
          {q && (
            <Badge variant="outline" className="mt-4 text-blue-400 border-blue-500">
              Searching for: &quot;{q}&quot;
            </Badge>
          )}
        </div>
      </section>

      {/* Search & Results */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <UnitList units={units} initialSearch={q} />
      </section>

      {/* Search Tips */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Search Tips
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Search by Name</h3>
                <p className="text-muted-foreground">
                  Type any part of a unit name to find it. For example, &quot;Titan&quot; will show all
                  Titan units like Titan Cameraman, Titan Speakerman, etc.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Search by Rarity</h3>
                <p className="text-muted-foreground">
                  Type a rarity name like &quot;Diamond&quot; or &quot;Godly&quot; to see all units of that tier.
                  Or use the rarity filter dropdown for more precision.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Search by Traits</h3>
                <p className="text-muted-foreground">
                  Find units with specific abilities by searching trait keywords.
                  Try &quot;Flying&quot;, &quot;Area&quot;, or &quot;Support&quot;.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Combine Filters</h3>
                <p className="text-muted-foreground">
                  Use the search box with rarity and game filters to narrow down
                  results. Perfect for finding specific unit types.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
