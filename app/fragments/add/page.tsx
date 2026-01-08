"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { MemoryFragment } from "@/sections/domain/memoryFragment/MemoryFragment";
import SubStatSelector from "@/sections/fragments/SubStatSelector";
import SetSelector from "@/sections/fragments/SetSelector";
import PieceSelector from "@/sections/fragments/PieceSelector";
import MainStatSelector from "@/sections/fragments/MainStatSelector";
import useMemoryFragment from "@/hooks/useMemoryFragment";

export default function AddFragment(
    {

    }:
    {

    }): JSX.Element {
    const router = useRouter();

    const {
        selectedFragment,
        selectedSet,
        selectedPieceType,
        selectedMainStat,
        mainStat,
        selectedSubStat1,
        subStat1,
        selectedSubStat2,
        subStat2,
        selectedSubStat3,
        subStat3,
        selectedSubStat4,
        subStat4,
        setSelectedSet,
        setSelectedPieceType,
        setSelectedMainStat,
        setMainStat,
        setSelectedSubStat1,
        setSubStat1,
        setSelectedSubStat2,
        setSubStat2,
        setSelectedSubStat3,
        setSubStat3,
        setSelectedSubStat4,
        setSubStat4
    } = useMemoryFragment();

    const [isSetOpen, setIsSetOpen] = useState(false);
    const [isPieceTypeOpen, setIsPieceTypeOpen] = useState(false);
    const [isMainStatOpen, setIsMainStatOpen] = useState(false);
    const [isSubStat1Open, setIsSubStat1Open] = useState(false);
    const [isSubStat2Open, setIsSubStat2Open] = useState(false);
    const [isSubStat3Open, setIsSubStat3Open] = useState(false);
    const [isSubStat4Open, setIsSubStat4Open] = useState(false);
    
    function saveFragment(fragment: MemoryFragment) {
        const Fragments = JSON.parse(localStorage.getItem("fragments") || "[]");

        Fragments.push( fragment );

        localStorage.setItem("fragments", JSON.stringify(Fragments));
        router.push("/fragments");
    }

  return (
        <>
            <div className="my-8 container">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-1">
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
                
            <div className="grid grid-cols-1 md:grid-cols-7 gap-1">
                {
                selectedPieceType
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
                        disable={false}
                    />
                }
            </div>

                {selectedPieceType
                && (
                <div className="grid grid-cols-1 gap-1">
                    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-1">
                        <SubStatSelector 
                            key="SS1"
                            substatNumber={1} 
                            isSubStatOpen={isSubStat1Open} 
                            setIsSubStatOpen={setIsSubStat1Open} 
                            selectedSubStat={selectedSubStat1}
                            setSelectedSubStat={setSelectedSubStat1}
                            subStat={subStat1}
                            setSubStat={setSubStat1}
                            selectedFragment={selectedFragment} 
                        />
                        
                        <SubStatSelector 
                            key="SS2"
                            substatNumber={2} 
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
                            key="SS3"
                            substatNumber={3} 
                            isSubStatOpen={isSubStat3Open} 
                            setIsSubStatOpen={setIsSubStat3Open} 
                            selectedSubStat={selectedSubStat3}
                            setSelectedSubStat={setSelectedSubStat3}
                            subStat={subStat3}
                            setSubStat={setSubStat3}
                            selectedFragment={selectedFragment} 
                        />
                        
                        <SubStatSelector 
                            key="SS4"
                            substatNumber={4} 
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
                <button 
                    className={`${selectedMainStat != undefined ? "btn-primary": "btn-disabled"}`}
                    onClick={() => {
                        if (selectedFragment) {
                            saveFragment(selectedFragment);
                        }
                    }}>
                    Save
                </button>
                <Link href="/fragments" className="btn-primary">
                    Cancel
                </Link>
            </div>
        </>
    );
}
