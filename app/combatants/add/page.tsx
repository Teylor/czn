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
                <h1 className="m-3 text-lg font-bold">Level</h1>
                <input type="number" min={1} max={60} value={level} 
                    className="mx-3 w-20 p-3 input-primary"
                    onChange={(e) => setLevel(parseInt(e.target.value))} />
                <h1 className="m-3 text-lg font-bold">Ego</h1>
                <input type="number" min={0} max={6} value={ego}
                    className="mx-3 w-20 p-3 input-primary"
                    onChange={(e) => setEgo(parseInt(e.target.value))} />
                
            </div>
            <button 
                    className={`m-1 w-20 h-10 ${!combatant ? 'btn-disabled' : 'btn-primary'}`}
                    onClick={() => {
                        if (combatant) {
                            saveCombatant(combatant);
                        }
                    }}>
                    Save
                </button>
            <Link href="/combatants" className="m-1 w-20 h-10 btn-primary">
                Cancel
            </Link>
        </>
    );
}
