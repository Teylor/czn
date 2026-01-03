import { Stat } from "@/sections/domain/memoryFragment/MemoryFragment";

enum PossibleStats {
  ATTACK = "Attack",
  DEFENSE = "Defense",
  HP = "Health",
  ATTACK_PERCENT = "Attack %",
  DEFENSE_PERCENT = "Defense %",
  HP_PERCENT = "Health %",
  CRIT_RATE = "Crit %",
  CRIT_DAMAGE = "Crit Damage",
  EGO_RECOVERY = "Ego Recovery",
  PASSION_DAMAGE = "Passion Damage",
  VOID_DAMAGE = "Void Damage",
  INSTINCT_DAMAGE = "Instinct Damage",
  ORDER_DAMAGE = "Order Damage",
  JUSTICE_DAMAGE = "Justice Damage"
};

enum PossibleSubStats {
  ATTACK = "Attack",
  DEFENSE = "Defense",
  HP = "Health",
  ATTACK_PERCENT = "Attack %",
  DEFENSE_PERCENT = "Defense %",
  HP_PERCENT = "Health %",
  CRIT_RATE = "Crit %",
  CRIT_DAMAGE = "Crit Damage",
  EXTRA_DAMAGE = "Extra Damage",
  DAMAGE_OVER_TIME = "Damage Over Time",
  EGO_RECOVERY = "Ego Recovery"
};

enum FourPossibleStats {
  ATTACK_PERCENT = "Attack %",
  HP_PERCENT = "Health %",
  CRIT_RATE = "Crit %",
  CRIT_DAMAGE = "Crit Damage",
};

export const FOUR_POSSIBLE_STATS = [
  Stat.ATTACK_PERCENT,
  Stat.HP_PERCENT,
  Stat.CRIT_RATE,
  Stat.CRIT_DAMAGE
]

enum FivePossibleStats {
  ATTACK_PERCENT = "Attack %",
  HP_PERCENT = "Health %",
  PASSION_DAMAGE = "Passion Damage",
  VOID_DAMAGE = "Void Damage",
  INSTINCT_DAMAGE = "Instinct Damage",
  ORDER_DAMAGE = "Order Damage",
  JUSTICE_DAMAGE = "Justice Damage"
};

export const FIVE_POSSIBLE_STATS = [
    Stat.ATTACK_PERCENT,
    Stat.HP_PERCENT,
    Stat.PASSION_DAMAGE,
    Stat.VOID_DAMAGE,
    Stat.INSTINCT_DAMAGE,
    Stat.ORDER_DAMAGE,
    Stat.JUSTICE_DAMAGE
]

enum SixPossibleStats {
  ATTACK_PERCENT = "Attack%",
  DEFENSE_PERCENT = "Defense%",
  HP_PERCENT = "Health %",
  EGO_RECOVERY = "Ego Recovery"
};

export const SIX_POSSIBLE_STATS = [
    Stat.ATTACK_PERCENT,
    Stat.DEFENSE_PERCENT,
    Stat.HP_PERCENT,
    Stat.EGO_RECOVERY
]

enum OnePossibleSubStats {
  DEFENSE = "Defense",
  HP = "Health",
  ATTACK_PERCENT = "Attack %",
  DEFENSE_PERCENT = "Defense %",
  HP_PERCENT = "Health %",
  CRIT_RATE = "Crit %",
  CRIT_DAMAGE = "Crit Damage",
  EXTRA_DAMAGE = "Extra Damage",
  DAMAGE_OVER_TIME = "Damage Over Time",
  EGO_RECOVERY = "Ego Recovery"
};

/* export const ONE_POSSIBLE_SUBSTATS = [
    IPossibleSSubStats.DEFENSE,
    PossibleStats.HP,
    PossibleStats.DEFENSE_PERCENT,
    PossibleStats.HP_PERCENT,
    PossibleStats.CRIT_RATE,
    PossibleStats.CRIT_DAMAGE,
    PossibleStats.EXTRA_DAMAGE,
    PossibleStats.DAMAGE_OVER_TIME,
    PossibleStats.EGO_RECOVERY
] */

enum TwoPossibleSubStats {
  ATTACK = "Attack",
  HP = "Health",
  ATTACK_PERCENT = "Attack %",
  DEFENSE_PERCENT = "Defense %",
  HP_PERCENT = "Health %",
  CRIT_RATE = "Crit %",
  CRIT_DAMAGE = "Crit Damage",
  EXTRA_DAMAGE = "Extra Damage",
  DAMAGE_OVER_TIME = "Damage Over Time",
  EGO_RECOVERY = "Ego Recovery"
};

enum ThreePossibleSubStats {
  ATTACK = "Attack",
  DEFENSE = "Defense",
  ATTACK_PERCENT = "Attack %",
  DEFENSE_PERCENT = "Defense %",
  HP_PERCENT = "Health %",
  CRIT_RATE = "Crit %",
  CRIT_DAMAGE = "Crit Damage",
  EXTRA_DAMAGE = "Extra Damage",
  DAMAGE_OVER_TIME = "Damage Over Time",
  EGO_RECOVERY = "Ego Recovery"
};

enum FourPossibleSubStats { // TODO remove if mainStat
  ATTACK = "Attack",
  DEFENSE = "Defense",
  ATTACK_PERCENT = "Attack %",
  DEFENSE_PERCENT = "Defense %",
  HP = "Health",
  HP_PERCENT = "Health %",
  CRIT_RATE = "Crit %",
  CRIT_DAMAGE = "Crit Damage",
  EXTRA_DAMAGE = "Extra Damage",
  DAMAGE_OVER_TIME = "Damage Over Time",
  EGO_RECOVERY = "Ego Recovery"
};

//type Stat = Partial<Record<PossibleStats, number>>;
type OneSubStats = Partial<Record<OnePossibleSubStats, number>>;
type TwoSubStats = Partial<Record<TwoPossibleSubStats, number>>;
type ThreeSubStats = Partial<Record<ThreePossibleSubStats, number>>;
type FourStats = Partial<Record<FourPossibleStats, number>>;
type FourSubStats = Partial<Record<FourPossibleSubStats, number>>;

export enum SetType { // TODO add all sets
    ATK = "atk",
    DEF = "def",
    HP = "hp",
    NULL = ""
}

enum Rarity {
    RARE = "rare",
    LEGENDARY = "legendary",
}

export interface MemoryFragment {
    id: string;
    setT: SetType;
    piece: number;
    /* mainStat: Stat;
    subStats: [PossibleSubStats, PossibleSubStats, PossibleSubStats?, PossibleSubStats?]; */
    rarity?: Rarity;
    description?: string;
    img?: string;
}

export interface OneMemoryFragment extends MemoryFragment {
    id: string;
    setT: SetType;
    piece: 1;
    mainStat: { [PossibleStats.ATTACK]: number };
    subStats?: [OneSubStats, OneSubStats, OneSubStats?, OneSubStats?];
}

export interface TwoMemoryFragment extends MemoryFragment {
    id: string;
    setT: SetType;
    piece: 2;
    mainStat: { [PossibleStats.DEFENSE]: number };
    subStats?: [TwoSubStats, TwoSubStats, TwoSubStats?, TwoSubStats?];
}

export interface ThreeMemoryFragment extends MemoryFragment {
    id: string;
    setT: SetType;
    piece: 3;
    mainStat: { [PossibleStats.HP]: number };
    subStats?: [ThreeSubStats, ThreeSubStats, ThreeSubStats?, ThreeSubStats?];
}

export interface FourMemoryFragment extends MemoryFragment {
    /* id: string;
    setT: SetType; */
    piece: 4;
    roman: "IV";
    mainStat: [FourStats];
    subStats: [FourSubStats, FourSubStats, FourSubStats?, FourSubStats?];
}

export const FRAGMENTS_SETS = [
    {
        id: "atk_set",
        set: SetType.ATK
    },
    {
        id: "def_set",
        set: SetType.DEF
    },
    {
        id: "hp_set",
        set: SetType.HP
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