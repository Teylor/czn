"use client"

import { JSX } from "react";
import { CraftedMemoryFragment, SetType } from "../domain/memoryFragment/MemoryFragment";
import MemoryFragmentSelector from "@/sections/teams/MemoryFragmentSelector";

export default function MemoryFragmentsManual(
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

    /* TODO
      print border green if free/ orange if in other team / red if in same team
      add search filters
    */
    return (
    <>
        <MemoryFragmentSelector
            key={`${uniqueKey}-P1`}
            uniqueKey={`${uniqueKey}-P1`}
            disable={false}
            sets={sets}
            piece={1}
            setMF={setMFI}
            />
            <MemoryFragmentSelector
            key={`${uniqueKey}-P2`}
            uniqueKey={`${uniqueKey}-P2`}
            disable={false}
            sets={sets}
            piece={2}
            setMF={setMFII}
            />
            <MemoryFragmentSelector
            key={`${uniqueKey}-P3`}
            uniqueKey={`${uniqueKey}-P3`}
            disable={false}
            sets={sets}
            piece={3}
            setMF={setMFIII}
            />
            <MemoryFragmentSelector
            key={`${uniqueKey}-P4`}
            uniqueKey={`${uniqueKey}-P4`}
            disable={false}
            sets={sets}
            piece={4}
            setMF={setMFIV}
            />
            <MemoryFragmentSelector
            key={`${uniqueKey}-P5`}
            uniqueKey={`${uniqueKey}-P5`}
            disable={false}
            sets={sets}
            piece={5}
            setMF={setMFV}
            />
            <MemoryFragmentSelector
            key={`${uniqueKey}-P6`}
            uniqueKey={`${uniqueKey}-P6`}
            disable={false}
            sets={sets}
            piece={6}
            setMF={setMFVI}
            />
        </>
    )
}
