"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { IoMdAdd } from 'react-icons/io';
import { Partner } from "@/sections/domain/partner/Partner";

export default function Partners(): JSX.Element {

  const [partners, setPartners] = useState<Partner[]>([]);
  
  useEffect(() => {
    const Partners = JSON.parse(localStorage.getItem("partners") || "[]");
      setPartners(Partners);
    }, []);

  function handleDelete(id: string) {
    const next = partners.filter((c) => c.id !== id);
    setPartners(next);
    localStorage.setItem("partners", JSON.stringify(next));
  }

  return (
      <>
        <section className="my-8 container">
          <Link href="/partners/add" className="m-1 btn-primary">
              <IoMdAdd className="mr-2" />
              Add Partner
            </Link>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1 mx-1">
            {
              partners.map((partner) => (
                <div key={partner?.id} 
                className="w-75 h-50 border border-zinc-300 rounded-md p-4 flex flex-col items-center bg-linear-[-33deg,#FD5613_66%,white] relative">
                  <button
                      aria-label="Delete partner"
                      onClick={() => handleDelete(partner.id as unknown as string)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
                    >
                      X
                    </button>

                  <Link
                    href={`/partners/add/${partner?.id}`}
                    key={partner?.id} className="w-full h-full flex flex-col items-center">
                      <h2 className="mb-2 font-bold">{partner?.name}</h2>
                      <Image src={partner?.img} alt={partner?.name} width={100} height={100} />
                      <p className="font-semibold">Level: {partner?.level}</p>
                      <p className="font-semibold">Ego: {partner?.ego}</p>
                  </Link>

                </div>
              ))
            }
          </div>
        </section>
      </>
    );
}
