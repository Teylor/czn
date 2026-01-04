import { MemoryFragment, Stat, PairStat, SubStat, PairSubStat, Rarity, SetType, Piece, IMemoryFragment } from "./MemoryFragment";

export class MemoryFragmentI extends MemoryFragment {
    constructor(
        setType: SetType, 
        piece: Piece = Piece.I,
        rarity: Rarity,
    ) {
        super(setType, piece, rarity);
        this.mainStat = this.initializeMainStat();
    }

    getMemoryFragment(): IMemoryFragment {
        return this;
    }

    initializeMainStat(): PairStat {
        return {[Stat.ATTACK]: 0};
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.ATTACK,
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        /* let provitional =  [
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
        return provitional.filter(p => p) */
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
}
