"use client";

import Link from "next/link";
import { JSX } from "react";
import { useRouter } from "next/navigation";
import { Combatant } from "@/sections/domain/combatant/Combatant";
import useCombatant from "@/hooks/useCombatant";
import CombatantSelector from "@/sections/shared/CombatantSelector";

export default function AddCombatant(): JSX.Element {
    const router = useRouter();
    const { combatant, setCombatant, level, setLevel, ego, setEgo } = useCombatant();

    function saveCombatant(combatant: Combatant) {
        const Combatants = JSON.parse(localStorage.getItem("combatants") || "[]");
        Combatants.push(new Combatant(combatant.name, level, ego));
        localStorage.setItem("combatants", JSON.stringify(Combatants));
        router.push("/combatants");
    }

  return (
        <>
            <div className="my-8 container">
                <CombatantSelector selected={combatant} onSelect={(c) => setCombatant(c)} />
                <h1 className="m-1">Level</h1>
                <input type="number" className="m-1 w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
                    min={1} max={60} value={level} 
                    onChange={(e) => setLevel(parseInt(e.target.value))} />
                <h1 className="m-1">Ego</h1>
                <input type="number" className="m-1 w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
                    min={0} max={6} value={ego} 
                    onChange={(e) => setEgo(parseInt(e.target.value))} />
                <button 
                    className="m-1 btn-primary"
                    onClick={() => {
                        if (combatant) {
                            saveCombatant(combatant);
                        }
                    }}>
                    Save
                </button>
            </div>
          <Link href="/combatants" className="m-1 btn-primary">
            Cancel
          </Link>
        </>
    );
}
