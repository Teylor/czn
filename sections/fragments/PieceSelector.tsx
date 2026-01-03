import { JSX } from "react";
import Image from "next/image";
import { PIECE_TYPES, SetType } from "@/lib/MemoryFragments";
import { Piece } from "../domain/memoryFragment/MemoryFragment";

export default function PieceSelector(
{
    selectedSet,
    isPieceTypeOpen,
    setIsPieceTypeOpen,
    selectedPieceType,
    setSelectedPieceType
}:
{
    selectedSet: SetType | null,
    isPieceTypeOpen: boolean,
    setIsPieceTypeOpen: (isPieceTypeOpen: boolean) => void,
    selectedPieceType: Piece | null,
    setSelectedPieceType: (selectedPieceType: Piece) => void
}): JSX.Element {
    return (
        <div className="grid md:col-start-4">
        {
        selectedSet != SetType.NULL && (
            <div className="text-center">
            <h1>Piece Type</h1>
            <button 
                onClick={() => setIsPieceTypeOpen(!isPieceTypeOpen)}
                className="w-50 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <span className="flex items-center gap-2">
                    {selectedPieceType && 
                        <Image src={`/mf/${selectedSet}/${PIECE_TYPES.find(pt => pt.piece === selectedPieceType)?.piece}.png`} alt={selectedPieceType.toString()} width={64} height={64} />}
                    {selectedPieceType || "Select Piece"}
                </span>
                <span>▼</span>
            </button>
            </div>
            )
        }
        {
            selectedSet && isPieceTypeOpen && (
                <div className="w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {PIECE_TYPES.map((pt) => (
                        <button
                            key={pt.id}
                            onClick={() => {
                                setSelectedPieceType(pt.piece);
                                setIsPieceTypeOpen(false);
                                /* TODO resets */
                            }}
                            className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            <Image src={`/mf/${selectedSet}/${pt.piece}.png`} alt={pt.piece.toString()} width={64} height={64} />
                            {pt.piece}
                        </button>
                    ))}
                </div>
            )
        }
        </div>
    )
}