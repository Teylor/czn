"use client"

import { JSX, useEffect, useState } from "react";
import { CraftedMemoryFragment, BisMemoryFragments, SetType, MemoryFragmentsSearch, searchBisMFs, Stat, SubStat, Piece } from "../domain/memoryFragment/MemoryFragment";
import MemoryFragmentSearcher from "@/sections/teams/MemoryFragmentSearcher";
import MemoryFragmentSelector from "./MemoryFragmentSelector";

export default function MemoryFragmentsBis(
  {
    uniqueKey,
    sets,
    setMFI,
    setMFII,
    setMFIII,
    setMFIV,
    setMFV,
    setMFVI
  }: {
    uniqueKey: string,
    sets: SetType[] | undefined,
    setMFI: (mf: CraftedMemoryFragment | undefined) => void,
    setMFII: (mf: CraftedMemoryFragment | undefined) => void,
    setMFIII: (mf: CraftedMemoryFragment | undefined) => void,
    setMFIV: (mf: CraftedMemoryFragment | undefined) => void,
    setMFV: (mf: CraftedMemoryFragment | undefined) => void,
    setMFVI: (mf: CraftedMemoryFragment | undefined) => void,
  }): JSX.Element {

    const [isFilledMFI, setIsFilledMFI] = useState(false);
    const [isFilledMFII, setIsFilledMFII] = useState(false);
    const [isFilledMFIII, setIsFilledMFIII] = useState(false);
    const [isFilledMFIV, setIsFilledMFIV] = useState(false);
    const [isFilledMFV, setIsFilledMFV] = useState(false);
    const [isFilledMFVI, setIsFilledMFVI] = useState(false);

    const [searchable, setSearchable] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        setSearchable(isFilledMFI && isFilledMFII && isFilledMFIII && isFilledMFIV && isFilledMFV && isFilledMFVI)
    }, [isFilledMFI, isFilledMFII,isFilledMFIII, isFilledMFIV, isFilledMFV, isFilledMFVI])

    // TODO spinner ¿?
    const [searching, setSearching] = useState(false);

    const [bisMFs, setBisMFs] = useState<BisMemoryFragments | undefined>(undefined)

    function search() { /* TODO: dont delete params on search */
        // TODO
        const search: MemoryFragmentsSearch = { /* TODO */
            sets: [],
            I: {
            mainStat: Stat.ATTACK,
            subStat1: SubStat.CRIT_RATE,
            subStat2: SubStat.CRIT_DAMAGE,
            subStat3: SubStat.ATTACK_PERCENT,
            subStat4: SubStat.HP,
            },
            II: {
            mainStat: Stat.DEFENSE,
            subStat1: SubStat.CRIT_RATE,
            subStat2: SubStat.CRIT_DAMAGE,
            subStat3: SubStat.ATTACK_PERCENT,
            subStat4: SubStat.HP,
            },
            III: {
            mainStat: Stat.HP,
            subStat1: SubStat.CRIT_RATE,
            subStat2: SubStat.CRIT_DAMAGE,
            subStat3: SubStat.ATTACK_PERCENT,
            subStat4: SubStat.HP,
            },
            IV: {
            mainStat: Stat.HP_PERCENT,
            subStat1: SubStat.CRIT_RATE,
            subStat2: SubStat.CRIT_DAMAGE,
            subStat3: SubStat.ATTACK_PERCENT,
            subStat4: SubStat.HP,
            },
            V: {
            mainStat: Stat.ATTACK,
            subStat1: SubStat.CRIT_RATE,
            subStat2: SubStat.CRIT_DAMAGE,
            subStat3: SubStat.ATTACK_PERCENT,
            subStat4: SubStat.HP,
            },
            VI: {
            mainStat: Stat.ATTACK_PERCENT,
            subStat1: SubStat.CRIT_RATE,
            subStat2: SubStat.CRIT_DAMAGE,
            subStat3: SubStat.ATTACK_PERCENT,
            subStat4: SubStat.HP,
            }
        }

        setBisMFs(searchBisMFs(search));
    }

    return (
    <>
        {searched ?
        <>
            <MemoryFragmentSelector
                key={`${uniqueKey}-P1`}
                uniqueKey={`${uniqueKey}-P1`}
                disable={false}
                sets={sets}
                piece={Piece.I}
                setMF={setMFI}
                possibleMFs={bisMFs?.I}
                />
            <MemoryFragmentSelector
                key={`${uniqueKey}-P2`}
                uniqueKey={`${uniqueKey}-P2`}
                disable={false}
                sets={sets}
                piece={Piece.II}
                setMF={setMFII}
                possibleMFs={bisMFs?.II}
                />
            <MemoryFragmentSelector
                key={`${uniqueKey}-P3`}
                uniqueKey={`${uniqueKey}-P3`}
                disable={false}
                sets={sets}
                piece={Piece.III}
                setMF={setMFIII}
                possibleMFs={bisMFs?.III}
                />
            <MemoryFragmentSelector
                key={`${uniqueKey}-P4`}
                uniqueKey={`${uniqueKey}-P4`}
                disable={false}
                sets={sets}
                piece={Piece.IV}
                setMF={setMFIV}
                possibleMFs={bisMFs?.IV}
                />
            <MemoryFragmentSelector
                key={`${uniqueKey}-P5`}
                uniqueKey={`${uniqueKey}-P5`}
                disable={false}
                sets={sets}
                piece={Piece.V}
                setMF={setMFV}
                possibleMFs={bisMFs?.V}
                />
            <MemoryFragmentSelector
                key={`${uniqueKey}-P6`}
                uniqueKey={`${uniqueKey}-P6`}
                disable={false}
                sets={sets}
                piece={Piece.VI}
                setMF={setMFVI}
                possibleMFs={bisMFs?.VI}
                />
        </>
        :
        <>
            <MemoryFragmentSearcher
                key={`${uniqueKey}-P1`}
                uniqueKey={`${uniqueKey}-P1`}
                disable={false}
                piece={Piece.I}
                setFilled={setIsFilledMFI}
            />
            <MemoryFragmentSearcher
                key={`${uniqueKey}-P2`}
                uniqueKey={`${uniqueKey}-P2`}
                disable={false}
                piece={Piece.II}
                setFilled={setIsFilledMFII}
            />
            <MemoryFragmentSearcher
                key={`${uniqueKey}-P3`}
                uniqueKey={`${uniqueKey}-P3`}
                disable={false}
                piece={Piece.III}
                setFilled={setIsFilledMFIII}
            />
            <MemoryFragmentSearcher
                key={`${uniqueKey}-P4`}
                uniqueKey={`${uniqueKey}-P4`}
                disable={false}
                piece={Piece.IV}
                setFilled={setIsFilledMFIV}
            />
            <MemoryFragmentSearcher
                key={`${uniqueKey}-P5`}
                uniqueKey={`${uniqueKey}-P5`}
                disable={false}
                piece={Piece.V}
                setFilled={setIsFilledMFV}
            />
            <MemoryFragmentSearcher
                key={`${uniqueKey}-P6`}
                uniqueKey={`${uniqueKey}-P6`}
                disable={false}
                piece={Piece.VI}
                setFilled={setIsFilledMFVI}
            />
        </>
        }
        {
            searched ?
            <button className="btn-primary"
            onClick={() => {setSearched(!searched)}} >
                Reconfigure (TODO)
            </button>
            :
            <button className={`${!searchable ? "btn-disabled" : "btn-primary"}`}
                disabled={!searchable}
                onClick={() => {setSearched(!searched); search();}} >
                    Search (TODO)
            </button>
        }
    </>
    )
}
