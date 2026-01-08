export enum SetType {
    ATK = "atk",
    DEF = "def",
    HP = "hp",
    CRIT_DAMAGE = "critd",
    SCRAB = "scrab",
    AGONY = "agony",
    LINE_OF_JUSTICE = "loj",
    VOID_OFFERING = "voidoff",
    VOID_ORB = "voidorb",
    INSTINCT_JUDGMENT = "instjud",
    CONQUEROR_CRIT = "conqcrit",
    ORDER_BULLET = "ordbull",
    INSTINCT_GROWTH = 'instgrow',
    PASSION_SPARK = 'passpark',
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
    inTeams?: number[];
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
    inTeams?: number[];

    constructor(setType: SetType, piece: Piece, rarity: Rarity) {
        this.setType = setType;
        this.piece = piece;
        this.roman = Piece[piece];
        this.rarity = rarity;
        this.level = rarity === Rarity.RARE ? 4 : 5;
        this.subStats = [];
        this.inTeams = [];
        this.id = `MF-${this.roman}-${this.setType}-${Date.now()}`;
        this.img = `/mf/${this.setType}/${this.piece}.png`;
        
        this.mainStat = this.initializeMainStat();
    }

    protected abstract initializeMainStat(): PairStat;

    abstract getMemoryFragment(): IMemoryFragment;
    abstract getPossibleStats(): Stat[];
    abstract getPossibleSubStats(): SubStat[];
}

export class CraftedMemoryFragment implements IMemoryFragment {
    readonly id: string;
    readonly img: string;
    readonly setType: SetType;
    readonly piece: Piece;
    readonly roman: string;
    readonly rarity: Rarity;
    readonly level: number;
    readonly mainStat: PairStat;
    readonly subStats: [PairSubStat?, PairSubStat?, PairSubStat?, PairSubStat?];
    readonly description?: string;
    readonly inTeams: number[]

    constructor(memoryFragment: IMemoryFragment) {
        this.id = memoryFragment.id;
        this.setType = memoryFragment.setType;
        this.piece = memoryFragment.piece;
        this.roman = Piece[memoryFragment.piece];
        this.rarity = memoryFragment.rarity;
        this.level = memoryFragment.level;
        this.mainStat = memoryFragment.mainStat;
        this.subStats = memoryFragment.subStats;
        this.img = memoryFragment.img;
        this.description = memoryFragment.description;
        this.inTeams = []
    }

    getMainStatType(): Stat {
      return Object.keys(this.mainStat)[0] as Stat;
    }

    getSubStatsTypes(): (SubStat | undefined)[] {
      return this.subStats.map(ss => ss && Object.keys(ss)[0] as SubStat);
    }

    getPossibleSubStats(): SubStat[] | undefined[] | null[] {
      return [
            SubStat.DEFENSE,
            SubStat.HP,
            SubStat.ATTACK_PERCENT,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
        .filter(ss => ss && Object.keys(this.mainStat)[0] !== ss && !this.getSubStatsTypes().includes(ss));
    }
}

interface LF {
  mainStat: Stat,
  subStat1: SubStat,
  subStat2: SubStat,
  subStat3: SubStat,
  subStat4: SubStat,
}

export interface MemoryFragmentsSearch {
  sets: SetType[]
  I: LF,
  II: LF,
  III: LF,
  IV: LF,
  V: LF,
  VI: LF
}

export interface MemoryFragmentsEquipped {
  I: CraftedMemoryFragment | undefined,
  II: CraftedMemoryFragment | undefined,
  III: CraftedMemoryFragment | undefined,
  IV: CraftedMemoryFragment | undefined,
  V: CraftedMemoryFragment | undefined,
  VI: CraftedMemoryFragment | undefined
}

export interface BisMemoryFragments {
  I: CraftedMemoryFragment[],
  II: CraftedMemoryFragment[],
  III: CraftedMemoryFragment[],
  IV: CraftedMemoryFragment[],
  V: CraftedMemoryFragment[],
  VI: CraftedMemoryFragment[]
}

function getPieceScore(mf: CraftedMemoryFragment, allowedSets: SetType[], lf: LF) {
    // First check Main Stat and SetType, if doesn't match return 0
    if (mf.getMainStatType() == lf.mainStat && (allowedSets.length == 0 || allowedSets.some(allowed => allowed == mf.setType))) {
      // Then check if substats in LF Sum ordered by LF SS1 40 SS2 30 SS3 20 SS40 10 otherwise 0 
      let score = 0;
      mf.getSubStatsTypes().forEach((mfss: SubStat | undefined) => {
        if (mfss) {
          score += mfss == lf.subStat1 ? 40 
            : mfss == lf.subStat2 ? 30
              : mfss == lf.subStat3 ? 20
                : mfss == lf.subStat4 ? 10
                  : 0;
        }
      })

      return score;
    } else return 0;
}

export const searchBisMFs = (search: MemoryFragmentsSearch): BisMemoryFragments => {
  interface ScoredMemoryFragment extends MemoryFragment {
    score: number
  }

  const Fragments: CraftedMemoryFragment[] = JSON.parse(localStorage.getItem("fragments") || "[]");
  const allFragments = Fragments.map((cmf: CraftedMemoryFragment) => new CraftedMemoryFragment(cmf));

  const result: BisMemoryFragments = {
    I: [],
    II: [],
    III: [],
    IV: [],
    V: [],
    VI: []
  }

    /* 
  First check sets selecteds:
  undefined => * : Return all mfs with at least 1 searched stat ordered by more stats
  [] => * : Return all mfs with at least 1 searched stat ordered by more stats
  [2] => 2 + * : Return all selected set ordered by best stats selected + all mfs with at least 1 stat (after selected set)
  [4] => 4 + * : Return all selected set ordered by best stats selected + all 2slotsSet mfs with at least 1 stat (after selected set)
  [2,2] => 2 + 2 + * () Return all selected set ordered by best stats selected + all 2slotsSet mfs with at least 1 stat (after selected set)
  [4,4] => 4 + * : Return all selected sets ordered by best stats selected + all 2slotsSet mfs with at least 1 stat (after selected set)
  [2,2,2] => 2 + 2 + 2 Return all selected set ordered by stats selected
  [2,2,2,2/4etc] => Return all selecteds sets ordered by stats selected
  */
  
  const allowedSets: SetType[] = [SetType.DEF, SetType.HP] // TODO ^

  const fragmentsByPiece = 
    Object.keys(Piece)
      .filter((v) => isNaN(Number(v)))
      .map(pk => allFragments
        .filter(f => Piece[f.piece] === pk)
        .map(mf => {
          return {
            ...mf,
            score: getPieceScore(mf, allowedSets, search[mf.roman as keyof MemoryFragmentsSearch] as LF) // TODO if in search.sets + x score
          } as ScoredMemoryFragment
        })
        .filter(smf => smf.score > 0)
        .sort((a, b) => b.score - a.score)
      );

  // i is the index of each piece i = 0 piece 1 (I) ... i = 5 piece 6 (VI)
  for (let i = 0; i <= 5; ++i) {
    const bis: CraftedMemoryFragment[] = Object.values(
        fragmentsByPiece[i]
          .reduce((acc: any, item: ScoredMemoryFragment) => {
            // 2. Group by "SetType" and only keep top 5
            if (!acc[item.setType]) acc[item.setType] = [];
            if (acc[item.setType].length < 5) acc[item.setType].push(item);
            return acc;
          }, {})
      ).flat() as CraftedMemoryFragment[];

    switch(i) {
      case 0:
        result.I = bis;
        break;
      case 1:
        result.II = bis;
        break;
      case 2:
        result.III = bis;
        break;
      case 3:
        result.IV = bis;
        break;
      case 4:
        result.V = bis;
        break;
      case 5:
        result.VI = bis;
        break;
      default:
        break;
    }
  }

  return result;
}
