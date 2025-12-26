"use client";

import { useState, useMemo, Fragment } from "react";
import Link from "next/link";
import { Search, Copy, Check } from "lucide-react";
import { UnitImage } from "@/components/unit-image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Unit, Rarity } from "@/types/unit";
import {
  formatValue,
  getRarityColor,
  getDemandColor,
  getTrendIcon,
  RARITY_ORDER,
} from "@/lib/units";

type SortOption = "value-desc" | "value-asc" | "name-asc" | "name-desc" | "rarity";
type GameFilter = "all" | "skibi-defense" | "toilet-tower-defense";

interface UnitListProps {
  units: Unit[];
}

export function UnitList({ units }: UnitListProps) {
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [gameFilter, setGameFilter] = useState<GameFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("value-desc");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAndSortedUnits = useMemo(() => {
    let result = [...units];

    // Game filter
    if (gameFilter !== "all") {
      result = result.filter((unit) => unit.game === gameFilter);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (unit) =>
          unit.name.toLowerCase().includes(searchLower) ||
          unit.rarity.toLowerCase().includes(searchLower) ||
          unit.traits?.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    // Rarity filter
    if (rarityFilter !== "all") {
      result = result.filter((unit) => unit.rarity === rarityFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "value-desc":
          return b.value - a.value;
        case "value-asc":
          return a.value - b.value;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "rarity":
          return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
        default:
          return 0;
      }
    });

    return result;
  }, [units, search, rarityFilter, gameFilter, sortBy]);

  const copyToClipboard = async (value: number, id: string) => {
    try {
      await navigator.clipboard.writeText(value.toLocaleString());
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  // Get available rarities from the actual data
  const availableRarities = useMemo(() => {
    const rarities = new Set<Rarity>();
    units.forEach((unit) => rarities.add(unit.rarity));
    return RARITY_ORDER.filter((r) => rarities.has(r));
  }, [units]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search units or traits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={gameFilter} onValueChange={(v) => setGameFilter(v as GameFilter)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Game" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Games</SelectItem>
            <SelectItem value="skibi-defense">Skibi Defense</SelectItem>
            <SelectItem value="toilet-tower-defense">Toilet Tower Defense</SelectItem>
          </SelectContent>
        </Select>
        <Select value={rarityFilter} onValueChange={setRarityFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            {availableRarities.map((rarity) => (
              <SelectItem key={rarity} value={rarity}>
                {rarity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as SortOption)}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="value-desc">Value: High to Low</SelectItem>
            <SelectItem value="value-asc">Value: Low to High</SelectItem>
            <SelectItem value="rarity">By Rarity</SelectItem>
            <SelectItem value="name-asc">Name: A-Z</SelectItem>
            <SelectItem value="name-desc">Name: Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredAndSortedUnits.length} of {units.length} units
      </p>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rarity</TableHead>
              <TableHead className="text-right">Value (Gems)</TableHead>
              <TableHead>Demand</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Game</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUnits.map((unit, index) => {
              const trend = getTrendIcon(unit.trend);
              return (
                <Fragment key={unit.id}>
                  <TableRow>
                    <TableCell>
                      <div className="w-12 h-12 relative bg-muted rounded-md overflow-hidden">
                        <UnitImage
                          src={unit.image}
                          alt={unit.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/units/${unit.slug}`}
                        className="font-medium hover:text-yellow-400 transition-colors"
                      >
                        {unit.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getRarityColor(unit.rarity)}
                      >
                        {unit.rarity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-mono text-yellow-400 hover:text-yellow-300 gap-1"
                        onClick={() => copyToClipboard(unit.value, unit.id)}
                      >
                        {formatValue(unit.value)}
                        {copiedId === unit.id ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3 opacity-50" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <span className={getDemandColor(unit.demand)}>
                        {unit.demand}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={trend.color}>
                        {trend.icon} {unit.trend}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {unit.game === "skibi-defense" ? "SD" : "TTD"}
                      </span>
                    </TableCell>
                  </TableRow>
                  {/* Ad Placeholder every 10 rows */}
                  {(index + 1) % 10 === 0 &&
                    index !== filteredAndSortedUnits.length - 1 && (
                      <TableRow key={`ad-${unit.id}`}>
                        <TableCell colSpan={7}>
                          <div className="h-20 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border">
                            Ad Placeholder
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredAndSortedUnits.map((unit, index) => {
          const trend = getTrendIcon(unit.trend);
          return (
            <Fragment key={unit.id}>
              <Card className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 relative bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <UnitImage
                        src={unit.image}
                        alt={unit.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/units/${unit.slug}`}
                          className="font-medium hover:text-yellow-400 transition-colors truncate"
                        >
                          {unit.name}
                        </Link>
                        <Badge
                          variant="outline"
                          className={`${getRarityColor(unit.rarity)} text-xs flex-shrink-0`}
                        >
                          {unit.rarity}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-mono text-lg text-yellow-400 hover:text-yellow-300 gap-1 p-0 h-auto mt-1"
                        onClick={() => copyToClipboard(unit.value, unit.id)}
                      >
                        {formatValue(unit.value)} Gems
                        {copiedId === unit.id ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3 opacity-50" />
                        )}
                      </Button>
                      <div className="flex gap-3 mt-1 text-xs">
                        <span className={getDemandColor(unit.demand)}>
                          {unit.demand} Demand
                        </span>
                        <span className={trend.color}>
                          {trend.icon} {unit.trend}
                        </span>
                        <span className="text-muted-foreground">
                          {unit.game === "skibi-defense" ? "SD" : "TTD"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Ad Placeholder every 10 cards */}
              {(index + 1) % 10 === 0 &&
                index !== filteredAndSortedUnits.length - 1 && (
                  <div
                    key={`ad-mobile-${unit.id}`}
                    className="h-20 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border"
                  >
                    Ad Placeholder
                  </div>
                )}
            </Fragment>
          );
        })}
      </div>

      {/* No results */}
      {filteredAndSortedUnits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No units found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
