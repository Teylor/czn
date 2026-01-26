import { JSX, useEffect, useRef, useState} from "react";
import Image from "next/image";
import { PIECE_TYPES, PieceType, getRoman } from "@/lib/MemoryFragments";
import { Piece, SetType } from "../domain/memoryFragment/MemoryFragment";

export default function PieceSelector(
{
    selectedSet,
    isPieceTypeOpen,
    setIsPieceTypeOpen,
    selectedPieceType,
    setSelectedPieceType,
    disable
}:
{
    selectedSet: SetType | undefined,
    isPieceTypeOpen: boolean,
    setIsPieceTypeOpen: (isPieceTypeOpen: boolean) => void,
    selectedPieceType: Piece | undefined,
    setSelectedPieceType: (selectedPieceType: Piece) => void
    disable: boolean
}): JSX.Element {

    const [selected, setSelected] = useState<PieceType | undefined>(undefined);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                if (isPieceTypeOpen) setIsPieceTypeOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isPieceTypeOpen, setIsPieceTypeOpen]);
    return (
        <div ref={wrapperRef} className="relative grid md:col-start-5">
        {
        selectedSet && (
            <div className="text-center">
            <h1 className="m-3 text-lg text-[#FD5613] font-bold" style={{ WebkitTextStroke: "0.5px black" }}>Piece Type</h1>
            <button 
                disabled={disable}
                onClick={() => setIsPieceTypeOpen(!isPieceTypeOpen)}
                className="w-60 h-20 px-3 py-2 border 
                border-zinc-600 rounded-md font-bold text-xl text-black 
                text-left flex items-center justify-between focus:outline-none 
                focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400"
                style={{ backgroundColor: "#9d9d9d" }}
            >
                <span className="flex items-center gap-2">
                    {selectedPieceType && 
                        <Image src={`/mf/${selectedSet}/${PIECE_TYPES.find(pt => pt.piece === selectedPieceType)?.piece}.png`} alt={selectedPieceType.toString()} width={64} height={64} />}
                    {selected?.roman || getRoman(selectedPieceType) || "Select Piece"}
                </span>
                <span>▼</span>
            </button>
            </div>
            )
        }
        {
            selectedSet && isPieceTypeOpen && (
                <div className="absolute top-full left-1 right-1 border border-zinc-600 rounded-md z-10 w-60 h-auto max-h-120 overflow-y-auto overflow-x-hidden"
                style={{ backgroundColor: "#9d9d9d" }}>
                    {PIECE_TYPES.map((pt: PieceType) => (
                        <button
                            key={pt.id}
                            onClick={() => {
                                setSelectedPieceType(pt.piece);
                                setSelected(pt);
                                setIsPieceTypeOpen(false);
                            }}
                            className="w-100 px-3 py-2 text-left font-bold flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            <Image src={`/mf/${selectedSet}/${pt.piece}.png`} alt={pt.piece.toString()} width={64} height={64} />
                            {pt.roman}
                        </button>
                    ))}
                </div>
            )
        }
        </div>
    )
}