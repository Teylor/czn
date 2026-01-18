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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1 mx-1 justify-items-center">
            {
              combatants.map((combatant) => (
                <div key={combatant?.id}
                  className="relative w-75 h-50 p4
                  border border-zinc-300 rounded-md flex flex-col 
                  bg-linear-[-33deg,#FD5613_66%,#9D9D9D] 
                  transition-transform duration-300 ease-out 
                  hover:[transform:perspective(500px)_rotateX(-5deg)_rotateY(5deg)] 
                  hover:z-5 hover:bg-linear-[-33deg,#FD5613_66%,white]">
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
      </>
    );
}
