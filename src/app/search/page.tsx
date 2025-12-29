import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search, Star, TrendingUp, Calculator, BookOpen, Gift } from "lucide-react";
import { UnitList } from "@/components/unit-list";
import { UnitImage } from "@/components/unit-image";
import { getUnits, formatValue, getRarityColor, RARITY_ORDER } from "@/lib/units";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Search Units - Find Values & Stats",
  description:
    "Search all units by name, rarity, or traits. Find exact unit values, demand scores, and trading information instantly.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Search Units",
    description: "Find any unit instantly with our powerful search.",
    url: "https://skibidefense.com/search",
  },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const units = getUnits();

  // Get trending units (Rising or Slowly Rising trend, sorted by value)
  const trendingUnits = units
    .filter((u) => u.trend === "Rising" || u.trend === "Slowly Rising")
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Get high demand units
  const highDemandUnits = units
    .filter((u) => u.demand === "Very High" && u.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Get available rarities with counts
  const rarityCounts = units.reduce((acc, u) => {
    acc[u.rarity] = (acc[u.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topRarities = RARITY_ORDER
    .filter((r) => rarityCounts[r])
    .slice(0, 8);

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
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
            Find any unit by name, rarity, or traits. Search through {units.length}+ units
            with instant access to values and trading info.
          </p>
          {q && (
            <Badge variant="outline" className="text-blue-400 border-blue-500">
              Searching for: &quot;{q}&quot;
            </Badge>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Quick:</span>
            {topRarities.map((rarity) => (
              <Link
                key={rarity}
                href={`/rarity/${rarity.toLowerCase()}`}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors hover:opacity-80 ${getRarityColor(rarity)}`}
              >
                {rarity} ({rarityCounts[rarity]})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Results */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <UnitList units={units} initialSearch={q} />
        </div>
      </section>

      {/* Trending Units */}
      {!q && trendingUnits.length > 0 && (
        <section className="bg-card/30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <h2 className="text-xl font-bold text-foreground">Trending Units</h2>
              </div>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {trendingUnits.map((unit) => (
                <Link
                  key={unit.id}
                  href={`/units/${unit.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-3">
                      <div className="w-full aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                        <UnitImage
                          src={unit.image}
                          alt={unit.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xs font-medium text-foreground truncate">
                        {unit.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-yellow-400 font-mono">
                          {formatValue(unit.value)}
                        </span>
                        <span className="text-xs text-green-400">↑</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* High Demand Units */}
      {!q && highDemandUnits.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-bold text-foreground">High Demand Units</h2>
              </div>
              <Link href="/rarity" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse by rarity →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {highDemandUnits.map((unit) => (
                <Link
                  key={unit.id}
                  href={`/units/${unit.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-3">
                      <div className="w-full aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                        <UnitImage
                          src={unit.image}
                          alt={unit.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xs font-medium text-foreground truncate">
                        {unit.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-yellow-400 font-mono">
                          {formatValue(unit.value)}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1 py-0 text-emerald-400 border-emerald-500">
                          Hot
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search Tips */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Search Tips
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Search by Name</h3>
                <p className="text-muted-foreground">
                  Type any part of a unit name. &quot;Titan&quot; shows all Titan units like
                  Titan Cameraman, Titan Speakerman.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Search by Rarity</h3>
                <p className="text-muted-foreground">
                  Type &quot;Diamond&quot; or &quot;Godly&quot; to see all units of that tier.
                  Use the filter dropdown for precision.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Search by Traits</h3>
                <p className="text-muted-foreground">
                  Find units with specific abilities by trait keywords like
                  &quot;Flying&quot;, &quot;Area&quot;, or &quot;Support&quot;.
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Combine Filters</h3>
                <p className="text-muted-foreground">
                  Use search with rarity and game filters together to narrow
                  down to exactly what you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            Popular Searches
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {["Titan", "Cameraman", "Speakerman", "TV Man", "Clockman", "Diamond", "Godly", "Cosmic", "Upgraded", "Colossal"].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Tools CTA */}
      <section className="bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            Trading Tools
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link href="/calculator" className="group">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-yellow-500/20 rounded-full mb-3">
                    <Calculator className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Trade Calculator</h3>
                  <p className="text-xs text-muted-foreground">
                    Compare trades instantly
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/trading-guide" className="group">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full mb-3">
                    <BookOpen className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Trading Guide</h3>
                  <p className="text-xs text-muted-foreground">
                    Learn trading strategies
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/codes" className="group">
              <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-full mb-3">
                    <Gift className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Active Codes</h3>
                  <p className="text-xs text-muted-foreground">
                    Get free gems & rewards
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
