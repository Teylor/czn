import { JSX } from "react";
import { MemoryFragment, Piece, Stat } from "../domain/memoryFragment/MemoryFragment";
//import { FIVE_POSSIBLE_STATS, FOUR_POSSIBLE_STATS, SIX_POSSIBLE_STATS } from "@/lib/MemoryFragments"; /* TODO remove, change for custom + change posible to stat */

export default function MainStatSelector(
    {
        isMainStatOpen,
        setIsMainStatOpen,
        selectedPieceType,
        selectedMainStat,
        setSelectedMainStat,
        mainStat,
        setMainStat,
        selectedFragment
    }:
    {
        isMainStatOpen: boolean,
        setIsMainStatOpen: (isMainStatOpen: boolean) => void,
        selectedPieceType: Piece,
        selectedMainStat: Stat | undefined,
        setSelectedMainStat: (selectedMainStat: Stat) => void,
        mainStat: number,
        setMainStat: (mainStat: number) => void,
        selectedFragment: MemoryFragment | undefined
    }
): JSX.Element {
    return (
        <div className="my-8 grid col-start-2 gap-1">
        {
            isMainStatOpen ? (
                <div className="w-100 top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                    {selectedFragment?.getPossibleStats().map((iv_stat: Stat) => ( /* TODO */
                        <button
                            key={`IV-${iv_stat}`}
                            onClick={() => {
                                setSelectedMainStat(iv_stat);
                                setIsMainStatOpen(false);
                            }}
                            className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                        >
                            {iv_stat}
                        </button>
                    ))}
                </div>
            ) : (
                <button onClick={() => (selectedPieceType === Piece.IV || selectedPieceType === Piece.V || selectedPieceType === Piece.VI) 
                && setIsMainStatOpen(true)} className="w-100 px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"> {/* TODO styles */}
                    {selectedMainStat}
                </button>
            )
        }

        <input type="number" step="0.1"
        className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
        min={0} value={mainStat} 
        onChange={(e) => setMainStat(parseFloat(e.target.value))} />
    </div>
    )
}