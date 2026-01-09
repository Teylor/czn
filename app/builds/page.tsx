"use client"

import { JSX, useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { IoMdAdd } from "react-icons/io";

export default function Builds({}: {}): JSX.Element {
    const [builds, setBuilds] = useState<any[]>([]);
      
    useEffect(() => {
      const Builds = JSON.parse(localStorage.getItem("builds") || "[]");
      setBuilds(Builds);
    }, []);

    function handleDelete(id: string) {
      const next = builds.filter((c) => c.id !== id);
      setBuilds(next);
      localStorage.setItem("builds", JSON.stringify(next));
    }

  return (
        <>
        <div className="my-8 container m-1">
          <Link href="/builds/add" className="m-1 btn-primary">
            <IoMdAdd className="mr-2" />
            Add Build
          </Link>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-5">
            {
              builds.map((build) => (
                <div key={build?.id} className="relative border border-zinc-300 rounded-md p-4 flex flex-col items-center">
                  <button
                      aria-label="Delete build"
                      onClick={() => handleDelete(build.id as unknown as string)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
                    >
                      X
                  </button>

                  <Link
                    href={`/builds/add/${build?.id}`}
                    key={build?.id} className="w-full h-full flex flex-col items-center">
                      <h2 className="mb-2">{build?.name}</h2>
                      <Image src={build?.img} alt={build?.name} width={64} height={64} />
                  </Link>

                </div>
              ))
            }
          </div>
        </div>
        <Link href="/" className="btn-primary m-1">
          Home
        </Link>
        </>
    );
}
