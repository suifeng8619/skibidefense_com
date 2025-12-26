"use client";

import { useState, useMemo } from "react";
import { Plus, X, ArrowLeftRight } from "lucide-react";
import { UnitImage } from "@/components/unit-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UnitSelector } from "@/components/unit-selector";
import { Unit } from "@/types/unit";
import { formatValue, getRarityColor } from "@/lib/units";

interface SelectedUnit {
  unit: Unit;
  instanceId: string;
}

interface TradeCalculatorProps {
  units: Unit[];
}

export function TradeCalculator({ units }: TradeCalculatorProps) {
  const [yourOffer, setYourOffer] = useState<SelectedUnit[]>([]);
  const [theirOffer, setTheirOffer] = useState<SelectedUnit[]>([]);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<"your" | "their">("your");

  const yourTotal = useMemo(
    () => yourOffer.reduce((sum, item) => sum + item.unit.value, 0),
    [yourOffer]
  );

  const theirTotal = useMemo(
    () => theirOffer.reduce((sum, item) => sum + item.unit.value, 0),
    [theirOffer]
  );

  const difference = theirTotal - yourTotal;
  const percentDiff =
    yourTotal > 0 ? Math.abs(difference / yourTotal) * 100 : 0;

  const getVerdict = () => {
    if (yourTotal === 0 && theirTotal === 0) {
      return { text: "Add units to compare", color: "text-muted-foreground", bg: "bg-muted" };
    }
    if (percentDiff < 10) {
      return { text: "FAIR TRADE", color: "text-gray-400", bg: "bg-gray-500/20" };
    }
    if (difference > 0) {
      return { text: "YOU WIN", color: "text-green-400", bg: "bg-green-500/20" };
    }
    return { text: "YOU LOSE", color: "text-red-400", bg: "bg-red-500/20" };
  };

  const verdict = getVerdict();

  const openSelector = (column: "your" | "their") => {
    setActiveColumn(column);
    setSelectorOpen(true);
  };

  const addUnit = (unit: Unit) => {
    const newItem: SelectedUnit = {
      unit,
      instanceId: `${unit.id}-${Date.now()}`,
    };
    if (activeColumn === "your") {
      setYourOffer([...yourOffer, newItem]);
    } else {
      setTheirOffer([...theirOffer, newItem]);
    }
  };

  const removeUnit = (instanceId: string, column: "your" | "their") => {
    if (column === "your") {
      setYourOffer(yourOffer.filter((item) => item.instanceId !== instanceId));
    } else {
      setTheirOffer(theirOffer.filter((item) => item.instanceId !== instanceId));
    }
  };

  const clearAll = () => {
    setYourOffer([]);
    setTheirOffer([]);
  };

  const OfferColumn = ({
    title,
    items,
    total,
    column,
  }: {
    title: string;
    items: SelectedUnit[];
    total: number;
    column: "your" | "their";
  }) => (
    <Card className="flex-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          {title}
          <span className="text-yellow-400 font-mono text-xl">
            {formatValue(total)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div
            key={item.instanceId}
            className="flex items-center gap-2 p-2 bg-muted/50 rounded-md"
          >
            <div className="w-10 h-10 relative bg-muted rounded-md overflow-hidden flex-shrink-0">
              <UnitImage
                src={item.unit.image}
                alt={item.unit.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{item.unit.name}</div>
              <div className="text-xs text-yellow-400 font-mono">
                {formatValue(item.unit.value)}
              </div>
            </div>
            <Badge
              variant="outline"
              className={`${getRarityColor(item.unit.rarity)} text-xs hidden sm:flex`}
            >
              {item.unit.rarity}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-red-400"
              onClick={() => removeUnit(item.instanceId, column)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={() => openSelector(column)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Verdict Display */}
      <Card className={`${verdict.bg} border-none`}>
        <CardContent className="py-6 text-center">
          <div className={`text-3xl font-bold ${verdict.color}`}>
            {verdict.text}
          </div>
          {(yourTotal > 0 || theirTotal > 0) && (
            <div className="mt-2 text-muted-foreground">
              Difference:{" "}
              <span
                className={
                  difference > 0
                    ? "text-green-400"
                    : difference < 0
                    ? "text-red-400"
                    : "text-gray-400"
                }
              >
                {difference >= 0 ? "+" : ""}
                {formatValue(difference)} Gems
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Offer Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OfferColumn
          title="Your Offer"
          items={yourOffer}
          total={yourTotal}
          column="your"
        />

        {/* Center Arrow - Desktop Only */}
        <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-card p-2 rounded-full border border-border">
            <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Mobile Divider */}
        <div className="flex lg:hidden items-center justify-center py-2">
          <div className="flex-1 border-t border-border" />
          <div className="px-4">
            <ArrowLeftRight className="h-5 w-5 text-muted-foreground rotate-90" />
          </div>
          <div className="flex-1 border-t border-border" />
        </div>

        <OfferColumn
          title="Their Offer"
          items={theirOffer}
          total={theirTotal}
          column="their"
        />
      </div>

      {/* Clear Button */}
      {(yourOffer.length > 0 || theirOffer.length > 0) && (
        <div className="text-center">
          <Button variant="outline" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      )}

      {/* Unit Selector Modal */}
      <UnitSelector
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        units={units}
        onSelect={addUnit}
      />
    </div>
  );
}
