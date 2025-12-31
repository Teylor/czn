import { headers } from 'next/headers'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <header className="my-8 container text-center">
        <h1>Chaos Zero Nightmare Roster Manager</h1>
      </header>
      <section className="my-8 container">
        <div className="my-8 grid grid-cols-1 gap-1 md:grid-cols-3">
          <Link href="/combatants" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Combatants
          </Link>
          <Link href="/partners" className="md:col-start-3 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Partners
          </Link>
        </div>
        <div className="my-8 grid grid-cols-1 gap-1 md:grid-cols-3">
          <Link href="/teams" className="md:col-start-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Teams
          </Link>
        </div>
        <div className="my-8 grid grid-cols-1 gap-1 md:grid-cols-3">
          <Link href="/builds" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Builds
          </Link>
          <Link href="/fragments" className="md:col-start-3 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Memory Fragments
          </Link>
        </div>
      </section>
    </>
  );
}
