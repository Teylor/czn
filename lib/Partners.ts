import { ParterType, PartnerRarity } from "@/sections/domain/partner/Partner";

export const PARTNERS = [
  {
    id: "gaya",
    name: "Gaya",
    type: ParterType.CONTROLLER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Snow Upon the Heart: 
The assigned combatant's Defense is increased by 8% +20% Defense-Based Damage for the assigned combatant's Instinct cards. When using a Unique Attack Card of the assigned Combatant with an original Cost of 6, +20% to Damage Amount of all allies (max 1 stack).`,
    skill: `60% Damage x 4 Draw 1 of this unit's Attack Cards`
  },
  {
    id: "peko",
    name: "Peko",
    type: ParterType.HUNTER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Peko's Multi-Purpose Kit: 
The assigned combatant's Attack is increased by 8%. When the assigned Combatant's card moves from Graveyard to hand, hain 1 [Repairs Complete!]. [Repairs Complete] +10% Damage to Attack Cards of this unit during this battle (max 3 stacks). Increase Damage of the assigned Combatant's Attack Cards that are used against Ravaged targets by 15%.`,
    skill: `When an ally inflicts Ravage, 1 Overclock to the assigned Combatant (1 time per turn). Overclock: +25% Critical Chance for 1 turn.`
  },
  {
    id: "itsuku",
    name: "Itsuku",
    type: ParterType.PSIONIC,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Tranquil Marker: 
The assigned combatant's Attack is increased by 8-16% Every time the assigned Combatant's card stack, +5-10% Attack Card Damage Amount (Max 3 stacks) Every time 1 Attack Card type used by the Assigned Combatant deals 3 Hits, 30-60% Fixed Damage to the target`,
    skill: `200% Damage to all enemies, apply Fierce Winds effect Fierce Winds: +50% Damage Amount to Attack Cards of the assigned Combatant for 1 turn`
  },
  {
    id: "westmacott",
    name: "Westmacott",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Gleaming Deduction: 
Attack cards of the assigned Combatant drawn by their Ability have their Damage increased by 50% for 1 turn. Damage amount of cards with the assigned Combatant's Inspiration increases by 20%`,
    skill: `Move 1 card(s) from hand to Draw Pile  Draw 1 assigned Combatant card(s)`
  },
  {
    id: "solia",
    name: "Solia",
    type: ParterType.RANGER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Spacetime Warp: 
+20 Extra Attack damage of the assigned combatant  When the combatant Draws for the first time each turn using an ability, +10% Attack Card Damage for 1 turn.`,
    skill: `250% Damage  Mark 1`
  },
  {
    id: "janet",
    name: "Janet",
    type: ParterType.HUNTER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Understanding and Ideas: 
+9% Critical Chance of the assigned combatant's attack cards costing 1 or less.  When the assigned combatant uses 5 Bullet cards, generate a random Handgun Bullet card. The generated card deals +50% damage.`,
    skill: `150% Damage to all enemies  For 1 turn, +20% Designated Combatant's Bullet Card Damage`
  },
  {
    id: "eishlen",
    name: "Eishlen",
    type: ParterType.VANGUARD,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Arcane Wave: 
The assigned combatant's Health and shield gain are increased by 8%  When the assigned combatant gains Counterattack, +15% Defense-based Damage.`,
    skill: `100% Shield.  At the end of the turn, retain 50% of Shield`
  },
  {
    id: "nyx",
    name: "Nyx",
    type: ParterType.CONTROLLER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Resonance: 
The assigned combatant's HP and healing are increased by 8%.  When the assigned combatant Draws for the first time each turn using an ability, +8% Damage dealt by allies for 1 turn.`,
    skill: `Discard up to 3 cards, then Draw +1 cards equal to the number discarded`
  },
  {
    id: "anteia",
    name: "Anteia",
    type: ParterType.PSIONIC,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Clairvoyance: 
The assigned combatant's HP and damage are increased by 8%.  When the assigned combatant generates a card, +8% attack card damage for 1 turn.`,
    skill: `180% Damage to all enemies  1 Vulnerable`
  },
  {
    id: "zeta",
    name: "Zeta",
    type: ParterType.VANGUARD,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Deadly Poison: 
The Defense-Based Damage of the assigned combatant's Instinct cards is increased by 15%.  +25% the assigned combatant's Celestial card Defense-based Damage and Shield`,
    skill: `200% Defense-Based Damage  Draws 1 highest-cost card(s)`
  },
  {
    id: "serithea",
    name: "Serithea",
    type: ParterType.HUNTER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Ensemble: 
The Critical Chance of the combatant's attack cards increases by 8%.  When the assigned combatant's attack results in a Critical Hit, +3% Critical Damage. Stacks up to 5 times.`,
    skill: `250% Damage  2 Vulnerable`
  },
  {
    id: "priscilla",
    name: "Priscilla",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Arachnid Domain: 
The assigned combatant's HP and damage are increased by 8%.  +25% Damage dealt by the assigned combatant to targets in Break state.`,
    skill: `Deal 250% Damage.  Apply Weakness Attack to 1 assigned combatant's random Attack cards in hand.`
  },
  {
    id: "bria",
    name: "Bria",
    type: ParterType.PSIONIC,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Check the Instructions: 
When the assigned combatant generates a card, attack card damage is increased by 10% for 1 turn. Stacks up to 3 times.  When the assigned combatant generates a Status ailment card for first time, +25% attack card damage for 1 turn`,
    skill: `From the Discard Pile, Exhaust all Status Ailment (including cards changed from Status Ailment) and Curse cards.  For each card Exhausted, +10% Designated Combatants' Attack card Damage for 1 turn`
  },
  {
    id: "kiara",
    name: "Kiara",
    type: ParterType.HUNTER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Analyze Weakness: 
If there are 10 or more cards in the Graveyard, the assigned combatant's attack card damage is increased by 15%.  When the assigned combatant discards a card, +25% Attack Card Damage for 1 turn`,
    skill: `200% Damage.  +20% Damage by number of cards in Graveyard.`
  },
  {
    id: "scarlet",
    name: "Scarlet",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `The Path to Mastery: 
If a card used immediately before was from the assigned combatant, +15% attack card damage. Stacks up to 2 times and is removed if another combatant's card is used.  When the assigned combatant uses 2 or more cards, they gain Focus.  Focus: Attack card damage of the assigned combatant is increased by 20%.  Remove Focus when another combatant's card is used.`,
    skill: `250% Damage  +10% assigned combatant's attack card damage per buff owned`
  },
  {
    id: "marianne",
    name: "Marianne",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Eyes on the Target: 
The assigned combatant's damage to Breakthrough enemies is increased by 15%.  The assigned combatant's Basic Cards always apply as Weak Point Damage, and +5% Weakness Damage`,
    skill: `350% Damage`
  },
  {
    id: "tina",
    name: "Tina",
    type: ParterType.RANGER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Communication Support: 
Order Attribute's Attack Damage increase by 15%. +25% Extra Attack damage from Targeting Attack Cards.`,
    skill: `Draw 1  Increase the combatant's Extra Attack damage by 30% for 1 turn`
  },
  {
    id: "marin",
    name: "Marin",
    type: ParterType.RANGER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Raging Wave: 
The Extra Attack damage of cards generated by the assigned combatant's abilities increase by 15%.  When the assigned combatant uses a Skill Card, +25% Extra Attack damage for 1 turn.`,
    skill: `200% Damage to all enemies.  Draw 1 skill card.`
  },
  {
    id: "noel",
    name: "Noel",
    type: ParterType.CONTROLLER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Hymn of Blessing: 
+15% the assigned combatant's Retained cards Damage, Shield, and HP.  At the end of the turn, deal Fixed Damage to all enemies equal to 15% for each retained card of the assigned combatant. +5% Damage for enemies with the Instinct attribute.`,
    skill: `Heal 100%  Activate the Retain effect of all cards held by the assigned combatant.`
  },
  {
    id: "erica",
    name: "Erica",
    type: ParterType.VANGUARD,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `No Speeding!: 
The assigned combatant's Counterattack damage increases by 15%.  When the assigned combatant uses a Skill or Upgrade Card, there is a 50% chance to gain Counterattack.`,
    skill: `200% Defense-based Damage to all enemies.  1 Counterattack.  If an enemy's Anticipated Action attack, 1 Counterattack`
  },
  {
    id: "arwen",
    name: "Arwen",
    type: ParterType.CONTROLLER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Starshine Intellect: 
The assigned combatant's HP and healing are increased 8%.  At the start of the turn, gain Ponopoko's Cheer equal to the number of enemies with attack intentions.  Ponopoko's Cheer: Incoming Damage is reduced by 10%  Upon activation, remove Ponopoko's Cheer (stacks up to 3 times)`,
    skill: `Heal 200%  1 Damage Reduction`
  },
  {
    id: "alyssa",
    name: "Alyssa",
    type: ParterType.CONTROLLER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Alchemical Fruits: 
The assigned combatant's Defense is increased by 12%.  At the end of battle, recover 3% Health.`,
    skill: `Heal 100%  +50% Healing amount while in injured state.  1 Morale for 1 turn`
  },
  {
    id: "akad",
    name: "Akad",
    type: ParterType.HUNTER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Self Defense: 
The damage of the combatant's Bullet cards increases by 10%.  When the combatant lands their first critical hit, Bullet card damage increases by 12% for 1 turn.`,
    skill: `For 1 turn, +25% Critical Chance of Designated Combatant's Attack cards`
  },
  {
    id: "daisy",
    name: "Daisy",
    type: ParterType.RANGER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Dowsing: 
The assigned combatant's Additional Attack damage is increased by 10%.  When the assigned combatant Draws for the first time each turn using an ability, there is a 20% chance to gain Morale for 1 turn.`,
    skill: `180% Shield  1 Morale for 1 Turn.`
  },
  {
    id: "wilhelmina",
    name: "Wilhelmina",
    type: ParterType.VANGUARD,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Battle Command: 
The assigned combatant's Defense is increased by 12%.  When the assigned combatant targets a Vulnerable enemy, +10% Defense-based Damage of Attack cards.`,
    skill: `For 1 turn, 2 Morale  For 1 turn, 1 Fortitude`
  },
  {
    id: "rosaria",
    name: "Rosaria",
    type: ParterType.RANGER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Financial Support: 
The assigned combatant's Additional Attack damage is increased by 10%.  When the assigned combatant uses an Upgrade skill or Skill card, 25% chance to gain Morale for 1 turn.`,
    skill: `Draw 1 Enhanced card  If there are no Enhance Cards in the Draw Pile, Draw 1`
  },
  {
    id: "eloise",
    name: "Eloise",
    type: ParterType.PSIONIC,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Technical Support: 
The combatant's attack card damage increases by 10%.  When the combatant first Exhausts a card or first gains a Status Ailment card, their attack card damage increases by 12% for 1 turn.`,
    skill: `For 1 turn, when a card is Exhausted, 1 weaken to a random enemy.`
  },
  {
    id: "rachel",
    name: "Rachel",
    type: ParterType.VANGUARD,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Replenish Energy: 
The assigned combatant's skill card shield gain is increased by 10%.  When the assigned combatant gains Shield, 20% chance to gain 1 Counterattack.`,
    skill: `100% Shield  Draw 1`
  },
  {
    id: "lillian",
    name: "Lillian",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Poltergeist: 
The assigned combatant's attack cards with a cost of 1 or less deal +10% damage.  When the assigned combatant uses a Skill card, +10% attack card damage for 1 turn. Stacks up to 3 times.`,
    skill: `Deal 100% Damage to all enemies.  Draw 1 Attack card from assigned combatant with cost of less than or equal to 1.`
  },
  {
    id: "ritochka",
    name: "Ritochka",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Construction Support: 
The assigned combatant's attack cards with a cost of 1 or less deal +10% damage.  At the start of the turn, 1 of the assigned combatant's attack cards gains +5% damage for every point of the total cost of attack cards.`,
    skill: `For 1 turn, 3 Morale.`
  },
  {
    id: "carroty",
    name: "Carroty",
    type: ParterType.HUNTER,
    rarity: PartnerRarity.FOUR_STAR,
    passive: `Super Carrot Power!: 
At the start of the turn, the damage of 1 attack card increases by 10% for the combatant.  When the combatant generates a card for the first itme, their attack card damage increases by 10% for 1 turn.`,
    skill: `For 1 turn, increase the damage of cards generated by the assigned combatant's abilities for 20%`
  },
  {
    id: "nakia",
    name: "Nakia",
    type: ParterType.RANGER,
    rarity: PartnerRarity.THREE_STAR,
    passive: `Hot-Blooded Soldier: 
The reassigned combatant's attack is increased by 8%.  When an ally defeats an enemy, gain Backline Support.  Backline Support: +10% Damage of attack card.  Upon activation, Backline Support is reduced by 1 (up to 3 stacks).`,
    skill: `200% Damage`
  },
  {
    id: "zatera",
    name: "Zatera",
    type: ParterType.PSIONIC,
    rarity: PartnerRarity.THREE_STAR,
    passive: `Fortune Telling: 
The assigned combatant's Attack is increased by 8%.  When injured , at the end of battle, recover 4% Health.`,
    skill: `200% Shield`
  },
  {
    id: "raidel",
    name: "Raidel",
    type: ParterType.VANGUARD,
    rarity: PartnerRarity.THREE_STAR,
    passive: `Strategic Analysis: 
The combatant's max Health increases by 8%.  If the combatant is in Counterattack state, their Defense-Based Damage increases by 8%.`,
    skill: `100% Shield  1 Counterattack`
  },
  {
    id: "douglas",
    name: "Douglas",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.THREE_STAR,
    passive: `Guard: 
The assigned combatant's attack is increased by 8%.  At the start of the battle, Damage dealt by the assigned combatant increases by 8% for 1 turn.`,
    skill: `120% Damage to all enemies.`
  },
  {
    id: "yuri",
    name: "Yuri",
    type: ParterType.HUNTER,
    rarity: PartnerRarity.THREE_STAR,
    passive: `Cantrip: 
The assigned combatant's Attack is increased by 8%.  Upon the first shuffle, the assigned combatant's damage dealt is increased by 8%.`,
    skill: `Draw 2`
  },
  {
    id: "yvonne",
    name: "Yvonne",
    type: ParterType.CONTROLLER,
    rarity: PartnerRarity.THREE_STAR,
    passive: `Bless: 
The assigned combatant's Defense is increased by 8%.  If the combatant ends the turn without using an attack card, Heal 30% at the start of the next turn.`,
    skill: `Heal 100%  1 Fortitude for 1 turn`
  },
  {
    id: "asteria",
    name: "Asteria",
    type: ParterType.STRIKER,
    rarity: PartnerRarity.FIVE_STAR,
    passive: `Starshine-piercing Lighthouse: 
The assigned combatant's attack cards with a cost of 2 or more deal +25% damage  +10% Damage of the assigned Combatant's Pulverize cards.`,
    skill: `+20% Damage of the next Attack card used by the assigned Combatant for the total cost of all cards in the hand (Max 10)`
  }
];
