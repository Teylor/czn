"use client"

import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { Partner } from "../domain/partner/Partner";

export default function PartnerSelector(
  {
    keyUnique,
    disable,
    setPartner
  }: {
    keyUnique: string,
    disable: boolean,
    setPartner: (partner: Partner | undefined) => void
  }): JSX.Element {

    const [partners, setPartners] = useState<Partner[]>([])
    
    useEffect(() => {
        const Partners: Partner[] = JSON.parse(localStorage.getItem("partners") || "[]");
        const mappedPartners = Partners.map((p: Partner) => new Partner(p.name, 0, 0)) /* TODO */
        setPartners(mappedPartners);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<Partner | undefined>(undefined)

  return (
    <div className="relative md:col-span-3"> 
        <button 
            disabled={disable}
            onClick={() => setIsOpen(!isOpen)}
            className="w-50 px-3 py-4 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        >
            <span className="flex items-center gap-2">
                { selectedPartner && <Image src={selectedPartner.img} alt={selectedPartner.name} width={64} height={64} /> }
                { selectedPartner?.name || "Select Partner" }
            </span>
            <span>▼</span>
        </button>
        {
        isOpen && (
            <div className="absolute w-50 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                {partners.map((itPartner) => (
                    <button
                        key={`${keyUnique}-${itPartner.id}`}
                        onClick={() => {
                            setPartner((new Partner(itPartner.name, 0, 0)) ?? undefined);
                            setSelectedPartner((new Partner(itPartner.name, 0, 0)) ?? undefined)
                            setIsOpen(false);
                        }}
                        className="w-50 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                    >
                        <Image src={itPartner.img} alt={itPartner.name} width={64} height={64} />
                        {itPartner.name}
                    </button>
                ))}
            </div>
        )}
    </div>
  )
}
