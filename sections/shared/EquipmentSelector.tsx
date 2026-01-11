"use client";

import Image from "next/image";
import { JSX, useState, useEffect, useRef, useCallback } from "react";
import { Equipment, EquipmentType } from "../domain/equipment/Equipment";
import { WEAPON_EQUIPMENT, ARMOR_EQUIPMENT, RING_EQUIPMENT } from "@/lib/Equipment";

type Props = {
    type: EquipmentType;
    disable?: boolean;
    selected?: Equipment | undefined;
    onSelect?: (c: Equipment) => void;
};

export default function EquipmentSelector({ disable, selected, onSelect, type }: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [equipments, setEquipments] = useState<Equipment[]>(getInitialEquipments());
    const [initialEquipments, setInitialEquipments] = useState<Equipment[]>(getInitialEquipments());
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

    function getInitialEquipments(): Equipment[] {
        if (type === EquipmentType.WEAPON) {
            return WEAPON_EQUIPMENT.map((e: Equipment) => new Equipment(e.id, e.img, e.name, e.type, e.rarity, e.effect, e.stat, e.system));
        } else if (type === EquipmentType.ARMOR) {
            return ARMOR_EQUIPMENT.map((e: Equipment) => new Equipment(e.id, e.img, e.name, e.type, e.rarity, e.effect, e.stat, e.system));
        } else if (type === EquipmentType.RING) {
            return RING_EQUIPMENT.map((e: Equipment) => new Equipment(e.id, e.img, e.name, e.type, e.rarity, e.effect, e.stat, e.system));
        }
        return []
    }

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
            setEquipments(initialEquipments);
            return;
        }

        const terms = query.split(/\s+/).filter(Boolean);
        setEquipments(initialEquipments.filter((p) => {
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
            if (equipments.length > 0) {
                setHighlightedIndex(0)
                setTimeout(() => itemRefs.current[0]?.focus(), 0)
            }
        }
    }

    function handleItemKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const next = (index + 1) % equipments.length
            setHighlightedIndex(next)
            itemRefs.current[next]?.focus()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const prev = (index - 1 + equipments.length) % equipments.length
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
                className="w-full px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    {selected && <Image src={`${selected.img}`} alt={selected.name} width={48} height={48} />}
                    {selected?.name || "Select Equipment"}
                </span>
                <span>▼</span>
            </button>
            {isOpen && (
                <div className="absolute w-full top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    <input ref={inputRef} value={searchTerm} type="text" onKeyDown={handleInputKeyDown} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 border-b border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black" />
                    {equipments.map((eq, index) => (
                        <button
                            ref={(el) => { itemRefs.current[index] = el; }}
                            key={eq.id}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onKeyDown={(e) => handleItemKeyDown(e, index)}
                            onClick={() => {
                                onSelect &&onSelect(new Equipment(eq.id, eq.img, eq.name, eq.type, eq.rarity, eq.effect, eq.stat, eq.system));
                                setIsOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0 ${highlightedIndex === index ? 'bg-zinc-100' : ''}`}
                        >
                            <Image src={eq.img} alt={eq.name} width={48} height={48} />
                            {eq.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
