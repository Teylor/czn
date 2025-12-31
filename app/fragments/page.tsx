import Link from "next/link";
import { JSX } from "react";

export default function MemoryFragments(
  {}: {}): JSX.Element {
  return (
        <>
          <h1>Memory Fragments</h1>
          <Link href="/" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Home
          </Link>
        </>
    );
}