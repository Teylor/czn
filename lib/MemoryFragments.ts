import { SetType } from "@/sections/domain/memoryFragment/MemoryFragment";

export const MF_SETS = [
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
        id: "loj_set",
        set: SetType.LINE_OF_JUSTICE,
        name: "Line of Justice",
        effect: "",
        require: 4,
        img: "/mf/loj/1.png"
    }
];

export const PIECE_TYPES = [
    {
        id: "piece_1",
        piece: 1,
        roman: "I"
    },
    {
        id: "piece_2",
        piece: 2,
        roman: "II"
    },
    {
        id: "piece_3",
        piece: 3,
        roman: "III"
    },
    {
        id: "piece_4",
        piece: 4,
        roman: "IV"
    },
    {
        id: "piece_5",
        piece: 5,
        roman: "V"
    },
    {
        id: "piece_6",
        piece: 6,
        roman: "VI"
    }
];