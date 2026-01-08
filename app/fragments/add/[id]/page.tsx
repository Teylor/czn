"use client";

import Link from "next/link";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CraftedMemoryFragment, IMemoryFragment, MemoryFragment, Rarity, Stat, SubStat } from "@/sections/domain/memoryFragment/MemoryFragment";
import SubStatSelector from "@/sections/fragments/SubStatSelector";
import SetSelector from "@/sections/fragments/SetSelector";
import PieceSelector from "@/sections/fragments/PieceSelector";
import MainStatSelector from "@/sections/fragments/MainStatSelector";
import useMemoryFragment from "@/hooks/useMemoryFragment";

export default function AddFragment(
    {
        params
    }:
    {
        params: Promise<{ id: string }>
    }): JSX.Element {
    const router = useRouter();

    const [id, setId] = useState<{ id: string } | undefined>();
    const [fragments, setFragments] = useState<IMemoryFragment[]>([]);

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
        setSelectedFragment,
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

        let mfindex: number = Fragments.findIndex((f: IMemoryFragment) => f.id == fragment.id);
        if (mfindex !== -1) {
            Fragments[mfindex] = fragment;
        } else {
            Fragments.push( fragment );
        }

        localStorage.setItem("fragments", JSON.stringify(Fragments));
        router.push("/fragments");
    }

    useEffect(() => {
        params.then(p => { 
            setId(p);

            const Fragments: IMemoryFragment[] = JSON.parse(localStorage.getItem("fragments") || "[]");
            setFragments(Fragments);
            let ifragment: IMemoryFragment | undefined = Fragments.find(f => f.id == p.id);
            let fragment: CraftedMemoryFragment | undefined = ifragment ? new CraftedMemoryFragment(ifragment) : undefined;
            setSelectedFragment(fragment as MemoryFragment | undefined);
            setSelectedSet(fragment && fragment?.setType || undefined)
            setSelectedPieceType(fragment && fragment?.piece || undefined)
            if (fragment && fragment?.mainStat) {
                const entries = Object.entries(fragment.mainStat);
                if (entries.length > 0) {
                    const [key, value] = entries[0] as [Stat, number];
                    setSelectedMainStat(key);
                    setMainStat(value);
                }
            }
            if (fragment && fragment?.subStats) {
                fragment.subStats.forEach((subStat, i) => {
                    if (subStat) {
                        const entries = Object.entries(subStat);
                        if (entries.length > 0) {
                            const [key, value] = entries[0] as [SubStat, number];
                            setSubStatByIndex(i, key, value)
                        }
                    }
                });
            }
        });
    }, [id]);

    function setSubStatByIndex(index: number, key: Partial<SubStat>, value: number) {
        switch(index) {
            case 0: setSelectedSubStat1(key ?? undefined); setSubStat1(value ?? 0); break;
            case 1: setSelectedSubStat2(key ?? undefined); setSubStat2(value ?? 0); break;
            case 2: setSelectedSubStat3(key ?? undefined); setSubStat3(value ?? 0); break;
            case 3: setSelectedSubStat4(key ?? undefined); setSubStat4(value ?? 0); break;
        }
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
                        disable={true}
                    />

                    <PieceSelector
                        key="pieceSelector"
                        selectedSet={selectedSet}
                        isPieceTypeOpen={isPieceTypeOpen}
                        setIsPieceTypeOpen={setIsPieceTypeOpen}
                        selectedPieceType={selectedPieceType}
                        setSelectedPieceType={setSelectedPieceType}
                        disable={true}
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
                        disable={true}
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
                    className="btn-primary"
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
