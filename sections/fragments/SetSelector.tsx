import { JSX, useState, useEffect, useRef } from "react"
import Image from "next/image";
import { SetType } from "../domain/memoryFragment/MemoryFragment";
import { MemoryFragmentSet, MF_SETS, getSetName } from "@/lib/MemoryFragments";

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

    const [selected, setSelected] = useState<MemoryFragmentSet | undefined>(undefined);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                if (isSetOpen) setIsSetOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSetOpen, setIsSetOpen]);

    return (
        <div ref={wrapperRef} className="relative grid md:col-start-2 text-center">
                <h1 className="m-3 text-lg text-[#FD5613] font-bold" style={{ WebkitTextStroke: "0.5px black" }}>Set Type</h1>
                <button 
                    disabled={disable}
                    onClick={() => setIsSetOpen(!isSetOpen)}
                    className="w-60 h-20 px-3 py-2 border 
                border-zinc-600 rounded-md font-bold text-xl text-black 
                text-left flex items-center justify-between focus:outline-none 
                focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400"
                style={{ backgroundColor: "#9d9d9d" }}
                >
                    <span className="flex items-center gap-2">
                        {selectedSet && <Image src={`/mf/${selectedSet}/1.png`} alt={selectedSet} width={64} height={64} /> || "Select Set" }
                        {selected?.name || getSetName(selectedSet)}
                    </span>
                    <span>▼</span>
                </button>
                {
                isSetOpen && (
                    <div className="absolute top-full left-0 right-0 border border-zinc-600 rounded-md z-10 w-80 h-auto max-h-120 overflow-y-auto"
                style={{ backgroundColor: "#9d9d9d" }}>
                        {MF_SETS.map((fs: MemoryFragmentSet) => (
                            <button
                                key={fs.id}
                                onClick={() => {
                                    setSelectedSet((fs.set as SetType) ?? undefined);
                                    setSelected(fs);
                                    setIsSetOpen(false);
                                }}
                                className="w-75 px-3 py-2 text-left flex items-center gap-2 font-bold hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
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