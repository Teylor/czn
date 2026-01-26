import { JSX } from "react";
import { MemoryFragment, Piece, Stat } from "../domain/memoryFragment/MemoryFragment";

export default function MainStatSelector(
    {
        isMainStatOpen,
        setIsMainStatOpen,
        selectedPieceType,
        selectedMainStat,
        setSelectedMainStat,
        mainStat,
        setMainStat,
        selectedFragment,
        disable
    }:
    {
        isMainStatOpen: boolean,
        setIsMainStatOpen: (isMainStatOpen: boolean) => void,
        selectedPieceType: Piece,
        selectedMainStat: Stat | undefined,
        setSelectedMainStat: (selectedMainStat: Stat) => void,
        mainStat: number,
        setMainStat: (mainStat: number) => void,
        selectedFragment: MemoryFragment | undefined,
        disable: boolean
    }
): JSX.Element {
    return (
        <div className="relative grid md:col-start-3 md:col-span-2 gap-1">
        {
            isMainStatOpen ? (
                <div className="absolute w-auto z-10 max-h-64 overflow-y-auto
                mt-1 border border-zinc-300 rounded-md 
                bg-[#9d9d9d]">
                    {selectedFragment?.getPossibleStats().map((main_stat: Stat) => (
                        <button
                            key={`ms-${main_stat}`}
                            onClick={() => {
                                setSelectedMainStat(main_stat);
                                setIsMainStatOpen(false);
                            }}
                            className="w-full h-15 font-bold 
                            flex items-center px-45
                            bg-[#9d9d9d] hover:bg-[#737373] 
                            border-b border-zinc-200 last:border-b-0"
                        >
                            {main_stat}
                        </button>
                    ))}
                </div>
            ) : (
                <button 
                disabled={disable}
                onClick={() => (selectedPieceType === Piece.IV || selectedPieceType === Piece.V || selectedPieceType === Piece.VI) 
                && setIsMainStatOpen(true)} className={`md:w-full m-5 px-3 py-2 font-bold gap-2 border-b border-zinc-200 
                ${(!disable && (selectedPieceType === Piece.IV || selectedPieceType === Piece.V || selectedPieceType === Piece.VI)) ? 'hover:bg-[#9d9d9d]' : 'cursor-not-allowed'}`}>
                    {selectedMainStat}
                </button>
            )
        }

        <input type="number"
        className="mx-3 w-23 ml-47 p-3 input-primary"
        min={0} max={37} value={mainStat} 
        onChange={(e) => setMainStat(parseFloat(e.target.value))} />
    </div>
    )
}