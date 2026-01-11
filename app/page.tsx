"use client";

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <header className="my-8 container text-center">
        <h1>Chaos Zero Nightmare Roster Manager</h1>
      </header>
      <section className="my-8 container">
        <div className="my-8 grid grid-cols-1 gap-1 md:grid-cols-3">
          <Link key="combatants-link" href="/combatants" className="btn-primary">
            Combatants
          </Link>
          <Link key="partners-link" href="/partners" className="md:col-start-3 btn-primary">
            Partners
          </Link>
        </div>
        <div className="my-8 grid grid-cols-1 gap-1 md:grid-cols-3">
          <Link key="savedata-link" href="/savedata" className="btn-primary">
            Save Datas
          </Link>
          <Link key="fragments-link" href="/fragments" className="md:col-start-3 btn-primary">
            Memory Fragments
          </Link>
        </div>
        <div className="my-8 grid grid-cols-1 gap-1 md:grid-cols-3">
          <Link key="builds-link" href="/builds" className="btn-primary">
            Builds
          </Link>
          <Link key="teams-link" href="/teams" className="md:col-start-3 btn-primary">
            Teams
          </Link>
        </div>
        <div className="my-8 grid grid-cols-1 gap-1 md:grid-cols-3">
          <Link key="save-data-calculator-link" href="/builds" className="md:col-start-2 btn-primary">
            Save Data Calculator (WIP)
          </Link>
          <Link key="fragments-scanner-link" href="/builds" className="md:col-start-2 btn-primary">
            Fragment Scanner (WIP)
          </Link>
        </div>
      </section>
      <footer className="my-8 container text-center ">
      </footer>
    </>
  );
}
