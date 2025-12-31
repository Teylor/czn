import Link from "next/link";
import { JSX } from "react";

export default function AddCombatant(
  {}: {}): JSX.Element {
  return (
        <>
            <div>
                <button>Select</button>
                {/* <h1>Potentials</h1> */}
                <h1>Ego</h1>
                <input type="text" />
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">Save</button>
            </div>
          <Link href="/combatants" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Cancel
          </Link>
        </>
    );
}