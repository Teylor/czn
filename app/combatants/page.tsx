"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { IoMdAdd } from 'react-icons/io';
import { Combatant } from "@/lib/Combatants";

export default function Combatants(): JSX.Element {

  const [combatants, setCombatants] = useState<Combatant[]>([]);
  
  useEffect(() => {
    const combatants = JSON.parse(localStorage.getItem("combatants") || "[]");
      setCombatants(combatants);
    }, []);

    /* TODO add edit/remove button */

  return (
        <>
        <header>Combatants</header>
        <section className="my-8 container">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-5">
            {
              combatants.map((combatant) => (
                <div key={combatant?.id} className="border border-zinc-300 rounded-md p-4 flex flex-col items-center">
                  <h2 className="mb-2">{combatant?.name}</h2>
                  <Image src={`/combatants/${combatant?.img}.png`} alt={combatant?.name} width={64} height={64} />
                  <p>Level: {combatant?.level}</p>
                  <p>Ego: {combatant?.ego}</p>
                </div>
              ))
            }
          </div>
            <Link href="/combatants/add" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              <IoMdAdd className="mr-2" />
              Add Combatant
            </Link>
        </section>

        <Link href="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Home
        </Link>
        </>
    );
}