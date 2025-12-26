import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Sparkles, Users, Zap, Tag } from "lucide-react";
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
  const title = `${unit.name} Value - ${gameName} Unit Price & Stats`;
  const description = `${unit.name} Skibi Defense value: ${formatValue(unit.value)} Gems. Check ${unit.name} demand, trading trends, shiny value, and stats in our Skibi Defense value list.`;

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

  const trend = getTrendIcon(unit.trend);
  const TrendIcon = unit.trend === "Rising" || unit.trend === "Slowly Rising"
    ? TrendingUp
    : unit.trend === "Dropping"
      ? TrendingDown
      : Minus;
  const gameName = unit.game === "skibi-defense" ? "Skibi Defense" : "Toilet Tower Defense";

  return (
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
              {unit.name} - Skibi Defense Value
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {gameName} Unit • {unit.obtainedFrom}
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

          {/* Price History Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Price History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border">
                Price history chart coming soon
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <section className="mt-12 md:mt-16 max-w-2xl">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">
          About {unit.name} in Skibi Defense
        </h2>
        <div className="text-sm md:text-base text-muted-foreground space-y-4">
          <p>
            {unit.name} is a {unit.rarity.toLowerCase()} rarity unit in Skibi Defense
            with a current Skibi Defense trading value of {unit.value.toLocaleString()} Gems.
            This Skibi Defense unit has {unit.demand.toLowerCase()} demand in the trading community
            and the Skibi Defense price is currently {unit.trend.toLowerCase()}.
            It can be obtained from {unit.obtainedFrom} in Skibi Defense.
          </p>
          {unit.traits && unit.traits.length > 0 && (
            <p>
              This Skibi Defense unit has the following traits: {unit.traits.join(", ")}.
              {unit.dps && ` ${unit.name} deals ${unit.dps} DPS in Skibi Defense battles.`}
            </p>
          )}
          {unit.shinyValue && (
            <p>
              The shiny variant of {unit.name} in Skibi Defense is worth {unit.shinyValue.toLocaleString()} Gems,
              which is {Math.round((unit.shinyValue / unit.value) * 100)}% more valuable than the normal version.
              {unit.shinyExists && ` Only ${unit.shinyExists.toLocaleString()} shiny Skibi Defense versions exist.`}
            </p>
          )}
          <p>
            Use our Skibi Defense trade calculator to compare {unit.name} trades.
            Check the Skibi Defense value list for more unit prices.
          </p>
        </div>
      </section>
    </div>
  );
}
