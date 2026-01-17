"use client"

import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { Combatant } from "../domain/combatant/Combatant";

export default function CombatantSelector(
  {
    keyUnique,
    disable,
    setCombatant
  }: {
    keyUnique: string,
    disable: boolean,
    setCombatant: (combatant: Combatant | undefined) => void
  }): JSX.Element {

    const [combatants, setCombatants] = useState<Combatant[]>([]);
    
    useEffect(() => {
        const Combatants: Combatant[] = JSON.parse(localStorage.getItem("combatants") || "[]");
        const mappedCombatants = Combatants.map((c: Combatant) => c);
        setCombatants(mappedCombatants);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCombatant, setSelectedCombatant] = useState<Combatant | undefined>(undefined);

  return (
    <div className="relative md:col-span-3"> 
        <button 
            disabled={disable}
            onClick={() => setIsOpen(!isOpen)}
            className="w-50 px-3 py-4 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        >
            <span className="flex items-center gap-2">
                { selectedCombatant && <Image src={selectedCombatant.img} alt={selectedCombatant.name} width={64} height={64} /> }
                { selectedCombatant?.name || "Select Combatant" }
            </span>
            <span>▼</span>
        </button>
        {
        isOpen && (
            <div className="absolute w-50 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                {combatants.map((itCombatant: Combatant) => (
                    <button
                        key={`${keyUnique}-${itCombatant.id}`}
                        onClick={() => {
                            setCombatant(itCombatant ?? undefined);
                            setSelectedCombatant(itCombatant ?? undefined);
                            setIsOpen(false);
                        }}
                        className="w-50 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                    >
                        <Image src={itCombatant.img} alt={itCombatant.name} width={64} height={64} />
                        {itCombatant.name}
                    </button>
                ))}
            </div>
        )}
    </div>
  )
}
