"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { UnitImage } from "@/components/unit-image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Unit } from "@/types/unit";
import { formatValue, getRarityColor } from "@/lib/units";

interface UnitSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  units: Unit[];
  onSelect: (unit: Unit) => void;
}

export function UnitSelector({
  open,
  onOpenChange,
  units,
  onSelect,
}: UnitSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredUnits = useMemo(() => {
    if (!search) return units;
    const searchLower = search.toLowerCase();
    return units.filter(
      (unit) =>
        unit.name.toLowerCase().includes(searchLower) ||
        unit.rarity.toLowerCase().includes(searchLower)
    );
  }, [units, search]);

  const handleSelect = (unit: Unit) => {
    onSelect(unit);
    onOpenChange(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select a Unit</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search units..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 mt-2">
          {filteredUnits.map((unit) => (
            <Button
              key={unit.id}
              variant="ghost"
              className="w-full justify-start h-auto p-2 hover:bg-accent"
              onClick={() => handleSelect(unit)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 relative bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <UnitImage
                    src={unit.image}
                    alt={unit.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{unit.name}</div>
                  <div className="text-sm text-yellow-400 font-mono">
                    {formatValue(unit.value)} Gems
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${getRarityColor(unit.rarity)} text-xs`}
                >
                  {unit.rarity}
                </Badge>
              </div>
            </Button>
          ))}
          {filteredUnits.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No units found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
