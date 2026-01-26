import { Piece, SetType } from "@/sections/domain/memoryFragment/MemoryFragment";

export interface MemoryFragmentSet {
    id: string;
    set: SetType;
    name: string;
    effect: string;
    require: number;
    img: string;
}

export const MF_SETS: MemoryFragmentSet[] = [
    {
        id: "atk_set",
        set: SetType.ATK,
        name: "Black Wing",
        effect: "+12% Attack",
        require: 2,
        img: "/mf/atk/1.png"
    },
    {
        id: "def_set",
        set: SetType.DEF,
        name: "Tetra's Authority",
        effect: "+12% Defense",
        require: 2,
        img: "/mf/def/1.png"
    },
    {
        id: "hp_set",
        set: SetType.HP,
        name: "Healer's Journey",
        effect: "+12% Max HP",
        require: 2,
        img: "/mf/hp/1.png"
    },
    {
        id: "critd_set",
        set: SetType.CRIT_DAMAGE,
        name: "Executioner's Tool",
        effect: "+25% Crit Damage",
        require: 2,
        img: "/mf/critd/1.png"
    },
    {
        id: "scrab_set",
        set: SetType.SCRAB,
        name: "Seth's Scarab",
        effect: "Increase the damage, Shield, and Healing of Basic Cards by 20%",
        require: 2,
        img: "/mf/scrab/1.png"
    },
    {
        id: "agony_set",
        set: SetType.AGONY,
        name: "Cursed Corpse",
        effect: "Increases damage dealt to targets inflicted with Agony by 10%",
        require: 2,
        img: "/mf/agony/1.png"
    },
    {
        id: "loj_set",
        set: SetType.LINE_OF_JUSTICE,
        name: "Line of Justice",
        effect: "+20% Critical Chance of cards that cost 2 or more",
        require: 4,
        img: "/mf/loj/1.png"
    },
    {
        id: "voidoff_set",
        set: SetType.VOID_OFFERING,
        name: "Offering of the Void",
        effect: "When a card is Exhausted, increase Damage Amount of Void Cards by 20% for 1 turn",
        require: 4,
        img: "/mf/voidoff/1.png"
    },
    {
        id: "voidorb_set",
        set: SetType.VOID_ORB,
        name: "Orb of Inhibition",
        effect: "When hitting 2 times with 1 Attack Card, +10% Damage Amount to Void Cards for 1 turn (2 times per turn)",
        require: 4,
        img: "/mf/voidorb/1.png"
    },
    {
        id: "instjud_set",
        set: SetType.INSTINCT_JUDGMENT,
        name: "Judgment's Flames",
        effect: "+50% Damage Amount to Instinct Cards used against Ravaged targets",
        require: 4,
        img: "/mf/instjud/1.png"
    },
    {
        id: "conqcrit_set",
        set: SetType.CONQUEROR_CRIT,
        name: "Conqueror's Aspect",
        effect: "+35% Critical Damage of 1-cost cards",
        require: 4,
        img: "/mf/conqcrit/1.png"
    },
    {
        id: "ordbull_set",
        set: SetType.ORDER_BULLET,
        name: "Bullet of Order",
        effect: "When Attack Cards are used, increase Damage Amount of Order Cards by 10% for 1 turn (max 2 times)",
        require: 4,
        img: "/mf/ordbull/1.png"
    },
    {
        id: "instgrow_set",
        set: SetType.INSTINCT_GROWTH,
        name: "Instinctual Growth",
        effect: "When there are 4 or more cards in hand, increase Damage Amount of Instinct Cards by 20%",
        require: 4,
        img: "/mf/instgrow/1.png"
    },
    {
        id: "passpark_set",
        set: SetType.PASSION_SPARK,
        name: "Spark of Passion",
        effect: "When Upgrade Cards are used, increase Damage Amount of the next 5 Passion Cards used by 20%",
        require: 4,
        img: "/mf/passpark/1.png"
    }
];

export interface PieceType {
    id: string;
    piece: Piece;
    roman: string;
}

export const PIECE_TYPES = [
    {
        id: "piece_1",
        piece: Piece.I,
        roman: "I"
    },
    {
        id: "piece_2",
        piece: Piece.II,
        roman: "II"
    },
    {
        id: "piece_3",
        piece: Piece.III,
        roman: "III"
    },
    {
        id: "piece_4",
        piece: Piece.IV,
        roman: "IV"
    },
    {
        id: "piece_5",
        piece: Piece.V,
        roman: "V"
    },
    {
        id: "piece_6",
        piece: Piece.VI,
        roman: "VI"
    }
];
