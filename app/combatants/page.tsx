"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { IoMdAdd } from 'react-icons/io';
import { Combatant } from "@/sections/domain/combatant/Combatant";

export default function Combatants(): JSX.Element {

  const [combatants, setCombatants] = useState<Combatant[]>([]);
  
  useEffect(() => {
      const Combatants = JSON.parse(localStorage.getItem("combatants") || "[]");
      setCombatants(Combatants);
    }, []);

  function handleDelete(id: string) {
    const next = combatants.filter((c) => c.id !== id);
    setCombatants(next);
    localStorage.setItem("combatants", JSON.stringify(next));
  }

  return (
      <>
        <section className="my-8 container">
          <Link href="/combatants/add" className="m-1 btn-primary">
            <IoMdAdd className="mr-2" />
            Add Combatant
          </Link>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-5">
            {
              combatants.map((combatant) => (
                <div key={combatant?.id} 
                className="relative w-full bg-gradient-to-br from-[#FD5613] to-[#62636E] border border-zinc-300 rounded-md p-4 flex flex-col items-center">
                  <button
                      aria-label="Delete combatant"
                      onClick={() => handleDelete(combatant.id as unknown as string)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
                    >
                      X
                    </button>

                  <Link
                    href={`/combatants/add/${combatant?.id}`}
                    key={combatant?.id} className="w-full h-full flex flex-col items-center">
                      <h2 className="mb-2 font-bold">{combatant?.name}</h2>
                      <Image src={combatant?.img} alt={combatant?.name} width={100} height={100} />
                      <p className="font-semibold">Level: {combatant?.level}</p>
                      <p className="font-semibold">Ego: {combatant?.ego}</p>
                  </Link>

                </div>
              ))
            }
          </div>
        </section>

        <Link href="/" className="m-1 btn-primary">
          Home
        </Link>
      </>
    );
}
