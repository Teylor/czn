"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

export default function Partners(
  {}: {}): JSX.Element {

    interface Partner { // TODO structure
      id: string;
      img: string | number;
      name: string;
      level: string | number;
      ego: string | number;
    }

        const [partners, setPartners] = useState<Partner[]>([]);

        useEffect(() => {
          const partners = JSON.parse(localStorage.getItem("partners") || "[]");
            setPartners(partners);
          }, []);

  return (
        <>
          <h1>Partners</h1>
          <section className="my-8 container">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-5">
            {
              partners.map((partner) => (
                <div key={partner?.id} className="border border-zinc-300 rounded-md p-4 flex flex-col items-center">
                  <h2 className="mb-2">{partner?.name}</h2>
                  <Image src={`/partners/${partner?.img}.png`} alt={partner?.name} width={64} height={64} />
                  <p>Level: {partner?.level}</p>
                  <p>Ego: {partner?.ego}</p>
                </div>
              ))
            }
          </div>
            <Link href="/partners/add" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              <IoMdAdd className="mr-2" />
              Add Partner
            </Link>
        </section>
          <Link href="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Home
          </Link>
        </>
    );
}