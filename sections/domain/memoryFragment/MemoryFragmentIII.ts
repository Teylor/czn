import { MemoryFragment, Stat, PairStat, SubStat, PairSubStat, Rarity, SetType, Piece, IMemoryFragment } from "./MemoryFragment";

export class MemoryFragmentIII extends MemoryFragment {
    constructor(
        setType: SetType, 
        piece: Piece = Piece.III,
        rarity: Rarity,
    ) {
        super(setType, piece, rarity);
        this.mainStat = this.initializeMainStat();
    }

    getMemoryFragment(): IMemoryFragment {
        return this;
    }

    initializeMainStat(): PairStat {
        return {[Stat.HP]: 0};
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.HP,
        ];
    }

    getPossibleSubStats(): SubStat[] {
        let otherSubsStats = this.subStats.map(ss => ss && Object.keys(ss)[0] as SubStat);
        return [
            SubStat.ATTACK,
            SubStat.DEFENSE,
            SubStat.ATTACK_PERCENT,
            SubStat.DEFENSE_PERCENT,
            SubStat.HP_PERCENT,
            SubStat.CRIT_RATE,
            SubStat.CRIT_DAMAGE,
            SubStat.EXTRA_DAMAGE,
            SubStat.DAMAGE_OVER_TIME,
            SubStat.EGO_RECOVERY
        ]
        .filter(ss => ss && !otherSubsStats.includes(ss));
    }
}
