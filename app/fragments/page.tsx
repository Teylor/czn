"use client";

import { MemoryFragment } from "@/sections/domain/memoryFragment/MemoryFragment";
import Link from "next/link";
import Image from "next/image"
import { JSX, useEffect, useState } from "react";
import { IoMdAdd, IoMdColorFilter  } from "react-icons/io";

export default function MemoryFragments(
  {

  }: {

  }): JSX.Element {

  const [fragments, setFragments] = useState<MemoryFragment[]>([]);
  const [filteredFragments, setFilteredFragments] = useState<MemoryFragment[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [setTypeFilter, setSetTypeFilter] = useState<string>("");
  const [mainStatFilter, setMainStatFilter] = useState<string>("");

  useEffect(() => {
    const Fragments = JSON.parse(localStorage.getItem("fragments") || "[]");
      setFragments(Fragments);
      setFilteredFragments(Fragments);
    }, []);

  function handleDelete(id: string) {
    const next = fragments.filter((f) => f.id !== id);
    setFragments(next);
    localStorage.setItem("fragments", JSON.stringify(next));
    // update filtered view as well
    setFilteredFragments((prev) => prev.filter((f) => f.id !== id));
  }

  function applyFilters() {
    const next = fragments.filter((f) => {
      const matchesSet = setTypeFilter ? f.setType === setTypeFilter : true;
      const mainKey = f.mainStat ? Object.keys(f.mainStat)[0] : undefined;
      const matchesMain = mainStatFilter ? mainKey === mainStatFilter : true;
      return matchesSet && matchesMain;
    });
    setFilteredFragments(next);
    setShowModal(false);
  }

  function resetFilters() {
    setSetTypeFilter("");
    setMainStatFilter("");
    setFilteredFragments(fragments);
  }

  const availableSetTypes = Array.from(new Set(fragments.map((f) => f.setType).filter(Boolean)));
  const availableMainStats = Array.from(new Set(fragments.map((f) => (f.mainStat ? Object.keys(f.mainStat)[0] : undefined)).filter(Boolean)));

  return (
        <>
          <section className="my-8 container">
            <div>
              <Link href="/fragments/add" className="btn-primary m-5">
                  <IoMdAdd className="mr-2" />
                  Add Memory Fragments
              </Link>
              <button className="btn-primary m-5" onClick={() => setShowModal(true)}>
                  <IoMdColorFilter className="mr-2" />
                  Filters
              </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1">
              {
                filteredFragments.map((fragment: MemoryFragment) => (
                  <div key={fragment?.id} 
                    className="relative border border-zinc-300 rounded-md p-4 
                    bg-linear-[-33deg,#FD5613_66%,#9D9D9D] 
                    transition-transform duration-300 ease-out 
                    hover:[transform:perspective(500px)_rotateX(-5deg)_rotateY(5deg)] 
                    hover:z-5 hover:bg-linear-[-33deg,#FD5613_66%,white]">
                    <button
                      aria-label="Delete fragment"
                      onClick={() => handleDelete(fragment.id as unknown as string)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
                    >
                      X
                    </button>
                    <Link
                    href={`/fragments/add/${fragment?.id}`}
                    key={`a-${fragment?.id}`} className="flex flex-col items-center">
                      <h2 className="mb-2 font-bold text-lg">{fragment?.setType}</h2>
                      <Image src={`${fragment?.img}`} alt={fragment?.id} width={64} height={64} />
                      <p className="mb-2 font-semibold">Level: {fragment?.level}</p>
                      <b>{Object.entries(fragment?.mainStat)[0]}</b>
                      {
                        fragment?.subStats && Object.entries(fragment.subStats).map(([key, value]) => (
                          <p className="font-semibold" key={`${fragment?.id}-${key}`}>{JSON.stringify(value)}</p>
                        ))
                      }
                    </Link>
                  </div>
                ))
              }
            </div>
          </section>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowModal(false)} />
              <div className="bg-white rounded-md p-6 z-10 w-11/12 max-w-md">
                <h3 className="text-lg mb-4">Filters</h3>
                <div className="mb-4">
                  <label className="block mb-1">Set Type</label>
                  <select value={setTypeFilter} onChange={(e) => setSetTypeFilter(e.target.value)} className="w-full border rounded px-2 py-1">
                    <option value="">All</option>
                    {availableSetTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Main Stat</label>
                  <select value={mainStatFilter} onChange={(e) => setMainStatFilter(e.target.value)} className="w-full border rounded px-2 py-1">
                    <option value="">All</option>
                    {availableMainStats.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button onClick={resetFilters} className="btn-secondary">Reset</button>
                  <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                  <button onClick={applyFilters} className="btn-primary">Apply</button>
                </div>
              </div>
            </div>
          )}
        </>
    );
}
