"use client";

import Link from "next/link";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    MemoryFragment, SubStat, SetType, Rarity, Piece, Stat
} from "@/sections/domain/memoryFragment/MemoryFragment";
import SubStatSelector from "@/sections/fragments/SubStatSelector";
import SetSelector from "@/sections/fragments/SetSelector";
import PieceSelector from "@/sections/fragments/PieceSelector";
import MainStatSelector from "@/sections/fragments/MainStatSelector";
import { MemoryFragmentI } from "@/sections/domain/memoryFragment/MemoryFragmentI";
import { MemoryFragmentII } from "@/sections/domain/memoryFragment/MemoryFragmentII";
import { MemoryFragmentIII } from "@/sections/domain/memoryFragment/MemoryFragmentIII";
import { MemoryFragmentIV } from "@/sections/domain/memoryFragment/MemoryFragmentIV";
import { MemoryFragmentV } from "@/sections/domain/memoryFragment/MemoryFragmentV";
import { MemoryFragmentVI } from "@/sections/domain/memoryFragment/MemoryFragmentVI";

export default function AddFragment(
    {

    }:
    {

    }): JSX.Element {
    const router = useRouter();

    const [isSetOpen, setIsSetOpen] = useState(false);
    const [selectedSet, setSelectedSet] = useState<SetType | undefined>(undefined);

    const [isPieceTypeOpen, setIsPieceTypeOpen] = useState(false);
    const [selectedPieceType, setSelectedPieceType] = useState<Piece | undefined>(undefined);

    const [isSavable, setIsSavable] = useState(true); // TODO set false and activate when ok
    const [selectedFragment, setSelectedFragment] = useState<MemoryFragment | undefined>(undefined);
    
    const [selectedMainStat, setSelectedMainStat] = useState<Stat | undefined>(undefined);
    const [mainStat, setMainStat] = useState<number>(0);

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
                setIsMainStatOpen(true);
                setSelectedFragment(selectedSet ? new MemoryFragmentIV(selectedSet, Piece.IV, Rarity.LEGENDARY) : undefined);
                break;
            case Piece.V:
                setIsMainStatOpen(true);
                setSelectedFragment(selectedSet ? new MemoryFragmentV(selectedSet, Piece.V, Rarity.LEGENDARY) : undefined);
                break;
            case Piece.VI:
                setIsMainStatOpen(true);
                setSelectedFragment(selectedSet ? new MemoryFragmentVI(selectedSet, Piece.VI, Rarity.LEGENDARY) : undefined);
                break;
            default:
                setSelectedMainStat(undefined);
                break;
        }
    }, [selectedPieceType]);

    const [isMainStatOpen, setIsMainStatOpen] = useState(false);

    useEffect(() => {
        if (!selectedFragment || selectedMainStat == null || selectedMainStat == undefined) return;
        selectedFragment.mainStat = { [selectedMainStat]: mainStat } as Partial<Record<Stat, number>>;
    }, [mainStat, selectedMainStat, selectedFragment]);

    const [isSubStat1Open, setIsSubStat1Open] = useState(false);
    const [selectedSubStat1, setSelectedSubStat1] = useState<Partial<SubStat> | undefined>(undefined);
    const [subStat1, setSubStat1] = useState<number>(0);

    useEffect(() => {
        if (!selectedFragment || selectedSubStat1 == null || selectedSubStat1 == undefined) return;
        selectedFragment.subStats[0] = { [selectedSubStat1]: subStat1 } as Partial<Record<SubStat, number>>;
    }, [subStat1, selectedSubStat1, selectedFragment]);
    
    const [isSubStat2Open, setIsSubStat2Open] = useState(false);
    const [selectedSubStat2, setSelectedSubStat2] = useState<Partial<SubStat> | undefined>(undefined);
    const [subStat2, setSubStat2] = useState<number>(0);

    useEffect(() => {
        if (!selectedFragment || selectedSubStat2 == null || selectedSubStat2 == undefined) return;
        selectedFragment.subStats[1] = { [selectedSubStat2]: subStat2 } as Partial<Record<SubStat, number>>;
    }, [subStat2, selectedSubStat2, selectedFragment]);
    
    const [isSubStat3Open, setIsSubStat3Open] = useState(false);
    const [selectedSubStat3, setSelectedSubStat3] = useState<Partial<SubStat> | undefined>(undefined);
    const [subStat3, setSubStat3] = useState<number>(0);

    useEffect(() => {
        if (!selectedFragment || selectedSubStat3 == null || selectedSubStat3 == undefined) return;
        selectedFragment.subStats[2] = { [selectedSubStat3]: subStat3 } as Partial<Record<SubStat, number>>;
    }, [subStat3, selectedSubStat3, selectedFragment]);
    
    const [isSubStat4Open, setIsSubStat4Open] = useState(false);
    const [selectedSubStat4, setSelectedSubStat4] = useState<Partial<SubStat> | undefined>(undefined);
    const [subStat4, setSubStat4] = useState<number>(0);

    useEffect(() => {
        if (!selectedFragment || selectedSubStat4 == null || selectedSubStat4 == undefined) return;
        selectedFragment.subStats[3] = { [selectedSubStat4]: subStat4 } as Partial<Record<SubStat, number>>;
    }, [subStat4, selectedSubStat4, selectedFragment]);

    function saveFragment(fragment: MemoryFragment) { // TODO change to IMemoryFragment + initialize class
        const Fragments = JSON.parse(localStorage.getItem("fragments") || "[]");
        console.log(fragment)
        Fragments.push(
            { id: `${fragment.id}`, img: `/mf/${fragment.setType}/${fragment.piece}.png`, 
            level: fragment.level, setType: fragment.setType, piece: fragment.piece, mainStat: fragment.mainStat, 
            subStats: fragment.subStats, rarity: fragment.rarity, description: fragment.description });

        localStorage.setItem("fragments", JSON.stringify(Fragments));
        router.push("/fragments");
    }

    /* const [subStats, setSubStats] = useState([
    { isOpen: false, name: "", value: 0 },
    { isOpen: false, name: "", value: 0 },
    { isOpen: false, name: "", value: 0 },
    { isOpen: false, name: "", value: 0 }
    ]);

    // Update a specific sub-stat
    const updateSubStat = (index, field, newValue) => {
    setSubStats(prev => 
        prev.map((stat, i) => 
        i === index ? { ...stat, [field]: newValue } : stat
        )
    );}; */

    /* 
    function useSubStat(initialValue = "") {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(initialValue);
    const [value, setValue] = useState(0);
    return { isOpen, setIsOpen, selected, setSelected, value, setValue };
    }

    // Use it:
    const subStat1 = useSubStat();
    const subStat2 = useSubStat();
    */

  return (
        <>
            <div className="my-8 container">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
                    <SetSelector
                        key="setSelector"
                        isSetOpen={isSetOpen}
                        setIsSetOpen={setIsSetOpen}
                        selectedSet={selectedSet}
                        setSelectedSet={setSelectedSet}
                        disable={false}
                    />

                    <PieceSelector
                        key="pieceSelector"
                        selectedSet={selectedSet}
                        isPieceTypeOpen={isPieceTypeOpen}
                        setIsPieceTypeOpen={setIsPieceTypeOpen}
                        selectedPieceType={selectedPieceType}
                        setSelectedPieceType={setSelectedPieceType}
                        disable={false}
                    />
                </div>
                
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {
                selectedPieceType != null
                && <MainStatSelector
                        key="mainSelector"
                        isMainStatOpen={isMainStatOpen}
                        setIsMainStatOpen={setIsMainStatOpen}
                        selectedPieceType={selectedPieceType}
                        selectedMainStat={selectedMainStat}
                        setSelectedMainStat={setSelectedMainStat}
                        mainStat={mainStat}
                        setMainStat={setMainStat}
                        selectedFragment={selectedFragment}
                    />
                }
            </div>

                {selectedPieceType != null
                && (
                <div className="grid grid-cols-1 gap-1">
                    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-1">
                        <SubStatSelector 
                            key="SSI"
                            substatNumber="I" 
                            isSubStatOpen={isSubStat1Open} 
                            setIsSubStatOpen={setIsSubStat1Open} 
                            selectedSubStat={selectedSubStat1}
                            setSelectedSubStat={setSelectedSubStat1}
                            subStat={subStat1}
                            setSubStat={setSubStat1}
                            selectedFragment={selectedFragment} 
                        />
                        
                        <SubStatSelector 
                            key="SSII"
                            substatNumber="II" 
                            isSubStatOpen={isSubStat2Open} 
                            setIsSubStatOpen={setIsSubStat2Open} 
                            selectedSubStat={selectedSubStat2}
                            setSelectedSubStat={setSelectedSubStat2}
                            subStat={subStat2}
                            setSubStat={setSubStat2}
                            selectedFragment={selectedFragment} 
                        />
                    </div>
                    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-1">
                        <SubStatSelector 
                            key="SSIII"
                            substatNumber="III" 
                            isSubStatOpen={isSubStat3Open} 
                            setIsSubStatOpen={setIsSubStat3Open} 
                            selectedSubStat={selectedSubStat3}
                            setSelectedSubStat={setSelectedSubStat3}
                            subStat={subStat3}
                            setSubStat={setSubStat3}
                            selectedFragment={selectedFragment} 
                        />
                        
                        <SubStatSelector 
                            key="SSIV"
                            substatNumber="IV" 
                            isSubStatOpen={isSubStat4Open} 
                            setIsSubStatOpen={setIsSubStat4Open} 
                            selectedSubStat={selectedSubStat4}
                            setSelectedSubStat={setSelectedSubStat4}
                            subStat={subStat4}
                            setSubStat={setSubStat4}
                            selectedFragment={selectedFragment} 
                        />
                    </div>
                </div>
                )}
                
            </div>
            <div>
                {
                isSavable &&
                    <button 
                        className="btn-primary"
                        onClick={() => {
                            if (selectedFragment) {
                                saveFragment(selectedFragment);
                            }
                        }}>
                        Save
                    </button>
                }
                <Link href="/fragments" className="btn-primary">
                    Cancel
                </Link>
            </div>  
        </>
    );
}
