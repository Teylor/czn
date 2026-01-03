"use client";

import { BaseMemoryFragment } from "@/sections/domain/memoryFragment/MemoryFragment";
import Link from "next/link";
import Image from "next/image"
import { JSX, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function MemoryFragments(
  {

  }: {

  }): JSX.Element {

  const [fragments, setFragments] = useState<BaseMemoryFragment[]>([]);

  useEffect(() => {
    const Fragments = JSON.parse(localStorage.getItem("fragments") || "[]");
      setFragments(Fragments);
    }, []);

  function handleDelete(id: string) {
    const next = fragments.filter((f) => f.id !== id);
    setFragments(next);
    localStorage.setItem("fragments", JSON.stringify(next));
  }

  return (
        <>
          <h1>Memory Fragments</h1>
          <section className="my-8 container">
            
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-5">
              {
                fragments.map((fragment: BaseMemoryFragment) => (
                  <div key={fragment?.id} className="relative border border-zinc-300 rounded-md p-4">
                    <button
                      aria-label="Delete fragment"
                      onClick={() => handleDelete(fragment.id as unknown as string)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
                    >
                      ×
                    </button>
                    <Link
                    href={`/fragments/add/${fragment?.id}`}
                    key={fragment?.id} className="flex flex-col items-center">
                      <h2 className="mb-2">{fragment?.setType}</h2>
                      <Image src={`${fragment?.img}`} alt={fragment?.id} width={64} height={64} />
                      <p>Level: {fragment?.level}</p>
                      <b>{Object.entries(fragment?.mainStat)[0]}</b>
                      {
                        fragment?.subStats && Object.entries(fragment.subStats).map(([key, value]) => (
                          <p key={`${fragment?.id}-${key}`}>{JSON.stringify(value)}</p>
                        ))
                      }
                    </Link>
                  </div>
                ))
              }
            </div>
            
            <Link href="/fragments/add" className="btn-primary">
              <IoMdAdd className="mr-2" />
              Add Memory Fragments
            </Link>
          </section>
          <Link href="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Home
          </Link>
        </>
    );
}