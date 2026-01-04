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

export type PairStat = Partial<Record<Stat, number>>;
export type PairSubStat = Partial<Record<SubStat, number>>;

export interface IMemoryFragment {
    id: string;
    setType: SetType;
    piece: Piece;
    roman: string;
    rarity: Rarity;
    level: number;
    img: string;
    mainStat: PairStat;
    subStats: [PairSubStat?, PairSubStat?, PairSubStat?, PairSubStat?];
    description?: string;
}

export abstract class MemoryFragment implements IMemoryFragment {
    readonly id: string;
    readonly img: string;
    setType: SetType;
    piece: Piece;
    roman: string;
    rarity: Rarity;
    level: number;
    mainStat: PairStat;
    subStats: [PairSubStat?, PairSubStat?, PairSubStat?, PairSubStat?];
    description?: string;

    constructor(setType: SetType, piece: Piece, rarity: Rarity) {
        this.setType = setType;
        this.piece = piece;
        this.roman = Piece[piece];
        this.rarity = rarity;
        this.level = rarity === Rarity.RARE ? 4 : 5;
        this.subStats = [];
        this.id = `MF-${this.roman}-${this.setType}-${Date.now()}`;
        this.img = `/mf/${this.setType}/${this.piece}.png`;
        
        this.mainStat = this.initializeMainStat();
    }

    protected abstract initializeMainStat(): PairStat;

    abstract getMemoryFragment(): IMemoryFragment;
    abstract getPossibleStats(): Stat[];
    abstract getPossibleSubStats(): SubStat[];
}