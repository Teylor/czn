import { CombatantType } from "@/sections/domain/combatant/Combatant"

export const COMMON_CARDS = [
    {
        id: "quickstr_set",
        img: "/TODO.png",
        name: "Quick Strike",
        effect: "Deal 50% Damage Amount to a single enemy",
        combatantTypes: [CombatantType.STRIKER, CombatantType.RANGER],
    },
]
export const MONSTER_CARDS = [
    {
        id: "quickstr_set",
        img: "/TODO.png",
        name: "Quick Strike",
        effect: "Deal 50% Damage Amount to a single enemy"
    },
]
export const FORBIDDEN_CARDS = [
    {
        id: "quickstr_set",
        img: "/TODO.png",
        name: "Quick Strike",
        effect: "Deal 50% Damage Amount to a single enemy"
    },
]

export const WEAPON_ITEMS = [
    {
        id: "sword_1",
        name: "Bronze Sword",
        img: "",
        effect: "Increases Attack by 5%",
        atk: 5,
    }
]
export const ARMOR_ITEMS = [
    {
        id: "sword_1",
        name: "Bronze Sword",
        img: "",
        effect: "Increases Attack by 5%",
        def: 5,
    }
]
export const RING_ITEMS = [
    {
        id: "sword_1",
        name: "Bronze Sword",
        img: "",
        effect: "Increases Attack by 5%",
        hp: 5,
    }
]

export const COMMON_EPIPHANIES = []
export const DIVINE_EPIPHANIES: DivineEpiphany[] = [
    {
        id: "legendary_epi_1",
        name: "AP",
        effect: "1 AP",
    },
    {
        id: "legendary_epi_2",
        name: "Draw",
        effect: "Draw 1 card",
    },
    {
        id: "legendary_epi_3",
        name: "Reduce",
        effect: "Reduce cost by 1",
    }
]

export interface BasicSetCard {
    id: string;
    combatantId: string;
    img: string;
    name: string;
    effect: string;
    cost: number;
    type: "Attack" | "Skill" | "Upgrade";
    epiphany?: string;
    divine?: string;
}

export interface DivineEpiphany {
    id: string;
    name: string;
    effect: string;
}

export interface Epiphany {
    id: string;
    cardId: string;
    cardName: string;
    name: string;
    effect: string;
    cost: number;
    type: "Attack" | "Skill" | "Upgrade";
}

const BERYL_BASIC_SET: BasicSetCard[] = [
    {
        id: "beryl_card_1",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/launcher.png",
        name: "Launcher",
        effect: "100% Damage",
        cost: 1,
        type: "Attack",
    },
    {
        id: "beryl_card_2",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/charge_launcher.png",
        name: "Charge Launcher",
        effect: "220% Damage",
        cost: 2,
        type: "Attack",
    },
    {
        id: "beryl_card_3",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/barrier.png",
        name: "Barrier",
        effect: "100% Shield",
        cost: 1,
        type: "Skill",
    },
    {
        id: "beryl_card_4",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/opening_found.png",
        name: "Opening Found",
        effect: "180% Damage Retain: +1 hit(s) for 1 turn",
        cost: 1,
        type: "Attack",
    },
    {
        id: "beryl_card_5",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/charged_shot.png",
        name: "Charged Shot",
        effect: "300% Damage Retain: Damage +120%",
        cost: 2,
        type: "Attack",
    },
    {
        id: "beryl_card_6",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/guilty_pleasure.png",
        name: "Guilty Pleasure",
        effect: "Draw 3",
        cost: 0,
        type: "Skill",
    },
    {
        id: "beryl_card_7",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/unlimited_firepower.png",
        name: "Unlimited Firepower",
        effect: "+120% Damage of next Attack Card used",
        cost: 1,
        type: "Skill",
    },
        {
        id: "beryl_card_8",
        combatantId: "beryl",
        img: "/cards/combatants/beryl/heavy_weapons_specialist.png",
        name: "Heavy Weapons Specialist",
        effect: "Create 1 Opening Found or Charged Shot card, grant it Exhaust, cost -1 until used",
        cost: 1,
        type: "Skill",
    },
]

const BERYL_EPIPHANIES: Record<string, Epiphany[]> = {
    beryl_card_4: [
        {
            id: "beryl_card_4_epi_0",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 0",
            effect: "180% Damage Retain: +1 hit(s) for 1 turn",
            cost: 1,
            type: "Attack",
        },
        {
            id: "beryl_card_4_epi_1",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 1",
            effect: "225% Damage Retain: Change cost to 0",
            cost: 1,
            type: "Attack",
        },
        {
            id: "beryl_card_4_epi_2",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 2",
            effect: "100% Damage Retain: +2 hit(s) for 1 turn",
            cost: 1,
            type: "Attack",
        },
        {
            id: "beryl_card_4_epi_3",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 3",
            effect: "150% Damage Retain: +60% Damage",
            cost: 1,
            type: "Attack",
        },
        {
            id: "beryl_card_4_epi_4",
            cardId: "beryl_card_4",
            cardName: "Opening Found",
            name: "Epiphany 4",
            effect: "When own card is Retained, +150% Extra Attack to random enemies",
            cost: 1,
            type: "Upgrade",
        }
    ],
    beryl_card_5: [],
    beryl_card_6: [],
    beryl_card_7: []
}

export const BASIC_SETS: Record<string, BasicSetCard[]> = {
    beryl: BERYL_BASIC_SET,
}

export const COMBATANTS_EPIPHANIES: Record<string, Record<string, Epiphany[]>> = {
    beryl: BERYL_EPIPHANIES,
}
