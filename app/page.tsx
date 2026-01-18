"use client";

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <header className="my-8 container text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-white">CHAOS </span>
          <span className="text-[#FD5613]">ZERO </span>
          <span className="text-white">NIGHTMARE</span>
          <span className="block text-2xl md:text-3xl mt-2 text-black font-medium">
            Roster Manager
          </span>
        </h1>
      </header>
      <section className="my-8 container">
        <div className="m-1 sm:m-10 grid grid-cols-1 gap-1 md:grid-cols-2">
          <Link key="combatants-link" href="/combatants" className="btn-home justify-self-center translation-right-home">
            Combatants
          </Link>
          <Link key="partners-link" href="/partners" className="btn-home justify-self-center translation-left-home">
            Partners
          </Link>
        </div>
        <div className="m-1 sm:m-10 grid grid-cols-1 gap-1">
          {/* <Link key="builds-link" href="/builds" className="btn-home justify-self-center translation-right-home">
            Builds
          </Link> */}
          <Link key="teams-link" href="/teams" className="btn-home justify-self-center">
            Teams
          </Link>
        </div>
        <div className="m-1 sm:m-10 grid grid-cols-1 gap-1 md:grid-cols-2">
          <Link key="savedata-link" href="/savedata" className="btn-home justify-self-center translation-right-home">
            Save Datas
          </Link>
          <Link key="fragments-link" href="/fragments" className="btn-home justify-self-center translation-left-home">
            Memory Fragments
          </Link>
        </div>
        
        <div className="m-1 sm:m-10 grid grid-cols-1 gap-1">
          <Link key="save-data-calculator-link" href="/builds" className="btn-home justify-self-center cursor-not-allowed opacity-50">
            Save Data Calculator (WIP)
          </Link>
          <Link key="fragments-scanner-link" href="/builds" className="btn-home justify-self-center cursor-not-allowed opacity-50">
            Fragment Scanner (WIP)
          </Link>
        </div>
      </section>
      <footer className="fixed bottom-0 left-0 right-0  py-4 text-center text-white bg-black xs:static">
        <p className="text-sm">
          &copy; 2024 Chaos Zero Nightmare Roster Manager. All rights reserved.
        </p>
      </footer>
    </>
  );
}
