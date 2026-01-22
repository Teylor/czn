"use client";

import Image from "next/image";
import { JSX, useState, useEffect, useRef, useCallback } from "react";
import { PARTNERS } from "@/lib/Partners";
import { Partner } from "@/sections/domain/partner/Partner";

type Props = {
    disable?: boolean;
    selected?: Partner | null;
    onSelect?: (p: Partner) => void;
};

export default function PartnerSelector({ disable, selected, onSelect }: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [partners, setPartners] = useState<typeof PARTNERS>(PARTNERS);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const sortedPartners = partners.sort((a, b) => a.name.localeCompare(b.name));

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
            setPartners(sortedPartners);
            return;
        }

        const terms = query.split(/\s+/).filter(Boolean);

        setPartners(sortedPartners.filter((p) => {
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
            if (partners.length > 0) {
                setHighlightedIndex(0)
                setTimeout(() => itemRefs.current[0]?.focus(), 0)
            }
        }
    }

    function handleItemKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const next = (index + 1) % partners.length
            setHighlightedIndex(next)
            itemRefs.current[next]?.focus()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const prev = (index - 1 + partners.length) % partners.length
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
        <div className="relative mx-10" ref={containerRef}>
            <button
            disabled={disable}
                onClick={() => setIsOpen(!isOpen)}
                className="w-60 h-20 px-3 py-2 border
                border-zinc-600 rounded-md font-bold text-xl text-black
                text-left flex items-center justify-between focus:outline-none
                focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400"
                style={{ backgroundColor: "#9d9d9d" }}
            >
                <span className="flex items-center gap-2">
                    {selected && <Image src={`/partners/${selected.name.toLocaleLowerCase()}.png`} alt={selected.name} width={64} height={64} />}
                    {selected?.name || "Select Partner"}
                </span>
                <span>▼</span>
            </button>
            {isOpen && (
                <div className="absolute border border-zinc-600 rounded-md z-10 w-60 h-auto max-h-60 overflow-y-auto"
                style={{ backgroundColor: "#9d9d9d" }}>
                    <input ref={inputRef} value={searchTerm} type="text" onKeyDown={handleInputKeyDown} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..."
                    className="w-full p-3 text-lg
                    border-b border-zinc-600 text-black
                    placeholder-black focus:outline-none"
                    style={{ backgroundColor: "#9d9d9d" }} />
                    {partners.map((p, index) => (
                        <button
                            ref={(el) => { itemRefs.current[index] = el; }}
                            key={p.id}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onKeyDown={(e) => handleItemKeyDown(e, index)}
                            onClick={() => {
                                onSelect && onSelect(new Partner(p.name, 0, 0));
                                setIsOpen(false);
                            }}
                            className={`px-3 py-2 text-lg font-bold w-full
                                flex items-center gap-2 text-black border-b
                                border-zinc-600 last:border-b-0
                                ${highlightedIndex === index ? 'brightness-105' : ''}`}
                            style={{ backgroundColor: "#9d9d9d" }}
                        >
                            <Image src={`/partners/${p.name.toLocaleLowerCase()}.png`} alt={p.name} width={64} height={64} />
                            {p.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
