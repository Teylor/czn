"use client"

import { JSX, useState, useEffect } from "react";
import Image from "next/image";
import { SetType } from "../domain/memoryFragment/MemoryFragment";
import { MF_SETS } from "@/lib/MemoryFragments";

export default function SetsSelector(
  {
    uniqueKey,
    setSets,
  }: {
    uniqueKey: string,
    setSets: (sets: SetType[] | undefined) => void
  }): JSX.Element {

    interface selectedItem {
        id: string,
        name: string,
        set: SetType,
        img: string
    }
    const [selectedItems, setSelectedItems] = useState<selectedItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState(MF_SETS);

    const toggleSelect = (item: {id: string, set: SetType, name: string, img: string}) => {
        if (selectedItems.find(i => i.id === item.id)) {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    useEffect(() => {
        setSets(selectedItems.map(si => si.set))
    }, [selectedItems])

    return (
    <div className="flex flex-col w-full max-w-md gap-4 p-4 relative">
        <div className="flex flex-wrap gap-2 min-h-[45px]">
            {selectedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 px-2 py-1 bg-gray-100 border rounded-full text-sm">
                <img src={item.img} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span>{item.name}</span>
                <button onClick={() => toggleSelect(item)} className="hover:text-red-500">
                X
                </button>
            </div>
            ))}
        </div>

        <div className="relative">
            <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-2 border rounded-md bg-white shadow-sm hover:border-blue-400 transition-all"
            >
            <span className="text-gray-500">Select options...</span>
            ▼
            </button>

            {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {options.map((option) => {
                const isSelected = selectedItems.find(i => i.id === option.id);
                return (
                    <div
                        key={`${uniqueKey}-${option.id}`}
                        onClick={() => toggleSelect(option)}
                        className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-blue-50 transition-colors ${isSelected ? 'bg-blue-100' : ''}`}
                        >
                        <Image src={option.img} alt={option.name} className="rounded-full object-cover" width={25} height={25} />
                        <span className="flex-grow">{option.name}</span>
                        {isSelected && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                    </div>
                );
                })}
            </div>
            )}
        </div>
    </div>
    )
  }
