import { JSX } from "react"
import Image from "next/image";
import { SetType } from "../domain/memoryFragment/MemoryFragment";
import { MF_SETS } from "@/lib/MemoryFragments";

export default function SetSelector({
    isSetOpen,
    setIsSetOpen,
    selectedSet,
    setSelectedSet,
    disable
}:
{
    isSetOpen: boolean,
    setIsSetOpen: (isSubStatOpen: boolean) => void,
    selectedSet: SetType | undefined,
    setSelectedSet: (selectedSet: SetType | undefined) => void,
    disable: boolean
}):JSX.Element {
    return (
        <div className="relative grid md:col-start-2 text-center">
                <h1>Set</h1>
                <button 
                    disabled={disable}
                    onClick={() => setIsSetOpen(!isSetOpen)}
                    className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                >
                    <span className="flex items-center gap-2">
                        {selectedSet && <Image src={`/mf/${selectedSet}/1.png`} alt={selectedSet} width={64} height={64} /> || "Select Set" }
                    </span>
                    <span>▼</span>
                </button>
                {
                isSetOpen && (
                    <div className="absolute w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-12 max-h-64 overflow-y-auto">
                        {MF_SETS.map((fs) => (
                            <button
                                key={fs.id}
                                onClick={() => {
                                    setSelectedSet((fs.set as SetType) ?? undefined);
                                    setIsSetOpen(false);
                                }}
                                className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                            >
                                <Image src={`/mf/${fs.set}/1.png`} alt={fs.set} width={64} height={64} />
                                {fs.name}
                            </button>
                        ))}
                    </div>
                )}
        </div>
    )
}