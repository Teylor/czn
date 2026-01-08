"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PARTNERS } from "@/lib/Partners";
import { Partner } from "@/sections/domain/partner/Partner";
import usePartner from "@/hooks/usePartner";

export default function AddPartner(): JSX.Element {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { partner, setPartner, level, setLevel, ego, setEgo } = usePartner();
    const [partners, setPartners] = useState<typeof PARTNERS>(PARTNERS);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function savePartner(partner: Partner) {
        const Partners = JSON.parse(localStorage.getItem("partners") || "[]");
        Partners.push(new Partner(partner.name, level, ego));
        localStorage.setItem("partners", JSON.stringify(Partners));
        router.push("/partners");
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
            setPartners(PARTNERS);
            return;
        }

        const terms = query.split(/\s+/).filter(Boolean);

        setPartners(
            PARTNERS.filter((p) => {
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

  return (
        <>
            <div className="my-8 container">
                <div className="relative w-75 px-3 py-2" ref={containerRef}>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-75 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                        <span className="flex items-center gap-2">
                            {partner && <Image src={`/partners/${partner.name.toLocaleLowerCase()}.png`} alt={partner.name} width={64} height={64} />}
                            {partner?.name || "Select Partner"}
                        </span>
                        <span>▼</span>
                    </button>
                    {isOpen && (
                        <div className="absolute w-75 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                            <input ref={inputRef} value={searchTerm} type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 border-b border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black" />
                            {partners.map((partner) => (
                                <button
                                    key={partner.id}
                                    onClick={() => {
                                        setPartner(new Partner(partner.name, 0, 0));
                                        setIsOpen(false);
                                    }}
                                    className="w-75 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                                >
                                    <Image src={`/partners/${partner.name.toLocaleLowerCase()}.png`} alt={partner.name} width={64} height={64} />
                                    {partner.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <h1 className="m-1">Level</h1>
                <input type="number" className="w-32 m-1 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
                    min={1} max={60} value={level} 
                    onChange={(e) => setLevel(parseInt(e.target.value))} />
                <h1 className="m-1">Ego</h1>
                <input type="number" className="w-32 m-1 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
                    min={0} max={6} value={ego} 
                    onChange={(e) => setEgo(parseInt(e.target.value))} />
                <button 
                    className="m-1 btn-primary"
                    onClick={() => {
                        if (partner) {
                            savePartner(partner);
                        }
                    }}>
                    Save
                </button>
            </div>
          <Link href="/partners" className="m-1 btn-primary">
            Cancel
          </Link>
        </>
    );
}
