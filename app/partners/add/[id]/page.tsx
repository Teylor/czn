"use client";

import Link from "next/link";
import { JSX, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Partner } from "@/sections/domain/partner/Partner";
import usePartner from "@/hooks/usePartner";
import PartnerSelector from "@/sections/shared/PartnerSelector";

export default function AddPartner({ params }: { params: Promise<{ id: string }> }): JSX.Element {
    const router = useRouter();

    const [id, setId] = useState<{ id: string } | undefined>();
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
                <PartnerSelector disable={true} selected={partner} onSelect={(p) => setPartner(p)} />
                <h1 className="m-3 text-lg text-[#FD5613] font-bold" style={{ WebkitTextStroke: "0.5px black" }}>Level</h1>
                <input type="number" min={1} max={60} value={level}
                    className="mx-3 w-20 p-3 input-primary"
                    onChange={(e) => setLevel(parseInt(e.target.value))} />
                <h1 className="m-3 text-lg text-[#FD5613] font-bold" style={{ WebkitTextStroke: "0.5px black" }}>Ego</h1>
                <input type="number" min={0} max={6} value={ego}
                    className="mx-3 w-20 p-3 input-primary"
                    onChange={(e) => setEgo(parseInt(e.target.value))} />
            </div>
            <button
                className={`m-1 w-20 h-10 ${!partner ? 'btn-disabled' : 'btn-primary'}`}
                onClick={() => {
                    if (partner) {
                        savePartner(partner);
                    }
                }}>
                Save
            </button>
            <Link href="/partners" className="m-1 w-20 h-10 btn-primary">
                Cancel
            </Link>
        </>
    );
}
