"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { COMBATANTS } from "@/lib/Combatants";
import { Combatant } from "@/sections/domain/combatant/Combatant";
import useCombatant from "@/hooks/useCombatant";

export default function AddCombatant({
    params
}:
{
    params: Promise<{ id: string }>
}): JSX.Element {
    const router = useRouter();

    const [id, setId] = useState<{ id: string } | undefined>();
    const [isOpen, setIsOpen] = useState(false);
    const { combatant, setCombatant, level, setLevel, ego, setEgo } = useCombatant();

    function saveCombatant(combatant: Combatant) {
        const Combatants = JSON.parse(localStorage.getItem("combatants") || "[]");
        if (Combatants.find((c: Combatant) => c.id === combatant.id)) {
            const index = Combatants.findIndex((c: Combatant) => c.id === combatant.id);
            Combatants[index].level = level;
            Combatants[index].ego = ego;
        } else {
            Combatants.push(new Combatant(combatant.name, level, ego));
        }
        localStorage.setItem("combatants", JSON.stringify(Combatants));
        router.push("/combatants");
    }

    useEffect(() => {
        params.then(p => {
            setId(p);
            const Combatants: Combatant[] = JSON.parse(localStorage.getItem("combatants") || "[]");
            let combatant: Combatant | undefined = Combatants.find(f => f.id == p.id);
            setCombatant(combatant);
            setLevel(combatant ? combatant.level : 1);
            setEgo(combatant ? combatant.ego : 0);
        });
    }, [id]);

  return (
        <>
            <div className="my-8 container">
                <div className="relative">
                    <button 
                        disabled={true}
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                        <span className="flex items-center gap-2">
                            {combatant && <Image src={`/combatants/${combatant.name.toLocaleLowerCase()}.png`} alt={combatant.name} width={64} height={64} />}
                            {combatant?.name || "Select Combatant"}
                        </span>
                        <span>▼</span>
                    </button>
                    {isOpen && (
                        <div className="w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                            {COMBATANTS.map((combatant) => (
                                <button
                                    key={combatant.id}
                                    onClick={() => {
                                        setCombatant(new Combatant(combatant.name, 0, 0));
                                        setIsOpen(false);
                                    }}
                                    className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                                >
                                    <Image src={`/combatants/${combatant.name.toLocaleLowerCase()}.png`} alt={combatant.name} width={64} height={64} />
                                    {combatant.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
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
