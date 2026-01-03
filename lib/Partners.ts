export interface Partner {
  id: string;
  name: string;
  type: string; // TODO type: "striker" | "hunter" | "controller" | "ranger" | "psionic" | "vanguard";
  rarity?: number; // rarity?: 3 | 4 | 5;
  passive?: string;
  skill?: string;
  ego?: number; // ego?: 0 | 1 | 2 | 3 | 4;
  level?: number;
  img?: string;
}

export const PARTNERS = [
  { 
    id: "yuri", 
    name: "Yuri", 
    type: "hunter", 
    rarity: 3, 
    passive: `The assigned combatant's Attack is increased by 8%.
Upon the first shuffle, the assigned combatant's damage dealt is increased by 8%.`,
    skill: `Draw 2` 
  },
  { 
    id: "yvonne", 
    name: "Yvonne", 
    type: "controller", 
    rarity: 3, 
    passive: `The assigned combatant's Defense is increased by 8%.
If the combatant ends the turn without using an attack card, Heal 30% at the start of the next turn.`,
    skill: `Heal 100%
1 Fortitude for 1 turn` 
  },
  { 
    id: "douglas", 
    name: "Douglas", 
    type: "striker", 
    rarity: 3, 
    passive: `The assigned combatant's attack is increased by 8%.
At the start of the battle, Damage dealt by the assigned combatant increases by 8% for 1 turn.`,
    skill: `120% Damage to all enemies.` 
  },
];
