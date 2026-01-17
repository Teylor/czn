"use client"

import Image from "next/image";
import { JSX, useState, useEffect } from "react";

interface SaveDataItem { /* TODO domain */
    id: string;
    name: string;
    img: string;
    owned?: boolean;
    combatant: string;
    equipment?: {
        weapon?: { img: string };
        armor?: { img: string };
        ring?: { img: string };
    };
}

export default function SaveDataSelector(
  {
    keyUnique,
    disable,
    combatant,
    setSaveData,
  }: {
    keyUnique: string,
    disable: boolean,
    combatant: string,
    setSaveData: (saveData: SaveDataItem | undefined) => void
  }): JSX.Element {

    const [saveDataList, setSaveDataList] = useState<SaveDataItem[]>([]);

    useEffect(() => {
        const SaveData: SaveDataItem[] = JSON.parse(localStorage.getItem("savedata") || "[]");
        const filteredSaveData = SaveData.filter(data => data.combatant === combatant);
        setSaveDataList(filteredSaveData);
    }, [combatant]);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedSaveData, setSelectedSaveData] = useState<SaveDataItem | undefined>(undefined);

  return (
    <div className="relative">
        <button
            disabled={disable}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-4 border border-zinc-300 rounded-md bg-white text-sm text-zinc-900 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        >
            <span className="flex items-center gap-2">
                { selectedSaveData && <Image src={selectedSaveData.img} alt={selectedSaveData.name} width={48} height={48} /> }
                { selectedSaveData?.name || "Select Save Data" }
            </span>
            <span>▼</span>
        </button>
        {
        isOpen && (
            <div className="absolute w-full top-full left-0 right-0 mt-1 border border-zinc-300 rounded-md bg-white z-10 max-h-64 overflow-y-auto">
                <button
                    key={`${keyUnique}-none`}
                    onClick={() => {
                        setSaveData(undefined);
                        setSelectedSaveData(undefined);
                        setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200"
                >
                    None
                </button>
                {saveDataList.map((item) => (
                    <button
                        key={`${keyUnique}-${item.id}`}
                        onClick={() => {
                            setSaveData(item);
                            setSelectedSaveData(item);
                            setIsOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 border-b border-zinc-200 last:border-b-0"
                    >
                        <Image src={item.img} alt={item.name} width={48} height={48} />
                        <div className="flex flex-col">
                            <span>{item.name}</span>
                            {item.equipment && (
                                <div className="flex gap-1">
                                    {item.equipment.weapon?.img && <Image src={item.equipment.weapon.img} alt="weapon" width={20} height={20} />}
                                    {item.equipment.armor?.img && <Image src={item.equipment.armor.img} alt="armor" width={20} height={20} />}
                                    {item.equipment.ring?.img && <Image src={item.equipment.ring.img} alt="ring" width={20} height={20} />}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        )}
    </div>
  )
}
