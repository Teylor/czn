"use client"

import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { CraftedMemoryFragment, Piece } from "../domain/memoryFragment/MemoryFragment";

export default function MemoryFragmentSelector(
  {
    keyUnique,
    disable,
    piece,
    setMF
  }: {
    keyUnique: string,
    disable: boolean,
    piece: number,
    setMF: (mf: CraftedMemoryFragment | undefined) => void
  }): JSX.Element {

    const [fragments, setFragments] = useState<CraftedMemoryFragment[]>([])
    
    useEffect(() => {
        const Fragments: CraftedMemoryFragment[] = JSON.parse(localStorage.getItem("fragments") || "[]");
        const mappedFragments = Fragments.map((cmf: CraftedMemoryFragment) => new CraftedMemoryFragment(cmf))
        setFragments(mappedFragments);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedMF, setSelectedMF] = useState<CraftedMemoryFragment | undefined>(undefined)

  return (
    <> {/* TODO one x row I (1) + Selector (2/3) + when selected add stats (3/2) */}
        <div className="md:col-span-1">
            <h1>{Piece[piece]}</h1>
        </div>
        <div className="relative md:col-span-2">
            <button 
                disabled={disable}
                onClick={() => setIsOpen(!isOpen)}
                className="w-50 px-3 py-8 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            > {/* TODO print border green if free/ orange if in other team / red if in same team */}
                <span className="flex items-center gap-2">
                    { selectedMF && <Image src={selectedMF.img} alt={selectedMF.id} width={64} height={64} /> }
                    { selectedMF?.id || "Select Fragment" }
                </span>
                <span>▼</span>
            </button>
            {
            isOpen && (
                <div className="absolute w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {fragments.filter(cmf => cmf.piece === piece).map((fcmf: CraftedMemoryFragment) => (
                        <button
                            key={`${keyUnique}-${fcmf.id}`}
                            onClick={() => {
                                setMF((new CraftedMemoryFragment(fcmf)) ?? undefined);
                                setSelectedMF((new CraftedMemoryFragment(fcmf)) ?? undefined)
                                setIsOpen(false);
                            }}
                            className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        > {/* TODO print border green if free/ orange if in other team / red if in same team */}
                            <Image src={fcmf.img} alt={fcmf.id} width={64} height={64} />
                            {fcmf.id}
                        </button>
                    ))}
                </div>
            )}
        </div>
        <div className="md:col-span-3">
            <h1>Stats</h1>
        </div>
    </>
  )
}
