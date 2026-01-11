"use client";

import Image from "next/image";
import { JSX, useState, useEffect, useRef, useCallback } from "react";
import { COMBATANTS } from "@/lib/Combatants";
import { Combatant } from "@/sections/domain/combatant/Combatant";

type Props = {
    disable?: boolean;
    selected?: Combatant | null;
    onSelect?: (c: Combatant) => void;
};

export default function CombatantSelector({ disable, selected, onSelect }: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [combatants, setCombatants] = useState<Combatant[] | typeof COMBATANTS>(COMBATANTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

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

        setCombatants(COMBATANTS.filter((p) => {
            const target = normalize(p.name);
            return terms.every((t) => target.includes(t));
        }));
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

    useEffect(() => {
        if (!isOpen) {
            setHighlightedIndex(-1)
            itemRefs.current = []
        }
    }, [isOpen])

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (combatants.length > 0) {
                setHighlightedIndex(0)
                setTimeout(() => itemRefs.current[0]?.focus(), 0)
            }
        }
    }

    function handleItemKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const next = (index + 1) % combatants.length
            setHighlightedIndex(next)
            itemRefs.current[next]?.focus()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const prev = (index - 1 + combatants.length) % combatants.length
            setHighlightedIndex(prev)
            itemRefs.current[prev]?.focus()
        } else if (e.key === 'Enter') {
            e.preventDefault()
            itemRefs.current[index]?.click()
        } else if (e.key === 'Escape') {
            e.preventDefault()
            setIsOpen(false)
            inputRef.current?.focus()
        }
    }

    return (
        <div className="relative w-75 px-3 py-2" ref={containerRef}>
            <button
            disabled={disable}
                onClick={() => setIsOpen(!isOpen)}
                className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    {selected && <Image src={`/combatants/${selected.name.toLocaleLowerCase()}.png`} alt={selected.name} width={64} height={64} />}
                    {selected?.name || "Select Combatant"}
                </span>
                <span>▼</span>
            </button>
            {isOpen && (
                <div className="absolute w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    <input ref={inputRef} value={searchTerm} type="text" onKeyDown={handleInputKeyDown} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 border-b border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black" />
                    {combatants.map((c, index) => (
                        <button
                            ref={(el) => { itemRefs.current[index] = el; }}
                            key={c.id}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onKeyDown={(e) => handleItemKeyDown(e, index)}
                            onClick={() => {
                                onSelect &&onSelect(new Combatant(c.name, 0, 0));
                                setIsOpen(false);
                            }}
                            className={`w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0 ${highlightedIndex === index ? 'bg-zinc-100' : ''}`}
                        >
                            <Image src={`/combatants/${c.name.toLocaleLowerCase()}.png`} alt={c.name} width={64} height={64} />
                            {c.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
