import Link from "next/link";
import { JSX } from "react";
import { IoMdAdd } from 'react-icons/io';

/* 
  TODO: Display list of owned combatants + button add.
  On click to combatnat display details (current lvl, ego, potentials, cards) + options to edit/delete. (Future: remaining materials to max + link to teams/builds where used)
  On click add open form to add new combatant. Select combatnat, level, potential and ego.
*/

export default function Combatants(
  {}: {}): JSX.Element {
  return (
        <>
        <header>Combatants</header>
        <section className="my-8 container">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
            <Link href="/combatants/add" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              <IoMdAdd className="mr-2" />
              Add Combatant
            </Link>
          </div>
        </section>

        <Link href="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Home
        </Link>
        </>
    );
}