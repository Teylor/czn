export interface Combatant {
    id: string;
    name: string;
    type: string; // TODO type: "striker" | "hunter" | "controller" | "ranger" | "psionic" | "vanguard";
    attribute: string; // attribute: "passion" | "void" | "instinct" | "order" | "justice";
    rarity?: number; // rarity?: 4 | 5;
    ego?: number; // ego?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    level?: number;
    img?: string;
}

export const COMBATANTS = [
  { 
    id: "mika", 
    name: "Mika", 
    type: "controller", 
    attribute: "justice",
    rarity: 4,
  },
  { 
    id: "beryl", 
    name: "Beryl", 
    type: "ranger", 
    attribute: "justice",
    rarity: 4,
  },
];
