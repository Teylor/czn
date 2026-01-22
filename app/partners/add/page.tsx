"use client";

import Link from "next/link";
import { JSX } from "react";
import { useRouter } from "next/navigation";
import { Partner } from "@/sections/domain/partner/Partner";
import usePartner from "@/hooks/usePartner";
import PartnerSelector from "@/sections/shared/PartnerSelector";

export default function AddPartner(): JSX.Element {
    const router = useRouter();
    const { partner, setPartner, level, setLevel, ego, setEgo } = usePartner();

    function savePartner(partner: Partner) {
        const Partners = JSON.parse(localStorage.getItem("partners") || "[]");
        Partners.push(new Partner(partner.name, level, ego));
        localStorage.setItem("partners", JSON.stringify(Partners));
        router.push("/partners");
    }

  return (
        <>
            <div className="my-8 container">
                <PartnerSelector selected={partner} onSelect={(p) => setPartner(p)} />
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
