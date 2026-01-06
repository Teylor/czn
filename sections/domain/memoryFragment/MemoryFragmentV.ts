import { MemoryFragment, Stat, PairStat, SubStat, PairSubStat, Rarity, SetType, Piece, IMemoryFragment } from "./MemoryFragment";

export class MemoryFragmentV extends MemoryFragment {
    constructor(
        setType: SetType, 
        piece: Piece = Piece.V,
        rarity: Rarity,
    ) {
        super(setType, piece, rarity);
        this.mainStat = this.initializeMainStat();
    }

    getMemoryFragment(): IMemoryFragment {
        return this;
    }

    initializeMainStat(): PairStat {
        return {};
    }

    getPossibleStats(): Stat[] {
        return [
            Stat.ATTACK_PERCENT,
            Stat.HP_PERCENT,
            Stat.INSTINCT_DAMAGE,
            Stat.ORDER_DAMAGE,
            Stat.PASSION_DAMAGE,
            Stat.VOID_DAMAGE,
            Stat.JUSTICE_DAMAGE
        ];
    }

    getPossibleSubStats(): SubStat[] { // TODO remove selecteds
        /* let provitional =  [
            SubStat.ATTACK,
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
        return provitional.filter(p => p) */
        return [
            SubStat.ATTACK,
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
    }
}
