"use client"

import { JSX, useState, useEffect } from "react";
import { Piece, Rarity, SetType, Stat, SubStat } from "../domain/memoryFragment/MemoryFragment";
import { MemoryFragmentI } from "../domain/memoryFragment/MemoryFragmentI";
import { MemoryFragmentII } from "../domain/memoryFragment/MemoryFragmentII";
import { MemoryFragmentIII } from "../domain/memoryFragment/MemoryFragmentIII";
import { MemoryFragmentIV } from "../domain/memoryFragment/MemoryFragmentIV";
import { MemoryFragmentV } from "../domain/memoryFragment/MemoryFragmentV";
import { MemoryFragmentVI } from "../domain/memoryFragment/MemoryFragmentVI";

function getDefaultMainStat(piece: Piece): Stat | undefined {
    switch(piece) {
        case Piece.I:
            return Stat.ATTACK;
        case Piece.II:
            return Stat.DEFENSE;
        case Piece.III:
            return Stat.HP;
        default:
            return undefined;
    }
}

export default function MemoryFragmentSearcher(
  {
    uniqueKey,
    disable,
    piece,
    setFilled
  }: {
    uniqueKey: string,
    disable: boolean,
    piece: Piece,
    setFilled: (filled: boolean) => void
  }): JSX.Element {

    const [isOpenMainStat, setIsOpenMainStat] = useState(false);
    const [selectedMainStat, setSelectedMainStat] = useState<Stat | undefined>(getDefaultMainStat(piece));
    const [isOpenSubStat1, setIsOpenSubStat1] = useState(false);
    const [selectedSubStat1, setSelectedSubStat1] = useState<SubStat | undefined>(undefined);
    const [isOpenSubStat2, setIsOpenSubStat2] = useState(false);
    const [selectedSubStat2, setSelectedSubStat2] = useState<SubStat | undefined>(undefined);
    const [isOpenSubStat3, setIsOpenSubStat3] = useState(false);
    const [selectedSubStat3, setSelectedSubStat3] = useState<SubStat | undefined>(undefined);
    const [isOpenSubStat4, setIsOpenSubStat4] = useState(false);
    const [selectedSubStat4, setSelectedSubStat4] = useState<SubStat | undefined>(undefined);

    const entity = new MemoryFragmentI(SetType.ATK, Piece.I, Rarity.LEGENDARY) as any;
    switch(piece) {
        case Piece.I:
            break;
        case Piece.II:
            Object.setPrototypeOf(entity, MemoryFragmentII.prototype);
            break;
        case Piece.III:
            Object.setPrototypeOf(entity, MemoryFragmentIII.prototype);
            break;
        case Piece.IV:
            Object.setPrototypeOf(entity, MemoryFragmentIV.prototype);
            break;
        case Piece.V:
            Object.setPrototypeOf(entity, MemoryFragmentV.prototype);
            break;
        case Piece.VI:
            Object.setPrototypeOf(entity, MemoryFragmentVI.prototype);
            break;
        default:
            break;
    }

    useEffect(() => {
        setFilled(selectedMainStat != undefined /*&& selectedSubStat1 != undefined && selectedSubStat2 != undefined && selectedSubStat3 != undefined && selectedSubStat4 != undefined */)
    }, [selectedMainStat/* , selectedSubStat1, selectedSubStat2, selectedSubStat3, selectedSubStat4 */])

  return (
    <>
        <div className="md:col-span-6">
            <h1>Piece {Piece[piece]}</h1>
        </div>
        <div className="md:col-span-2">
            <h1>Main Stat</h1>
        </div>
        <div className="relative md:col-span-4">
            <button 
                disabled={disable}
                onClick={() => setIsOpenMainStat(!isOpenMainStat)}
                className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    { selectedMainStat || "Select Main Stat" }
                </span>
                <span>▼</span>
            </button>
            {
            isOpenMainStat && (
                <div className="absolute w-50 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {entity.getPossibleStats().map((stat: Stat) => (
                        <button
                            key={`${uniqueKey}-${stat}`}
                            onClick={() => {
                                setSelectedMainStat(stat ?? undefined);
                                setIsOpenMainStat(false);
                            }}
                            className="w-50 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            {stat}
                        </button>
                    ))}
                </div>
            )}
        </div>
        <div className="md:col-span-2">
            <h1>Sub Stat 1 (Max Prio)</h1>
        </div>
        <div className="relative md:col-span-4">
            <button 
                disabled={disable}
                onClick={() => setIsOpenSubStat1(!isOpenSubStat1)}
                className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    { selectedSubStat1 || "Select Sub Stat 1" }
                </span>
                <span>▼</span>
            </button>
            {
            isOpenSubStat1 && (
                <div className="absolute w-50 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {entity.getPossibleSubStats().map((sStat1: SubStat) => (
                        <button
                            key={`${uniqueKey}-${sStat1}-1`}
                            onClick={() => {
                                setSelectedSubStat1(sStat1 ?? undefined);
                                setIsOpenSubStat1(false);
                            }}
                            className="w-50 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            {sStat1}
                        </button>
                    ))}
                </div>
            )}
        </div>
        <div className="md:col-span-2">
            <h1>Sub Stat 2</h1>
        </div>
        <div className="relative md:col-span-4">
            <button 
                disabled={disable}
                onClick={() => setIsOpenSubStat2(!isOpenSubStat2)}
                className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    { selectedSubStat2 || "Select Sub Stat 2" }
                </span>
                <span>▼</span>
            </button>
            {
            isOpenSubStat2 && (
                <div className="absolute w-50 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {entity.getPossibleSubStats().map((sStat2: SubStat) => (
                        <button
                            key={`${uniqueKey}-${sStat2}-2`}
                            onClick={() => {
                                setSelectedSubStat2(sStat2 ?? undefined);
                                setIsOpenSubStat2(false);
                            }}
                            className="w-50 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            {sStat2}
                        </button>
                    ))}
                </div>
            )}
        </div>
        <div className="md:col-span-2">
            <h1>Sub Stat 3</h1>
        </div>
        <div className="relative md:col-span-4">
            <button 
                disabled={disable}
                onClick={() => setIsOpenSubStat3(!isOpenSubStat3)}
                className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    { selectedSubStat3 || "Select Sub Stat 3" }
                </span>
                <span>▼</span>
            </button>
            {
            isOpenSubStat3 && (
                <div className="absolute w-50 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {entity.getPossibleSubStats().map((sStat3: SubStat) => (
                        <button
                            key={`${uniqueKey}-${sStat3}-3`}
                            onClick={() => {
                                setSelectedSubStat3(sStat3 ?? undefined);
                                setIsOpenSubStat3(false);
                            }}
                            className="w-50 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            {sStat3}
                        </button>
                    ))}
                </div>
            )}
        </div>
        <div className="md:col-span-2">
            <h1>Sub Stat 4 (Min Prio)</h1>
        </div>
        <div className="relative md:col-span-4">
            <button 
                disabled={disable}
                onClick={() => setIsOpenSubStat4(!isOpenSubStat4)}
                className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    { selectedSubStat4 || "Select Sub Stat 4" }
                </span>
                <span>▼</span>
            </button>
            {
            isOpenSubStat4 && (
                <div className="absolute w-50 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {entity.getPossibleSubStats().map((sStat4: SubStat) => (
                        <button
                            key={`${uniqueKey}-${sStat4}-4`}
                            onClick={() => {
                                setSelectedSubStat4(sStat4 ?? undefined);
                                setIsOpenSubStat4(false);
                            }}
                            className="w-50 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            {sStat4}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </>
  )
}
