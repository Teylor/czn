import { CombatantType } from "@/sections/domain/combatant/Combatant"


export interface CommonSetCard {
    id: string;
    img: string;
    name: string;
    effect: string;
    cost: number;
    type: CardType;
    combatantTypes: CombatantType[];
    tags?: CardTag[];
    enableCommon?: boolean;
    common?: string;
    divine?: string;
}

export interface BasicSetCard {
    id: string;
    combatantId: string;
    img: string;
    name: string;
    effect: string;
    cost: number;
    type: CardType;
    tags?: CardTag[];
    epiphany?: string;
    enableCommon?: boolean;
    common?: string;
    divine?: string;
}

export interface DivineEpiphany {
    id: string;
    name: string;
    effect: string;
}

export enum CardType {
    ATTACK = "Attack",
    SKILL = "Skill",
    UPGRADE = "Upgrade",
}

export enum CardTag {
    RETAIN = "Retain",
    EXHAUST = "Exhaust",
    EXHAUST_2 = "Exhaust 2",
    UNIQUE = "Unique",
}

export interface Epiphany {
    id: string;
    cardId: string;
    cardName: string;
    name: string;
    effect: string;
    cost: number;
    type: CardType;
    tags?: CardTag[];
}

export const COMMON_CARDS: CommonSetCard[] = [
    {
        id: "common_card1",
        img: "/cards/common/abyssalization.png",
        name: "Abyssalization",
        effect: "10% HP Reduction +30% Damage to next Attack Card used Cannot be used if HP is 10% or less",
        combatantTypes: [],
        cost: 1,
        type: CardType.SKILL,
        enableCommon: true,
    },
    {
        id: "common_card2",
        img: "/cards/common/acid_gas.png",
        name: "Acid Gas",
        effect: "2 Impair to all enemies",
        combatantTypes: [CombatantType.RANGER, CombatantType.HUNTER],
        cost: 1,
        type: CardType.SKILL,
        enableCommon: true,
    }
]

export const MONSTER_CARDS: CommonSetCard[] = [
    {
        id: "monster_card1",
        img: "/cards/monster/abyssal_bug.png",
        name: "Abyssal Bug",
        effect: "-1 Morale -3 Resolve",
        cost: 0,
        type: CardType.SKILL,
        combatantTypes: [],
        enableCommon: true,
    },
]

export const FORBIDDEN_CARDS: CommonSetCard[] = [
    {
        id: "forbidden_card1",
        img: "/cards/forbidden/eternal_hunger.png",
        name: "Eternal Hunger",
        effect: "Attunement: Draw 1, +1 AP",
        cost: 0,
        type: CardType.SKILL,
        combatantTypes: [],
        enableCommon: false,
    },
]

export const COMMON_EPIPHANIES = [
    {
        id: "common_epi_1",
        name: "Draw",
        effect: "Draw 1 card",
    },
    {
        id: "common_epi_2",
        name: "Agony",
        effect: "Apply 2 Agony at the start of turn",
    },
]

export const DIVINE_EPIPHANIES: DivineEpiphany[] = [
    {
        id: "divine_epi_1",
        name: "AP",
        effect: "1 AP",
    },
    {
        id: "divine_epi_2",
        name: "Reduce",
        effect: "Reduce cost by 1",
    }
]

const BERYL_BASIC_SET: BasicSetCard[] = [
    {
        id: "beryl_card_1",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/launcher.png",
        name: "Launcher",
        effect: "100% Damage",
        cost: 1,
        type: CardType.ATTACK,
    },
    {
        id: "beryl_card_2",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/charge_launcher.png",
        name: "Charge Launcher",
        effect: "220% Damage",
        cost: 2,
        type: CardType.ATTACK,
    },
    {
        id: "beryl_card_3",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/barrier.png",
        name: "Barrier",
        effect: "100% Shield",
        cost: 1,
        type: CardType.SKILL,
    },
    {
        id: "beryl_card_4",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/opening_found.png",
        name: "Opening Found",
        effect: "120% Damage Retain: +1 hit(s) for 1 turn",
        enableCommon: true,
        cost: 1,
        type: CardType.ATTACK,
        tags: [CardTag.RETAIN],
    },
    {
        id: "beryl_card_5",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/charged_shot.png",
        name: "Charged Shot",
        effect: "200% Damage Retain: Damage +80%",
        enableCommon: true,
        cost: 2,
        type: CardType.ATTACK,
        tags: [CardTag.RETAIN],
    },
    {
        id: "beryl_card_6",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/guilty_pleasure.png",
        name: "Guilty Pleasure",
        effect: "Draw 3",
        enableCommon: true,
        cost: 0,
        type: CardType.SKILL,
        tags: [CardTag.EXHAUST],
    },
    {
        id: "beryl_card_7",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/unlimited_firepower.png",
        name: "Unlimited Firepower",
        effect: "+100 Shield +80% Damage of next Attack Card used",
        enableCommon: true,
        cost: 1,
        type: CardType.SKILL,
    },
        {
        id: "beryl_card_8",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/heavy_weapons_specialist.png",
        name: "Heavy Weapons Specialist",
        effect: "Create 1 Opening Found or Charged Shot card, grant it Exhaust, cost -1 until used",
        cost: 1,
        type: CardType.SKILL,
    },
]

const BERYL_EPIPHANIES: Record<string, Epiphany[]> = {
    beryl_card_4: [
        {
            id: "beryl_card_4_epi_0",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 0",
            effect: "120% Damage Retain: +1 hit(s) for 1 turn",
            cost: 1,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_4_epi_1",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 1",
            effect: "180% Damage Retain: +1 hit(s) for 1 turn",
            cost: 1,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_4_epi_2",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 2",
            effect: "225% Damage Retain: Change cost to 0",
            cost: 1,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_4_epi_3",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 3",
            effect: "100% Damage Retain: +2 hit(s) for 1 turn",
            cost: 1,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_4_epi_4",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 4",
            effect: "150% Damage Retain: +60% Damage",
            cost: 1,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_4_epi_5",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 5",
            effect: "When own card is Retained, +150% Extra Attack to random enemies",
            cost: 1,
            type: CardType.UPGRADE,
        }
    ],
    beryl_card_5: [
        {
            id: "beryl_card_5_epi_0",
            cardId: "beryl_card_5",
            cardName: "Charged Shot",
            name: "Epiphany 0",
            effect: "200% Damage Retain: Damage +80%",
            cost: 2,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_5_epi_1",
            cardId: "beryl_card_5",
            cardName: "Charged Shot",
            name: "Epiphany 1",
            effect: "300% Damage Retain: Damage +120%",
            cost: 2,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_5_epi_2",
            cardId: "beryl_card_5",
            cardName: "Charged Shot",
            name: "Epiphany 2",
            effect: "2000% Damage Combo: +100% Damage amount",
            cost: 1,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_5_epi_3",
            cardId: "beryl_card_5",
            cardName: "Charged Shot",
            name: "Epiphany 3",
            effect: "450% Damage Retain: Reduce cost by 1 until used",
            cost: 3,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_5_epi_4",
            cardId: "beryl_card_5",
            cardName: "Charged Shot",
            name: "Epiphany 4",
            effect: "300% Damage Retain: +160% Damage (Max 1 time)",
            cost: 2,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        },
        {
            id: "beryl_card_5_epi_5",
            cardId: "beryl_card_5",
            cardName: "Charged Shot",
            name: "Epiphany 5",
            effect: "125% Damage x2 Retain: Damage +50% Damage",
            cost: 2,
            type: CardType.ATTACK,
            tags: [CardTag.RETAIN],
        }
    ],
    beryl_card_6: [
        {
            id: "beryl_card_6_epi_0",
            cardId: "beryl_card_6",
            cardName: "Guilty Pleasure",
            name: "Epiphany 0",
            effect: "Draw 3",
            cost: 0,
            type: CardType.SKILL,
            tags: [CardTag.EXHAUST],
        },
        {
            id: "beryl_card_6_epi_1",
            cardId: "beryl_card_6",
            cardName: "Guilty Pleasure",
            name: "Epiphany 1",
            effect: "Draw 3 1 Morale",
            cost: 0,
            type: CardType.SKILL,
            tags: [CardTag.EXHAUST],
        },
        {
            id: "beryl_card_6_epi_2",
            cardId: "beryl_card_6",
            cardName: "Guilty Pleasure",
            name: "Epiphany 2",
            effect: "Draw 3 -1 Cost of 1 random card in hand",
            cost: 0,
            type: CardType.SKILL,
            tags: [CardTag.EXHAUST],
        },
        {
            id: "beryl_card_6_epi_3",
            cardId: "beryl_card_6",
            cardName: "Guilty Pleasure",
            name: "Epiphany 3",
            effect: "Draw 3 At the start of the next turn, Draw 2",
            cost: 0,
            type: CardType.SKILL,
            tags: [CardTag.EXHAUST],
        },
        {
            id: "beryl_card_6_epi_4",
            cardId: "beryl_card_6",
            cardName: "Guilty Pleasure",
            name: "Epiphany 4",
            effect: "Draw 1 Activate Retain effect on all cards in hand",
            cost: 0,
            type: CardType.SKILL,
        },
        {
            id: "beryl_card_6_epi_5",
            cardId: "beryl_card_6",
            cardName: "Guilty Pleasure",
            name: "Epiphany 5",
            effect: "Draw 1 Activate Retain effect on all cards in hand",
            cost: 0,
            type: CardType.SKILL,
            tags: [CardTag.EXHAUST_2, CardTag.UNIQUE],
        }
    ],
    beryl_card_7: [
        {
            id: "beryl_card_7_epi_0",
            cardId: "beryl_card_7",
            cardName: "Unlimited Firepower",
            name: "Epiphany 0",
            effect: "+100 Shield +80% Damage of next Attack Card used",
            cost: 1,
            type: CardType.SKILL,
        },
        {
            id: "beryl_card_7_epi_1",
            cardId: "beryl_card_7",
            cardName: "Unlimited Firepower",
            name: "Epiphany 1",
            effect: "+150 Shield +120% Damage of next Attack Card used",
            cost: 1,
            type: CardType.SKILL,
        },
        {
            id: "beryl_card_7_epi_2",
            cardId: "beryl_card_7",
            cardName: "Unlimited Firepower",
            name: "Epiphany 2",
            effect: "For 1 turn, +80% Attack Card Damage",
            cost: 1,
            type: CardType.SKILL,
        },
        {
            id: "beryl_card_7_epi_3",
            cardId: "beryl_card_7",
            cardName: "Unlimited Firepower",
            name: "Epiphany 3",
            effect: "+160% Damage of next Own Card used",
            cost: 1,
            type: CardType.SKILL,
        },
        {
            id: "beryl_card_7_epi_4",
            cardId: "beryl_card_7",
            cardName: "Unlimited Firepower",
            name: "Epiphany 4",
            effect: "+150 Shield +80% Damage of the next Attack Card",
            cost: 1,
            type: CardType.SKILL,
        },
        {
            id: "beryl_card_7_epi_5",
            cardId: "beryl_card_7",
            cardName: "Unlimited Firepower",
            name: "Epiphany 5",
            effect: "Increase Damage Amount of Attack Cards of this unit by 30%",
            cost: 1,
            type: CardType.UPGRADE,
        }
    ]
}

export const BASIC_SETS: Record<string, BasicSetCard[]> = {
    beryl: BERYL_BASIC_SET,
}

export const COMBATANTS_EPIPHANIES: Record<string, Record<string, Epiphany[]>> = {
    beryl: BERYL_EPIPHANIES,
}
