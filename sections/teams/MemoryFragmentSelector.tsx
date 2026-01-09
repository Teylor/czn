"use client"

import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { CraftedMemoryFragment, Piece, SetType } from "../domain/memoryFragment/MemoryFragment";

export default function MemoryFragmentSelector(
  {
    uniqueKey,
    disable,
    sets,
    piece,
    setMF,
    possibleMFs
  }: {
    uniqueKey: string,
    disable: boolean,
    sets: SetType[] | undefined,
    piece: Piece,
    setMF: (mf: CraftedMemoryFragment | undefined) => void,
    possibleMFs?: CraftedMemoryFragment[] | undefined
  }): JSX.Element {

    const [fragments, setFragments] = useState<CraftedMemoryFragment[]>([])
    
    useEffect(() => {
        if (possibleMFs) {
            setFragments(possibleMFs);
        } else {
            const Fragments: CraftedMemoryFragment[] = JSON.parse(localStorage.getItem("fragments") || "[]");
            const mappedFragments = Fragments.map((cmf: CraftedMemoryFragment) => new CraftedMemoryFragment(cmf))
            setFragments(mappedFragments);
        }
        
    }, []);

    /* TODO print border green if free/ orange if in other team / red if in same team */
    function mfIsUsed(mfId: string | undefined): boolean {
        if (!mfId) return false;
        const teamsRaw = JSON.parse(localStorage.getItem("teams") || "[]");
        const teams = Array.isArray(teamsRaw) ? teamsRaw : [];
        for (const team of teams) {
            if (!team || typeof team !== 'object') continue;
            const memberKeys = Object.keys(team || {});
            for (const memberKey of memberKeys) {
                const member = team[memberKey];
                if (!member || !member.mfs || typeof member.mfs !== 'object') continue;
                const mfKeys = Object.keys(member.mfs || {});
                for (const mfKey of mfKeys) {
                    const mfObj = member.mfs[mfKey];
                    if (mfObj && mfObj.id === mfId) return true;
                }
            }
        }
        return false;
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedMF, setSelectedMF] = useState<CraftedMemoryFragment | undefined>(undefined)

    const optionsFilter = (cmf: CraftedMemoryFragment) => {
        if (sets) {
            if (sets.length > 0) {
                return cmf.piece === piece && sets.some(s => s == cmf.setType)
            } else {
                return cmf.piece === piece
            }
        } else {
            return cmf.piece === piece
        }
    }

  return (
    <>
        <div className="md:col-span-1">
            <h1>{Piece[piece]}</h1>
        </div>
        <div className="relative md:col-span-2">
            <button 
                disabled={disable}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-50 px-3 py-8 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black border ${mfIsUsed(selectedMF?.id) ? "border-red-500" : "border-zinc-300"}`}
            >
                <span className="flex items-center gap-2">
                    { selectedMF && <Image src={selectedMF.img} alt={selectedMF.id} width={48} height={48} /> }
                    { selectedMF?.id || "Select Fragment" }
                </span>
                <span>▼</span>
            </button>
            {
            isOpen && (
                <div className="absolute w-100 top-full left-0 right-0 mt-1 rounded-md bg-white z-10 max-h-64 overflow-y-auto border border-zinc-300">
                    {fragments
                    .filter(cmf=> optionsFilter(cmf))
                    .map((fcmf: CraftedMemoryFragment) => (
                        <button
                            key={`${uniqueKey}-${fcmf.id}`}
                            onClick={() => {
                                setMF((new CraftedMemoryFragment(fcmf)) ?? undefined);
                                setSelectedMF((new CraftedMemoryFragment(fcmf)) ?? undefined)
                                setIsOpen(false);
                            }}
                            className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            <Image src={fcmf.img} alt={fcmf.id} width={48} height={48} />
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
