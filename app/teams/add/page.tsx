"use client"

import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CraftedMemoryFragment, SetType, MemoryFragmentsEquipped } from "@/sections/domain/memoryFragment/MemoryFragment";
import CombatantSelector from "@/sections/teams/CombatantSelector";
import PartnerSelector from "@/sections/teams/PartnerSelector";
import SaveDataSelector from "@/sections/teams/SaveDataSelector";
import MemoryFragmentsManual from "@/sections/teams/MemoryFragmentsManual";
import MemoryFragmentsBis from "@/sections/teams/MemoryFragmentsBis";
import SetsSelector from "@/sections/teams/SetsSelector";
import useTeamMembers from "@/hooks/useTeamMembers";

export default function Teams(
  {

  }: {

  }): JSX.Element {
    const router = useRouter();

    const { members, setCombatantAt, setPartnerAt, setMFAt } = useTeamMembers();

    const [mfSets1, setSets1] = useState<SetType[] | undefined>(undefined);
    const [mfSets2, setSets2] = useState<SetType[] | undefined>(undefined);
    const [mfSets3, setSets3] = useState<SetType[] | undefined>(undefined);
    const [bisSystem1, setBisSystem1] = useState(false);
    const [bisSystem2, setBisSystem2] = useState(false);
    const [bisSystem3, setBisSystem3] = useState(false);

    function saveTeam() {
      const Teams = JSON.parse(localStorage.getItem("teams") || "[]");

      Teams.push({ 
          member1: members[0],
          member2: members[1],
          member3: members[2]
        });

      localStorage.setItem("teams", JSON.stringify(Teams));
      router.push("/teams");
    }

  return (
    <>
        <div className="my-8 container text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {
              Array.from({ length: 3 }, (_, i) => (
                <div key={`Teams-Member-${i+1}`} className="grid grid-cols-1 md:grid-cols-6">
                <CombatantSelector
                  key={`Teams-CS${i+1}`}
                  keyUnique={`Teams-CS${i+1}`}
                  disable={false}
                  setCombatant={(combatant) => setCombatantAt(i, combatant)}
                />
                <PartnerSelector
                  key={`Teams-PS${i+1}`}
                  keyUnique={`Teams-PS${i+1}`}
                  disable={false}
                  setPartner={(partner) => setPartnerAt(i, partner)}
                />
                <div className="md:col-span-6 p-2">
                  <SaveDataSelector
                    key={`Teams-SD${i+1}`}
                    keyUnique={`Teams-SD${i+1}`}
                    disable={false}
                    combatant={members[i]?.combatant?.name || ""}
                    setSaveData={() => {}}
                  />
                </div>
                <div className="md:col-span-6 m-4">
                  <div className="flex items-center justify-center space-x-4">
                  <span
                    className={`text-sm font-medium ${
                    !(i === 0 ? bisSystem1 : i === 1 ? bisSystem2 : bisSystem3)
                      ? "text-blue-600"
                      : "text-gray-500"
                    }`}
                  >
                    Manual Assignation
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={i === 0 ? bisSystem1 : i === 1 ? bisSystem2 : bisSystem3}
                    onChange={() => {
                      if (i === 0) setBisSystem1((v) => !v);
                      else if (i === 1) setBisSystem2((v) => !v);
                      else setBisSystem3((v) => !v);
                    }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span
                    className={`text-sm font-medium ${
                    i === 0 ? bisSystem1 : i === 1 ? bisSystem2 : bisSystem3
                      ? "text-blue-600"
                      : "text-gray-500"
                    }`}
                  >
                    Bis System
                  </span>
                  </div>
                </div>
                <div className="md:col-span-6">
                  <SetsSelector
                    key={`Teams-SS-${i + 1}`}
                    uniqueKey={`Teams-SS-${i + 1}`}
                    setSets={i === 0 ? setSets1 : i === 1 ? setSets2 : setSets3}
                  />
                </div>
                {(i === 0 ? bisSystem1 : i === 1 ? bisSystem2 : bisSystem3) ?
                  <>
                  <MemoryFragmentsBis 
                      key={`Teams-Bis-${i + 1}`}
                      uniqueKey={`Teams-Bis-${i + 1}`}
                      sets={i === 0 ? mfSets1 : i === 1 ? mfSets2 : mfSets3}
                      setMFI={( mf?: CraftedMemoryFragment) => setMFAt(i, 'I' as keyof MemoryFragmentsEquipped, mf)}
                      setMFII={( mf?: CraftedMemoryFragment) => setMFAt(i, 'II' as keyof MemoryFragmentsEquipped, mf)}
                      setMFIII={( mf?: CraftedMemoryFragment) => setMFAt(i, 'III' as keyof MemoryFragmentsEquipped, mf)}
                      setMFIV={( mf?: CraftedMemoryFragment) => setMFAt(i, 'IV' as keyof MemoryFragmentsEquipped, mf)}
                      setMFV={( mf?: CraftedMemoryFragment) => setMFAt(i, 'V' as keyof MemoryFragmentsEquipped, mf)}
                      setMFVI={( mf?: CraftedMemoryFragment) => setMFAt(i, 'VI' as keyof MemoryFragmentsEquipped, mf)}
                    />
                  </>
                  :
                  <>
                    <MemoryFragmentsManual 
                      key={`Teams-Manual-${i + 1}`}
                      uniqueKey={`Teams-Manual-${i + 1}`}
                      sets={i === 0 ? mfSets1 : i === 1 ? mfSets2 : mfSets3}
                      setMFI={(mf?: CraftedMemoryFragment) => setMFAt(i, 'I' as keyof MemoryFragmentsEquipped, mf)}
                      setMFII={(mf?: CraftedMemoryFragment) => setMFAt(i, 'II' as keyof MemoryFragmentsEquipped, mf)}
                      setMFIII={(mf?: CraftedMemoryFragment) => setMFAt(i, 'III' as keyof MemoryFragmentsEquipped, mf)}
                      setMFIV={(mf?: CraftedMemoryFragment) => setMFAt(i, 'IV' as keyof MemoryFragmentsEquipped, mf)}
                      setMFV={(mf?: CraftedMemoryFragment) => setMFAt(i, 'V' as keyof MemoryFragmentsEquipped, mf)}
                      setMFVI={(mf?: CraftedMemoryFragment) => setMFAt(i, 'VI' as keyof MemoryFragmentsEquipped, mf)}
                    />
                  </>
                }
              </div>
              ))
            }
          </div>
        </div>
        <button className="btn-primary" 
          onClick={() => {saveTeam()}}>
          Save
        </button>
        <Link href="/teams" className="btn-primary">
          Cancel
        </Link>
      </>
    );
}
