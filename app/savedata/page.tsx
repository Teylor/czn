"use client"

import { JSX, useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { IoMdAdd } from "react-icons/io";

export default function SaveData({}: {}): JSX.Element {
    const [saveData, setSaveData] = useState<any[]>([]);
      
    useEffect(() => {
      const SaveData = JSON.parse(localStorage.getItem("savedata") || "[]");
      setSaveData(SaveData);
    }, []);

    function handleDelete(id: string) {
      const next = saveData.filter((c) => c.id !== id);
      setSaveData(next);
      localStorage.setItem("savedata", JSON.stringify(next));
    }

    function handleToggleOwned(id: string) {
      const next = saveData.map((sd) => {
        if (sd.id === id) {
          return { ...sd, owned: !sd.owned };
        }
        return sd;
      });
      setSaveData(next);
      localStorage.setItem("savedata", JSON.stringify(next));
    }

  return (
        <>
        <div className="my-8 container m-1">
          <Link href="/savedata/add" className="m-1 btn-primary">
            <IoMdAdd className="mr-2" />
            Add Save Data
          </Link>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1 mx-1">
            {
              saveData.map((sd) => (
                <div key={sd?.id} className="relative border border-zinc-300 rounded-md p-4 flex flex-col items-center bg-linear-[-33deg,#FD5613_66%,white]">
                  <button
                      aria-label="Delete save data"
                      onClick={() => handleDelete(sd.id as unknown as string)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
                    >
                      X
                  </button>

                  <button
                    onClick={() => handleToggleOwned(sd.id)}
                    className="absolute top-1 left-1 inline-flex items-center h-6 rounded-full w-20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{ backgroundColor: sd.owned ? '#22c55e' : '#3b82f6' }}
                  >
                    <span
                      className="inline-block h-5 w-9 transform rounded-full bg-white transition-transform text-xs font-bold flex items-center justify-center"
                      style={{ transform: sd.owned ? 'translateX(44px)' : 'translateX(1px)' }}
                    >
                      {sd.owned ? 'Owned' : 'LF'}
                    </span>
                  </button>

                  <Link
                    href={`/savedata/add/${sd?.id}`}
                    key={sd?.id} className="w-full h-full flex flex-col items-center">
                      <h2 className="mb-2 text-lg font-bold">{sd?.name}</h2>
                      <Image src={sd?.img} alt={sd?.name} width={100} height={100} />
                      <div className="grid grid-cols-3 gap-1">
                        { sd?.equipment?.weapon?.img ? <Image src={sd?.equipment?.weapon?.img} alt={sd?.name} width={40} height={40} /> : "X" } {/* TODO replace X for empty image */}
                        { sd?.equipment?.armor?.img ? <Image src={sd?.equipment?.armor?.img} alt={sd?.name} width={40} height={40} /> : "X" }
                        { sd?.equipment?.ring?.img ? <Image src={sd?.equipment?.ring?.img} alt={sd?.name} width={40} height={40} /> : "X" }
                      </div>
                  </Link>

                </div>
              ))
            }
          </div>
        </div>
        </>
    );
}
