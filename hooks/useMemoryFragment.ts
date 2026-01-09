import { useState, useEffect } from "react";
import { MemoryFragment, Piece, Rarity, SetType, Stat, SubStat } from "@/sections/domain/memoryFragment/MemoryFragment";
import { MemoryFragmentI } from "@/sections/domain/memoryFragment/MemoryFragmentI";
import { MemoryFragmentII } from "@/sections/domain/memoryFragment/MemoryFragmentII";
import { MemoryFragmentIII } from "@/sections/domain/memoryFragment/MemoryFragmentIII";
import { MemoryFragmentIV } from "@/sections/domain/memoryFragment/MemoryFragmentIV";
import { MemoryFragmentV } from "@/sections/domain/memoryFragment/MemoryFragmentV";
import { MemoryFragmentVI } from "@/sections/domain/memoryFragment/MemoryFragmentVI";

export default function useMemoryFragment() {
  const [selectedFragment, setSelectedFragment] = useState<MemoryFragment | undefined>(undefined);

  const [selectedSet, setSelectedSet] = useState<SetType | undefined>(undefined);
  const [selectedPieceType, setSelectedPieceType] = useState<Piece | undefined>(undefined);
  
  const [selectedMainStat, setSelectedMainStat] = useState<Stat | undefined>(undefined);
  const [mainStat, setMainStat] = useState<number>(0);

  const [selectedSubStat1, setSelectedSubStat1] = useState<Partial<SubStat> | undefined>(undefined);
  const [subStat1, setSubStat1] = useState<number>(0);

  const [selectedSubStat2, setSelectedSubStat2] = useState<Partial<SubStat> | undefined>(undefined);
  const [subStat2, setSubStat2] = useState<number>(0);

  const [selectedSubStat3, setSelectedSubStat3] = useState<Partial<SubStat> | undefined>(undefined);
  const [subStat3, setSubStat3] = useState<number>(0);

  const [selectedSubStat4, setSelectedSubStat4] = useState<Partial<SubStat> | undefined>(undefined);
  const [subStat4, setSubStat4] = useState<number>(0);

    useEffect(() => {
        switch (selectedPieceType) {
            case Piece.I:
                setSelectedMainStat(Stat.ATTACK);
                setSelectedFragment(selectedSet ? new MemoryFragmentI(selectedSet, Piece.I, Rarity.LEGENDARY) : undefined);
                break;
            case Piece.II:
                setSelectedMainStat(Stat.DEFENSE);
                setSelectedFragment(selectedSet ? new MemoryFragmentII(selectedSet, Piece.II, Rarity.LEGENDARY) : undefined);
                break;
            case Piece.III:
                setSelectedMainStat(Stat.HP);
                setSelectedFragment(selectedSet ? new MemoryFragmentIII(selectedSet, Piece.III, Rarity.LEGENDARY) : undefined);
                break;
            case Piece.IV:
                setSelectedMainStat(Stat.ATTACK_PERCENT);
                setSelectedFragment(selectedSet ? new MemoryFragmentIV(selectedSet, Piece.IV, Rarity.LEGENDARY) : undefined);
                break;
            case Piece.V:
                setSelectedMainStat(Stat.ATTACK_PERCENT);
                setSelectedFragment(selectedSet ? new MemoryFragmentV(selectedSet, Piece.V, Rarity.LEGENDARY) : undefined);
                break;
            case Piece.VI:
                setSelectedMainStat(Stat.ATTACK_PERCENT);
                setSelectedFragment(selectedSet ? new MemoryFragmentVI(selectedSet, Piece.VI, Rarity.LEGENDARY) : undefined);
                break;
            default:
                setSelectedMainStat(undefined);
                break;
        }
    }, [selectedPieceType]);

    useEffect(() => {
        if (!selectedFragment || !selectedMainStat) return;
        selectedFragment.mainStat = { [selectedMainStat]: mainStat } as Partial<Record<Stat, number>>;
    }, [mainStat, selectedMainStat, selectedFragment]);

    useEffect(() => {
        if (!selectedFragment || !selectedSubStat1) return;
        selectedFragment.subStats[0] = { [selectedSubStat1]: subStat1 } as Partial<Record<SubStat, number>>;
    }, [subStat1, selectedSubStat1, selectedFragment]);

    useEffect(() => {
        if (!selectedFragment || !selectedSubStat2) return;
        selectedFragment.subStats[1] = { [selectedSubStat2]: subStat2 } as Partial<Record<SubStat, number>>;
    }, [subStat2, selectedSubStat2, selectedFragment]);

    useEffect(() => {
        if (!selectedFragment || !selectedSubStat3) return;
        selectedFragment.subStats[2] = { [selectedSubStat3]: subStat3 } as Partial<Record<SubStat, number>>;
    }, [subStat3, selectedSubStat3, selectedFragment]);

    useEffect(() => {
        if (!selectedFragment || !selectedSubStat4) return;
        selectedFragment.subStats[3] = { [selectedSubStat4]: subStat4 } as Partial<Record<SubStat, number>>;
    }, [subStat4, selectedSubStat4, selectedFragment]);

  return { selectedFragment, setSelectedFragment, 
           selectedSet, setSelectedSet, selectedPieceType, setSelectedPieceType,
           selectedMainStat, setSelectedMainStat, mainStat, setMainStat,
           selectedSubStat1, setSelectedSubStat1, subStat1, setSubStat1,
           selectedSubStat2, setSelectedSubStat2, subStat2, setSubStat2,
           selectedSubStat3, setSelectedSubStat3, subStat3, setSubStat3,
           selectedSubStat4, setSelectedSubStat4, subStat4, setSubStat4  };
}