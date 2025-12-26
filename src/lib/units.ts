import unitsData from "@/data/units.json";
import { Unit, Rarity } from "@/types/unit";

export function getUnits(): Unit[] {
  return unitsData as Unit[];
}

export function getUnitBySlug(slug: string): Unit | undefined {
  return (unitsData as Unit[]).find((unit) => unit.slug === slug);
}

export function getUnitsByGame(game: "skibi-defense" | "toilet-tower-defense"): Unit[] {
  return (unitsData as Unit[]).filter((unit) => unit.game === game);
}

export function formatValue(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
}

export function getRarityColor(rarity: Rarity | string): string {
  switch (rarity) {
    case "Diamond":
      return "text-cyan-400 border-cyan-500 bg-cyan-500/10";
    case "Godly":
      return "text-yellow-400 border-yellow-500 bg-yellow-500/10";
    case "Cursed":
      return "text-purple-900 border-purple-800 bg-purple-900/20";
    case "Secret":
      return "text-red-400 border-red-500 bg-red-500/10";
    case "Event":
      return "text-pink-400 border-pink-500 bg-pink-500/10";
    case "Ultimates":
      return "text-amber-500 border-amber-600 bg-amber-600/10";
    case "Celestials":
      return "text-sky-300 border-sky-400 bg-sky-400/10";
    case "Exclusives":
      return "text-emerald-400 border-emerald-500 bg-emerald-500/10";
    case "Mythic":
      return "text-fuchsia-400 border-fuchsia-500 bg-fuchsia-500/10";
    case "Legendary":
      return "text-orange-400 border-orange-500 bg-orange-500/10";
    case "Epic":
      return "text-violet-400 border-violet-500 bg-violet-500/10";
    case "Rare":
      return "text-blue-400 border-blue-500 bg-blue-500/10";
    case "Uncommon":
      return "text-green-400 border-green-500 bg-green-500/10";
    case "Common":
      return "text-gray-400 border-gray-500 bg-gray-500/10";
    case "Grandmaster":
      return "text-rose-400 border-rose-500 bg-rose-500/10";
    case "Evolution":
      return "text-indigo-400 border-indigo-500 bg-indigo-500/10";
    case "Cosmics":
    case "Cosmic":
      return "text-purple-400 border-purple-500 bg-purple-500/10";
    case "ASTRAL":
      return "text-blue-300 border-blue-400 bg-blue-400/10";
    case "Divine":
      return "text-amber-300 border-amber-400 bg-amber-400/10";
    default:
      return "text-gray-400 border-gray-500 bg-gray-500/10";
  }
}

export function getRarityBgColor(rarity: Rarity | string): string {
  switch (rarity) {
    case "Diamond":
      return "bg-gradient-to-r from-cyan-600 to-cyan-400";
    case "Godly":
      return "bg-gradient-to-r from-yellow-600 to-yellow-400";
    case "Cursed":
      return "bg-gradient-to-r from-purple-950 to-purple-800";
    case "Secret":
      return "bg-gradient-to-r from-red-600 to-red-400";
    case "Event":
      return "bg-gradient-to-r from-pink-600 to-pink-400";
    case "Ultimates":
      return "bg-gradient-to-r from-amber-700 to-amber-500";
    case "Celestials":
      return "bg-gradient-to-r from-sky-500 to-sky-300";
    case "Exclusives":
      return "bg-gradient-to-r from-emerald-600 to-emerald-400";
    case "Mythic":
      return "bg-gradient-to-r from-fuchsia-600 to-fuchsia-400";
    case "Legendary":
      return "bg-gradient-to-r from-orange-600 to-orange-400";
    case "Epic":
      return "bg-gradient-to-r from-violet-600 to-violet-400";
    case "Rare":
      return "bg-gradient-to-r from-blue-600 to-blue-400";
    case "Uncommon":
      return "bg-gradient-to-r from-green-600 to-green-400";
    case "Common":
      return "bg-gradient-to-r from-gray-600 to-gray-400";
    case "Grandmaster":
      return "bg-gradient-to-r from-rose-600 to-rose-400";
    case "Evolution":
      return "bg-gradient-to-r from-indigo-600 to-indigo-400";
    case "Cosmics":
    case "Cosmic":
      return "bg-gradient-to-r from-purple-600 to-purple-400";
    case "ASTRAL":
      return "bg-gradient-to-r from-blue-500 to-blue-300";
    case "Divine":
      return "bg-gradient-to-r from-amber-500 to-amber-300";
    default:
      return "bg-gradient-to-r from-gray-600 to-gray-400";
  }
}

export function getDemandColor(demand: string): string {
  switch (demand) {
    case "Very High":
      return "text-emerald-400";
    case "High":
      return "text-green-400";
    case "Normal":
      return "text-gray-400";
    case "Low":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export function getTrendIcon(trend: string): { icon: string; color: string } {
  switch (trend) {
    case "Rising":
      return { icon: "↑↑", color: "text-green-400" };
    case "Slowly Rising":
      return { icon: "↑", color: "text-emerald-400" };
    case "Stable":
      return { icon: "→", color: "text-gray-400" };
    case "Dropping":
      return { icon: "↓", color: "text-red-400" };
    case "Unstable":
      return { icon: "↕", color: "text-yellow-400" };
    case "Overpaid":
      return { icon: "💰", color: "text-green-300" };
    case "Underpaid":
      return { icon: "📉", color: "text-orange-400" };
    default:
      return { icon: "→", color: "text-gray-400" };
  }
}

export function getDemandScoreColor(score: number): string {
  if (score >= 9) return "text-emerald-400";
  if (score >= 7) return "text-green-400";
  if (score >= 5) return "text-yellow-400";
  if (score >= 3) return "text-orange-400";
  return "text-red-400";
}

export const RARITY_ORDER: Rarity[] = [
  "ASTRAL",
  "Cosmic",
  "Cosmics",
  "Grandmaster",
  "Evolution",
  "Diamond",
  "Divine",
  "Godly",
  "Cursed",
  "Secret",
  "Event",
  "Ultimates",
  "Celestials",
  "Exclusives",
  "Mythic",
  "Legendary",
  "Epic",
  "Rare",
  "Uncommon",
  "Common",
];

export function sortByRarity(a: Unit, b: Unit): number {
  return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
}
