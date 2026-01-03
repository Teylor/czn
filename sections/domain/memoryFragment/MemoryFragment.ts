export enum SetType { // TODO add all sets
    ATK = "atk",
    DEF = "def",
    HP = "hp"
}

export enum Rarity {
    RARE = "rare",
    LEGENDARY = "legendary",
}

export enum Piece {
    I = 1,
    II = 2,
    III = 3,
    IV = 4,
    V = 5,
    VI = 6
}

export enum Stat {
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

export enum SubStat {
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

export interface BaseMemoryFragment { /* TODO remove ? */
    id: string;
    setType: SetType;
    piece: number;
    roman: string;
    rarity: Rarity;
    level: number; // TODO
    description?: string;
    img?: string;
    mainStat: RStat;
    subStats: [RSubStat?, RSubStat?, RSubStat?, RSubStat?];
    getID(): string;
    getMemoryFragment(): BaseMemoryFragment;
    getMainStatType?(): string;
    getMainStatValue?(): number;
    getPossibleStats?(): Stat[];
    getPossibleSubStats(): SubStat[];
    getSubStats(): [RSubStat?, RSubStat?, RSubStat?, RSubStat?];
    setMainStat(newMainStat: Stat, newValue: number): void;
    setNewSubstat(index: number, newSubstat: Partial<SubStat>, newValue: number): void;
}

export type RStat = Partial<Record<Stat, number>>;
export type RSubStat = Partial<Record<SubStat, number>>;

export interface IMemoryFragment extends BaseMemoryFragment {
    mainStat: RStat;
    subStats: [RSubStat?, RSubStat?, RSubStat?, RSubStat?];
}

export interface IIMemoryFragment extends BaseMemoryFragment {
    mainStat: RStat;
    subStats: [RSubStat, RSubStat, RSubStat?, RSubStat?];
}

export interface IIIMemoryFragment extends BaseMemoryFragment {
    mainStat: RStat;
    subStats: [RSubStat, RSubStat, RSubStat?, RSubStat?];
}

export interface IVMemoryFragment extends BaseMemoryFragment {
    mainStat: RStat;
    subStats: [RSubStat, RSubStat, RSubStat?, RSubStat?];
}

export interface VMemoryFragment extends BaseMemoryFragment {
    mainStat: RStat;
    subStats: [RSubStat, RSubStat, RSubStat?, RSubStat?];
}

export interface VIMemoryFragment extends BaseMemoryFragment {
    mainStat: RStat;
    subStats: [RSubStat, RSubStat, RSubStat?, RSubStat?];
}

export class IMemoryFragment implements IMemoryFragment {
    constructor(setType: SetType, rarity: Rarity) { // TODO decide if start with 4 ¿?
        this.id = `I-MF-${setType}-${Date.now()}`;
        this.img = `/mf/${setType}/1.png`;
        this.setType = setType;
        this.piece = 1;
        this.roman = "I";
        this.rarity = rarity;
        this.level = rarity == Rarity.RARE ? 2 : 3;
        this.mainStat =  {[Stat.ATTACK]: 0};
        this.subStats = []
    }

    getID(): string {
        return this.id;
    }

    getMemoryFragment(): BaseMemoryFragment { // TODO test
        return this;
    }

    getMainStatType(): string {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[0].toString();
    }

    getMainStatValue(): number {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[1];
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.ATTACK,
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        return [
            SubStat.DEFENSE,
            SubStat.HP,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
    }

    getSubStats(): [RSubStat?, RSubStat?, RSubStat?, RSubStat?] {
        return this.subStats;
    }

    setMainStat(newMainStat: Stat, newValue: number): void {
        this.mainStat = { [newMainStat]: newValue };
    }

    setNewSubstat(index: number, newSubstat: Partial<SubStat>, newValue: number): void {
        /* if (this.subStats.length >= 4 || index < 0 || index > 3) {
            throw new Error("All substat slots are already filled.");
        } */

        this.subStats[index] = { [newSubstat]: newValue };
    };
}

export class IIMemoryFragment implements IIMemoryFragment {
    constructor(setType: SetType, rarity: Rarity) { // TODO decide if start with 4¿?
        this.id = `II-MF-${setType}-${Date.now()}`;
        this.img = `/mf/${setType}/2.png`;
        this.setType = setType;
        this.piece = 2;
        this.roman = "II";
        this.rarity = rarity;
        this.level = rarity == Rarity.RARE ? 2 : 3;
        this.mainStat =  {[Stat.DEFENSE]: 0};
    }

    getID(): string {
        return this.id;
    }

    getMemoryFragment(): IIMemoryFragment { // TODO test
        return this;
    }

    getMainStatType(): string {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[0].toString();
    }

    getMainStatValue(): number {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[1];
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.DEFENSE,
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        return [
            SubStat.ATTACK,
            SubStat.HP,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
    }

    getSubStats(): [RSubStat, RSubStat, RSubStat?, RSubStat?] {
        return this.subStats;
    }

    setNewSubstat(index: number, newSubstat: Partial<SubStat>, newValue: number): void {
        if (this.subStats.length >= 4 || index < 0 || index > 3) {
            throw new Error("All substat slots are already filled.");
        }

        this.subStats[index] = { [newSubstat]: newValue };
    };
}

export class IIIMemoryFragment implements IIIMemoryFragment {
    constructor(setType: SetType, rarity: Rarity) { // TODO decide if start with 4¿?
        this.id = `III-MF-${setType}-${Date.now()}`;
        this.img = `/mf/${setType}/3.png`;
        this.setType = setType;
        this.piece = 3;
        this.roman = "III";
        this.rarity = rarity;
        this.level = rarity == Rarity.RARE ? 2 : 3;
        this.mainStat =  {[Stat.DEFENSE]: 0};
    }

    getID(): string {
        return this.id;
    }

    getMemoryFragment(): IIIMemoryFragment { // TODO test
        return this;
    }

    getMainStatType(): string {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[0].toString();
    }

    getMainStatValue(): number {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[1];
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.DEFENSE,
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        return [
            SubStat.ATTACK,
            SubStat.DEFENSE,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
    }

    getSubStats(): [RSubStat, RSubStat, RSubStat?, RSubStat?] {
        return this.subStats;
    }

    setNewSubstat(index: number, newSubstat: Partial<SubStat>, newValue: number): void {
        if (this.subStats.length >= 4 || index < 0 || index > 3) {
            throw new Error("All substat slots are already filled.");
        }

        this.subStats[index] = { [newSubstat]: newValue };
    };
}

export class IVMemoryFragment implements IVMemoryFragment {
    constructor(setType: SetType, rarity: Rarity) { // TODO decide if start with 4¿?
        this.id = `IV-MF-${setType}-${Date.now()}`;
        this.img = `/mf/${setType}/4.png`;
        this.setType = setType;
        this.piece = 4;
        this.roman = "IV";
        this.rarity = rarity;
        this.level = rarity == Rarity.RARE ? 2 : 3;
    }

    getID(): string {
        return this.id;
    }

    getMemoryFragment(): IVMemoryFragment { // TODO test
        return this;
    }

    getMainStatType(): string {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[0].toString();
    }

    getMainStatValue(): number {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[1];
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.DEFENSE,
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        return [
            SubStat.ATTACK,
            SubStat.DEFENSE,
            SubStat.HP,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
    }

    getSubStats(): [RSubStat, RSubStat, RSubStat?, RSubStat?] {
        return this.subStats;
    }

    setNewSubstat(index: number, newSubstat: Partial<SubStat>, newValue: number): void {
        if (this.subStats.length >= 4 || index < 0 || index > 3) {
            throw new Error("All substat slots are already filled.");
        }

        this.subStats[index] = { [newSubstat]: newValue };
    };
}

export class VMemoryFragment implements VMemoryFragment {
    constructor(setType: SetType, rarity: Rarity) { // TODO decide if start with 4¿?
        this.id = `V-MF-${setType}-${Date.now()}`;
        this.img = `/mf/${setType}/5.png`;
        this.setType = setType;
        this.piece = 5;
        this.roman = "V";
        this.rarity = rarity;
        this.level = rarity == Rarity.RARE ? 2 : 3;
    }

    getID(): string {
        return this.id;
    }

    getMemoryFragment(): VMemoryFragment { // TODO test
        return this;
    }

    getMainStatType(): string {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[0].toString();
    }

    getMainStatValue(): number {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[1];
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.DEFENSE,
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        return [
            SubStat.ATTACK,
            SubStat.DEFENSE,
            SubStat.HP,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
    }

    getSubStats(): [RSubStat, RSubStat, RSubStat?, RSubStat?] {
        return this.subStats;
    }

    setNewSubstat(index: number, newSubstat: Partial<SubStat>, newValue: number): void {
        if (this.subStats.length >= 4 || index < 0 || index > 3) {
            throw new Error("All substat slots are already filled.");
        }

        this.subStats[index] = { [newSubstat]: newValue };
    };
}

export class VIMemoryFragment implements VIMemoryFragment {
    constructor(setType: SetType, rarity: Rarity) { // TODO decide if start with 4¿?
        this.id = `VI-MF-${setType}-${Date.now()}`;
        this.img = `/mf/${setType}/6.png`;
        this.setType = setType;
        this.piece = 6;
        this.roman = "VI";
        this.rarity = rarity;
        this.level = rarity == Rarity.RARE ? 2 : 3;
    }

    getID(): string {
        return this.id;
    }

    getMemoryFragment(): VIMemoryFragment { // TODO test
        return this;
    }

    getMainStatType(): string {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[0].toString();
    }

    getMainStatValue(): number {
        const entry = Object.entries(this.mainStat)[0] as [Stat, number];
        return entry?.[1];
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.DEFENSE,
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        return [
            SubStat.ATTACK,
            SubStat.DEFENSE,
            SubStat.HP,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
    }

    getSubStats(): [RSubStat, RSubStat, RSubStat?, RSubStat?] {
        return this.subStats;
    }

    setMainStat(newMainStat: Stat, newValue: number): void {
        this.mainStat = { [newMainStat]: newValue };
    }

    setNewSubstat(index: number, newSubstat: Partial<SubStat>, newValue: number): void {
        if (this.subStats.length >= 4 || index < 0 || index > 3) {
            throw new Error("All substat slots are already filled.");
        }

        this.subStats[index] = { [newSubstat]: newValue };
    };
}