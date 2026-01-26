import { JSX } from "react";
import { MemoryFragment, SubStat } from "../domain/memoryFragment/MemoryFragment";

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
    substatNumber: number,
    isSubStatOpen: boolean,
    setIsSubStatOpen: (isSubStatOpen: boolean) => void,
    selectedSubStat: Partial<SubStat> | undefined,
    setSelectedSubStat: (subStat: SubStat) => void,
    subStat: number,
    setSubStat: (subStatValue: number) => void,
    selectedFragment: MemoryFragment | undefined
  }): JSX.Element {

          return (
    <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
        {
        isSubStatOpen ? (
            selectedFragment?.getPossibleSubStats()?.map((iv_s_stat: SubStat) => (
                <button
                    key={`SS-${substatNumber}-${iv_s_stat}`}
                    onClick={() => {
                        setSelectedSubStat(iv_s_stat);
                        setIsSubStatOpen(false);
                    }}
                    className="w-auto px-3 py-2 gap-2
                    text-left font-bold 
                    flex items-center 
                    bg-[#9d9d9d] hover:bg-[#737373] 
                    border-b border-zinc-200"
                >
                    {iv_s_stat}
                </button>
            ))
            ) : (
                <button onClick={() => setIsSubStatOpen(true)} 
                className="w-auto px-3 py-2 text-left font-bold flex items-center gap-2 
                hover:bg-[#9d9d9d] border-b border-zinc-200 last:border-b-0">
                    {selectedSubStat || `Select Sub Stat ${substatNumber}`}
                </button>
            )
        }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
        <input type="number" step="0.1"
            className="input-primary mx-3 w-23 p-3"
            min={0} value={subStat} onChange={(e) => setSubStat(parseFloat(e.target.value))} />
        </div>
    
    </div>
  );
}