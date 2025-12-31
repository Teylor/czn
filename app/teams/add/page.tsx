import Link from "next/link";
import { JSX } from "react";

export default function Partners(
  {}: {}): JSX.Element {
  return (
        <>
          <h1>Copy old version here</h1>
          <Link href="/teams" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Cancel
          </Link>
        </>
    );
}