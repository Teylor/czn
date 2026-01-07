"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PARTNERS } from "@/lib/Partners";
import { Partner } from "@/sections/domain/partner/Partner";
import usePartner from "@/hooks/usePartner";

export default function AddPartner({ params }: { params: Promise<{ id: string }> }): JSX.Element {
    const router = useRouter();

    const [id, setId] = useState<{ id: string } | undefined>();
    const [isOpen, setIsOpen] = useState(false);
    const { partner, setPartner, level, setLevel, ego, setEgo } = usePartner();

    function savePartner(partner: Partner) {
            const Partners = JSON.parse(localStorage.getItem("partners") || "[]");
            if (Partners.find((p: Partner) => p.id === partner.id)) {
                const index = Partners.findIndex((p: Partner) => p.id === partner.id);
                Partners[index].level = level;
                Partners[index].ego = ego;
            } else {
                Partners.push(new Partner(partner.name, level, ego));
            }
            localStorage.setItem("partners", JSON.stringify(Partners));
            router.push("/partners");
        }

    useEffect(() => {
        params.then(p => {
            setId(p);
            const Partners: Partner[] = JSON.parse(localStorage.getItem("partners") || "[]");
            let partner: Partner | undefined = Partners.find(f => f.id == p.id);
            setPartner(partner);
            setLevel(partner ? partner.level : 1);
            setEgo(partner ? partner.ego : 0);
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
                            {partner && <Image src={`/partners/${partner.name.toLocaleLowerCase()}.png`} alt={partner.name} width={64} height={64} />}
                            {partner?.name || "Select Partner"}
                        </span>
                        <span>▼</span>
                    </button>
                    {isOpen && (
                        <div className="w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                            {PARTNERS.map((partner) => (
                                <button
                                    key={partner.id}
                                    onClick={() => {
                                        setPartner(new Partner(partner.name, 0, 0));
                                        setIsOpen(false);
                                    }}
                                    className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                                >
                                    <Image src={`/partners/${partner.name.toLocaleLowerCase()}.png`} alt={partner.name} width={64} height={64} />
                                    {partner.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <h1>Level</h1>
                <input type="number" className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
                    min={1} max={60} value={level} 
                    onChange={(e) => setLevel(parseInt(e.target.value))} />
                <h1>Ego</h1>
                <input type="number" className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
                    min={0} max={6} value={ego} 
                    onChange={(e) => setEgo(parseInt(e.target.value))} />
                <button 
                    className="btn-primary"
                    onClick={() => {
                        if (partner) {
                            savePartner(partner);
                        }
                    }}>
                    Save
                </button>
            </div>
          <Link href="/partners" className="btn-primary">
            Cancel
          </Link>
        </>
    );
}
