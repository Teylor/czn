import { JSX } from "react";
import { BaseMemoryFragment, SubStat } from "../domain/memoryFragment/MemoryFragment";

export default function SubStatSelector(
  {
    substatNumber,
    isSubStatOpen,
    setIsSubStatOpen,
    selectedSubStat,
    setSelectedSubStat,
    subStat,
    setSubStat,
    selectedFragment
  }: 
  {
    substatNumber: string,
    isSubStatOpen: boolean,
    setIsSubStatOpen: (isSubStatOpen: boolean) => void,
    selectedSubStat: Partial<SubStat> | null,
    setSelectedSubStat: (subStat: SubStat) => void,
    subStat: number,
    setSubStat: (subStatValue: number) => void,
    selectedFragment: BaseMemoryFragment | undefined
  }): JSX.Element {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
        {
        isSubStatOpen ? (
            selectedFragment?.getPossibleSubStats().map((iv_s_stat: SubStat) => ( /* TODO get list of correct sub stats (also remove main stat) */
                <button
                    key={`SS-${substatNumber}-${iv_s_stat}-${Date.now()}`} /* TODO revisar key */
                    onClick={() => {
                        setSelectedSubStat(iv_s_stat);
                        setIsSubStatOpen(false);
                    }}
                    className="w-auto px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                >
                    {iv_s_stat}
                </button>
            ))
            ) : (
                <button onClick={() => setIsSubStatOpen(true)} className="w-auto px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"> {/* TODO styles */}
                    {selectedSubStat || "Select Sub Stat 4"}
                </button>
            )
        }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
        <input type="number" step="0.1" 
            className="w-32 px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none" 
            min={0} value={subStat} onChange={(e) => setSubStat(parseFloat(e.target.value))} />
        </div>
    
    </div>
  );
}