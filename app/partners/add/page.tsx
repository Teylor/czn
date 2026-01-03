"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { PARTNERS, Partner } from "@/lib/Partners";

export default function AddPartner(): JSX.Element {

    const router = useRouter();
    const [selectedPartner, setSelectedPartner] = useState<Partner | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [level, setLevel] = useState<number>(1);
    const [ego, setEgo] = useState<number>(0);

    function savePartner(partner: Partner) {
        const partners = JSON.parse(localStorage.getItem("partners") || "[]");
        const existingPartner = partners.find((p: Partner) => p.name === partner.name);
        if (existingPartner) {
            const suffix = partners.filter((p: Partner) => p.name === partner.name).length;
            const newPartner = { id: `${partner.id}-${suffix}`, img: partner.id, name: partner.name, level: level, ego: ego };
            partners.push(newPartner);
        } else {
            partners.push({ id: `${partner.id}-0`, img: partner.id, name: partner.name, level: level, ego: ego });
        }
        localStorage.setItem("partners", JSON.stringify(partners));
        router.push("/partners");
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
                            {selectedPartner && <Image src={`/partners/${selectedPartner.id}.png`} alt={selectedPartner.name} width={64} height={64} />}
                            {selectedPartner?.name || "Select Partner"}
                        </span>
                        <span>▼</span>
                    </button>
                    {isOpen && (
                        <div className="w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                            {PARTNERS.map((partner) => (
                                <button
                                    key={partner.id}
                                    onClick={() => {
                                        setSelectedPartner(partner);
                                        setIsOpen(false);
                                    }}
                                    className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                                >
                                    <Image src={`/partners/${partner.id}.png`} alt={partner.name} width={64} height={64} />
                                    {partner.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <h1>Level</h1>
                <input type="number" className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" min={1} max={60} value={level} onChange={(e) => setLevel(parseInt(e.target.value))} />
                <h1>Ego</h1>
                <input type="number" className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" min={0} max={4} value={ego} onChange={(e) => setEgo(parseInt(e.target.value))} />
                <button 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                onClick={() => {
                    if (selectedPartner) {
                        savePartner(selectedPartner);
                    }
                }}>
                    Save
                </button>
            </div>
          <Link href="/partners" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Cancel
          </Link>
        </>
    );
}
