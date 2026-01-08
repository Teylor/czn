import { ParterType, PartnerRarity } from "@/sections/domain/partner/Partner";

export const PARTNERS = [ // TODO add all partners
  { 
    id: "yuri", 
    name: "Yuri", 
    type: ParterType.HUNTER, 
    rarity: PartnerRarity.THREE_STAR, 
    passive: `The assigned combatant's Attack is increased by 8%.
Upon the first shuffle, the assigned combatant's damage dealt is increased by 8%.`,
    skill: `Draw 2` 
  },
  { 
    id: "yvonne", 
    name: "Yvonne", 
    type: ParterType.CONTROLLER, 
    rarity: PartnerRarity.THREE_STAR, 
    passive: `The assigned combatant's Defense is increased by 8%.
If the combatant ends the turn without using an attack card, Heal 30% at the start of the next turn.`,
    skill: `Heal 100%
1 Fortitude for 1 turn` 
  },
  { 
    id: "douglas", 
    name: "Douglas", 
    type: ParterType.STRIKER, 
    rarity: PartnerRarity.THREE_STAR, 
    passive: `The assigned combatant's attack is increased by 8%.
At the start of the battle, Damage dealt by the assigned combatant increases by 8% for 1 turn.`,
    skill: `120% Damage to all enemies` 
  },
  { 
    id: "zatera", 
    name: "Zatera", 
    type: ParterType.PSIONIC, 
    rarity: PartnerRarity.THREE_STAR, 
    passive: `The assigned combatant's Attack is increased by 8%.
When injured , at the end of battle, recover 4% Health.`,
    skill: `200% Shield` 
  },
  { 
    id: "nakia", 
    name: "Nakia", 
    type: ParterType.RANGER, 
    rarity: PartnerRarity.THREE_STAR, 
    passive: `The reassigned combatant's attack is increased by 8%.
When an ally defeats an enemy, gain Backline Support.
Backline Support: +10% Damage of attack card.
Upon activation, Backline Support is reduced by 1 (up to 3 stacks).`,
    skill: `200% Damage` 
  },
  { 
    id: "raidel", 
    name: "Raidel", 
    type: ParterType.VANGUARD, 
    rarity: PartnerRarity.THREE_STAR, 
    passive: `The combatant's max Health increases by 8%.
If the combatant is in Counterattack state, their Defense-Based Damage increases by 8%.`,
    skill: `100% Shield
1 Counterattack` 
  },
  { 
    id: "akad", 
    name: "Akad", 
    type: ParterType.HUNTER, 
    rarity: PartnerRarity.FOUR_STAR, 
    passive: `The damage of the combatant's Bullet cards increases by 10%.
When the combatant lands their first critical hit, Bullet card damage increases by 12% for 1 turn.`,
    skill: `For 1 turn, +25% Critical Chance of Designated Combatant's Attack cards` 
  },
];
