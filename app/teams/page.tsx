import Link from "next/link";
import { JSX } from "react";
import { IoMdAdd } from "react-icons/io";

export default function Teams(
  {}: {}): JSX.Element {
  return (
        <>
          <section className="my-8 container">
          <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
            <Link href="/teams/add" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              <IoMdAdd className="mr-2" />
              Add Team
            </Link>
          </div>
        </section>
        </>
    );
}