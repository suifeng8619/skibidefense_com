import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Sparkles, Users, Zap, Tag, ChevronRight, Calculator, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnitImage } from "@/components/unit-image";
import { getUnits, getUnitBySlug, formatValue, getRarityColor, getDemandColor, getTrendIcon, getDemandScoreColor } from "@/lib/units";

interface UnitPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const units = getUnits();
  return units.map((unit) => ({
    slug: unit.slug,
  }));
}

export async function generateMetadata({ params }: UnitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);

  if (!unit) {
    return {
      title: "Unit Not Found",
    };
  }

  const gameName = unit.game === "skibi-defense" ? "Skibi Defense" : "Toilet Tower Defense";
  const title = `${unit.name} Value - ${formatValue(unit.value)} Gems | Skibi Defense`;
  const description = `${unit.name} Skibi Defense value: ${formatValue(unit.value)} Gems. ${unit.rarity} rarity, ${unit.demand} demand. Check ${unit.name} trading trends, shiny value, and stats.`;

  return {
    title,
    description,
    keywords: [
      unit.name,
      `${unit.name} value`,
      `${unit.name} Skibi Defense`,
      `Skibi Defense ${unit.name}`,
      `${unit.name} price`,
      `${unit.rarity} unit Skibi Defense`,
      "Skibi Defense value list",
      "Skibi Defense trading",
    ],
    openGraph: {
      title,
      description,
      url: `https://skibidefense.com/units/${slug}`,
      images: [unit.image],
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `https://skibidefense.com/units/${slug}`,
    },
  };
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);

  if (!unit) {
    notFound();
  }

  const allUnits = getUnits();
  const trend = getTrendIcon(unit.trend);
  const TrendIcon = unit.trend === "Rising" || unit.trend === "Slowly Rising"
    ? TrendingUp
    : unit.trend === "Dropping"
      ? TrendingDown
      : Minus;
  const gameName = unit.game === "skibi-defense" ? "Skibi Defense" : "Toilet Tower Defense";

  // Get related units (same rarity, excluding current unit)
  const relatedByRarity = allUnits
    .filter((u) => u.rarity === unit.rarity && u.id !== unit.id && u.value > 0)
    .sort((a, b) => Math.abs(a.value - unit.value) - Math.abs(b.value - unit.value))
    .slice(0, 4);

  // Get similar value units (different rarity, similar value)
  const similarValue = allUnits
    .filter((u) => u.id !== unit.id && u.rarity !== unit.rarity && u.value > 0)
    .sort((a, b) => Math.abs(a.value - unit.value) - Math.abs(b.value - unit.value))
    .slice(0, 4);

  // Generate Product Schema JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": unit.name,
    "description": `${unit.name} is a ${unit.rarity} rarity unit in Skibi Defense worth ${formatValue(unit.value)} Gems.`,
    "image": unit.image.startsWith("http") ? unit.image : `https://skibidefense.com${unit.image}`,
    "brand": {
      "@type": "Brand",
      "name": gameName
    },
    "offers": {
      "@type": "Offer",
      "price": unit.value,
      "priceCurrency": "GEMS",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": unit.demandScore ? {
      "@type": "AggregateRating",
      "ratingValue": unit.demandScore,
      "bestRating": 10,
      "worstRating": 1
    } : undefined
  };

  // Generate BreadcrumbList Schema JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://skibidefense.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": unit.rarity,
        "item": `https://skibidefense.com/rarity/${unit.rarity.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": unit.name,
        "item": `https://skibidefense.com/units/${unit.slug}`
      }
    ]
  };

  return (
    <>
      <Script
        id={`product-schema-${unit.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(productSchema)}
      </Script>
      <Script
        id={`breadcrumb-schema-${unit.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>

      <div className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="bg-card/50 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/rarity/${unit.rarity.toLowerCase()}`}
                className={`hover:text-foreground transition-colors ${getRarityColor(unit.rarity).split(' ')[0]}`}
              >
                {unit.rarity}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground truncate max-w-[150px] sm:max-w-none">{unit.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Value List
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-card rounded-xl border border-border overflow-hidden">
                <UnitImage
                  src={unit.image}
                  alt={unit.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
                <Badge
                  variant="outline"
                  className={`absolute top-4 right-4 ${getRarityColor(unit.rarity)}`}
                >
                  {unit.rarity}
                </Badge>
                <Badge
                  variant="outline"
                  className="absolute top-4 left-4 bg-background/80"
                >
                  {unit.game === "skibi-defense" ? "SD" : "TTD"}
                </Badge>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {unit.name} Value
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  {gameName} • {unit.rarity} • {unit.obtainedFrom}
                </p>
              </div>

              {/* Traits */}
              {unit.traits && unit.traits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {unit.traits.map((trait) => (
                    <Badge key={trait} variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {trait}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Value Display */}
              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="py-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                    <div className="text-4xl md:text-5xl font-bold text-yellow-400 font-mono">
                      {formatValue(unit.value)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Gems</p>
                  </div>
                </CardContent>
              </Card>

              {/* Shiny Value (if exists) */}
              {unit.shinyValue && (
                <Card className="bg-purple-500/10 border-purple-500/30">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        <span className="text-muted-foreground">Shiny Value</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-400 font-mono">
                        {formatValue(unit.shinyValue)} Gems
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Demand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className={`text-lg font-semibold ${getDemandColor(unit.demand)}`}>
                      {unit.demand}
                    </span>
                    {unit.demandScore && (
                      <span className={`ml-2 text-sm ${getDemandScoreColor(unit.demandScore)}`}>
                        ({unit.demandScore}/10)
                      </span>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className={`text-lg font-semibold flex items-center gap-1 ${trend.color}`}>
                      <TrendIcon className="h-4 w-4" />
                      {unit.trend}
                    </span>
                  </CardContent>
                </Card>
              </div>

              {/* Unit Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Unit Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {unit.dps && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        DPS
                      </span>
                      <span className="font-mono text-yellow-400">{unit.dps}</span>
                    </div>
                  )}
                  {unit.exists !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Exists
                      </span>
                      <span className="font-mono">{unit.exists.toLocaleString()}</span>
                    </div>
                  )}
                  {unit.shinyExists !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Shiny Exists
                      </span>
                      <span className="font-mono text-purple-400">{unit.shinyExists.toLocaleString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notes */}
              {unit.notes && (
                <Card className="bg-blue-500/10 border-blue-500/30">
                  <CardContent className="py-4">
                    <p className="text-sm text-blue-300">{unit.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  <Calculator className="h-4 w-4" />
                  Trade Calculator
                </Link>
                <Link
                  href="/trading-guide"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Trading Guide
                </Link>
              </div>
            </div>
          </div>

          {/* Related Units - Same Rarity */}
          {relatedByRarity.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  More {unit.rarity} Units
                </h2>
                <Link
                  href={`/rarity/${unit.rarity.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all {unit.rarity} →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedByRarity.map((relatedUnit) => (
                  <Link key={relatedUnit.id} href={`/units/${relatedUnit.slug}`} className="group">
                    <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                      <CardContent className="p-3">
                        <div className="w-full aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                          <UnitImage
                            src={relatedUnit.image}
                            alt={relatedUnit.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-foreground truncate">{relatedUnit.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-yellow-400 font-mono">{formatValue(relatedUnit.value)}</span>
                          <span className={`text-xs ${getDemandColor(relatedUnit.demand)}`}>{relatedUnit.demand}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Similar Value Units */}
          {similarValue.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Similar Value Units
                </h2>
                <Link
                  href="/search"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Search all units →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similarValue.map((similarUnit) => (
                  <Link key={similarUnit.id} href={`/units/${similarUnit.slug}`} className="group">
                    <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg">
                      <CardContent className="p-3">
                        <div className="w-full aspect-square relative bg-muted rounded-md overflow-hidden mb-2">
                          <UnitImage
                            src={similarUnit.image}
                            alt={similarUnit.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-foreground truncate">{similarUnit.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-yellow-400 font-mono">{formatValue(similarUnit.value)}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${getRarityColor(similarUnit.rarity)}`}>
                            {similarUnit.rarity}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* SEO Content */}
          <section className="mt-12 md:mt-16 max-w-3xl">
            <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
              About {unit.name} in Skibi Defense
            </h2>
            <div className="text-sm md:text-base text-muted-foreground space-y-4">
              <p>
                {unit.name} is a{" "}
                <Link href={`/rarity/${unit.rarity.toLowerCase()}`} className="text-yellow-400 hover:underline">
                  {unit.rarity.toLowerCase()}
                </Link>{" "}
                rarity unit in Skibi Defense with a current trading value of{" "}
                <strong className="text-yellow-400">{formatValue(unit.value)} Gems</strong>.
                This unit has {unit.demand.toLowerCase()} demand in the trading community
                and the price is currently {unit.trend.toLowerCase()}.
                It can be obtained from {unit.obtainedFrom}.
              </p>
              {unit.traits && unit.traits.length > 0 && (
                <p>
                  This unit has the following traits: {unit.traits.join(", ")}.
                  {unit.dps && ` ${unit.name} deals ${unit.dps} DPS in battles.`}
                </p>
              )}
              {unit.shinyValue && (
                <p>
                  The shiny variant of {unit.name} is worth{" "}
                  <strong className="text-purple-400">{formatValue(unit.shinyValue)} Gems</strong>,
                  which is {Math.round((unit.shinyValue / unit.value) * 100)}% more valuable than the normal version.
                  {unit.shinyExists && ` Only ${unit.shinyExists.toLocaleString()} shiny versions exist.`}
                </p>
              )}
              <p>
                Use our{" "}
                <Link href="/calculator" className="text-yellow-400 hover:underline">trade calculator</Link>{" "}
                to compare {unit.name} trades and ensure fair exchanges. Check out the{" "}
                <Link href="/trading-guide" className="text-yellow-400 hover:underline">trading guide</Link>{" "}
                for tips on getting the best deals. You can also browse all{" "}
                <Link href={`/rarity/${unit.rarity.toLowerCase()}`} className="text-yellow-400 hover:underline">
                  {unit.rarity} units
                </Link>{" "}
                or explore the complete{" "}
                <Link href="/" className="text-yellow-400 hover:underline">value list</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
