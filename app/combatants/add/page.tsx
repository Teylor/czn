"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { COMBATANTS } from "@/lib/Combatants";
import { Combatant } from "@/sections/domain/combatant/Combatant";
import useCombatant from "@/hooks/useCombatant";

export default function AddCombatant(): JSX.Element {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { combatant, setCombatant, level, setLevel, ego, setEgo } = useCombatant();
    const [combatants, setCombatants] = useState<typeof COMBATANTS>(COMBATANTS);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const normalize = (s: string) =>
            s
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .toLowerCase();

        const query = searchTerm
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");

        if (!query) {
            setCombatants(COMBATANTS);
            return;
        }

        const terms = query.split(/\s+/).filter(Boolean);

        setCombatants(
            COMBATANTS.filter((p) => {
                const target = normalize(p.name);
                return terms.every((t) => target.includes(t));
            })
        );
    }, [searchTerm]);

    const handleOutsideClick = useCallback((e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.addEventListener("mousedown", handleOutsideClick);
            const onKey = (ev: KeyboardEvent) => {
                if (ev.key === "Escape") setIsOpen(false);
            };
            document.addEventListener("keydown", onKey);
            return () => {
                document.removeEventListener("mousedown", handleOutsideClick);
                document.removeEventListener("keydown", onKey);
            };
        }
    }, [isOpen, handleOutsideClick]);

    function saveCombatant(combatant: Combatant) {
        const Combatants = JSON.parse(localStorage.getItem("combatants") || "[]");
        Combatants.push(new Combatant(combatant.name, level, ego));
        localStorage.setItem("combatants", JSON.stringify(Combatants));
        router.push("/combatants");
    }

  return (
        <>
            <div className="my-8 container">
                <div className="relative w-75 px-3 py-2" ref={containerRef}>
                    <button 
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
                            <input ref={inputRef} value={searchTerm} type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 border-b border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black" />
                            {combatants.map((combatant) => (
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
