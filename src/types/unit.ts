export type Rarity =
  | "Diamond"
  | "Godly"
  | "Cursed"
  | "Secret"
  | "Event"
  | "Ultimates"
  | "Celestials"
  | "Exclusives"
  | "Mythic"
  | "Legendary"
  | "Epic"
  | "Rare"
  | "Uncommon"
  | "Common"
  | "Grandmaster"
  | "Evolution"
  | "Cosmics"
  | "Cosmic"
  | "ASTRAL"
  | "Divine";

export type Demand = "Very High" | "High" | "Normal" | "Low";
export type Trend = "Rising" | "Slowly Rising" | "Stable" | "Dropping" | "Unstable" | "Overpaid" | "Underpaid";

export type Unit = {
  id: string;
  name: string;
  slug: string;
  image: string;
  rarity: Rarity;
  value: number;
  demand: Demand;
  demandScore: number; // 1-10
  trend: Trend;
  obtainedFrom: string;
  traits?: string[];
  dps?: string;
  notes?: string;
  shinyValue?: number;
  exists?: number;
  shinyExists?: number;
  game: "skibi-defense" | "toilet-tower-defense";
};

export type Trait = {
  id: string;
  name: string;
  nameCN: string;
  demand: Demand;
  demandScore: number;
  trend: Trend;
};

export type Code = {
  code: string;
  reward: string;
  status: "active" | "expired";
  addedDate: string;
};
