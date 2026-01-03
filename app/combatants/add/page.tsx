"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { COMBATANTS, Combatant } from "@/lib/Combatants";

export default function AddCombatant(): JSX.Element {

    const router = useRouter();
    const [selectedCombatant, setSelectedCombatant] = useState<Combatant | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [level, setLevel] = useState<number>(1);
    const [ego, setEgo] = useState<number>(0);

    function saveCombatant(combatant: Combatant) {
        const combatants = JSON.parse(localStorage.getItem("combatants") || "[]");
        const existingCombatant = combatants.find((c: Combatant) => c.name === combatant.name);
        if (existingCombatant) {
            const suffix = combatants.filter((c: Combatant) => c.name === combatant.name).length;
            const newCombatant = { id: `${combatant.id}-${suffix}`, img: combatant.id, name: combatant.name, level: level, ego: ego };
            combatants.push(newCombatant);
        } else {
            combatants.push({ id: `${combatant.id}-0`, img: combatant.id, name: combatant.name, level: level, ego: ego });
        }
        localStorage.setItem("combatants", JSON.stringify(combatants));
        router.push("/combatants");
    }

  return (
        <>
            <div className="my-8 container">
                <div className="relative">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                        <span className="flex items-center gap-2">
                            {selectedCombatant && <Image src={`/combatants/${selectedCombatant.id}.png`} alt={selectedCombatant.name} width={64} height={64} />}
                            {selectedCombatant?.name || "Select Combatant"}
                        </span>
                        <span>▼</span>
                    </button>
                    {isOpen && (
                        <div className="w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                            {COMBATANTS.map((combatant) => (
                                <button
                                    key={combatant.id}
                                    onClick={() => {
                                        setSelectedCombatant(combatant);
                                        setIsOpen(false);
                                    }}
                                    className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                                >
                                    <Image src={`/combatants/${combatant.id}.png`} alt={combatant.name} width={64} height={64} />
                                    {combatant.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <h1>Level</h1>
                <input type="number" className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" min={1} max={60} value={level} onChange={(e) => setLevel(parseInt(e.target.value))} />
                <h1>Ego</h1>
                <input type="number" className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" min={0} max={6} value={ego} onChange={(e) => setEgo(parseInt(e.target.value))} />
                <button 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                onClick={() => {
                    if (selectedCombatant) {
                        saveCombatant(selectedCombatant);
                    }
                }}>
                    Save
                </button>
            </div>
          <Link href="/combatants" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Cancel
          </Link>
        </>
    );
}
