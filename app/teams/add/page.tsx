"use client"

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Combatant } from "@/sections/domain/combatant/Combatant";
import { Partner } from "@/sections/domain/partner/Partner";
import { CraftedMemoryFragment, SetType } from "@/sections/domain/memoryFragment/MemoryFragment";
import CombatantSelector from "@/sections/teams/CombatantSelector";
import PartnerSelector from "@/sections/teams/PartnerSelector";
import MemoryFragmentsManual from "@/sections/teams/MemoryFragmentsManual";
import MemoryFragmentsBis from "@/sections/teams/MemoryFragmentsBis";
import SetsSelector from "@/sections/teams/SetsSelector";

export default function Partners(
  {

  }: {

  }): JSX.Element {
    const router = useRouter();

    const [combatant1, setCombatant1] = useState<Combatant | undefined>(undefined);
    const [partner1, setPartner1] = useState<Partner | undefined>(undefined);
    const [mfSets1, setSets1] = useState<SetType[] | undefined>(undefined);
    const [mf1I, setMF1I] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf1II, setMF1II] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf1III, setMF1III] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf1IV, setMF1IV] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf1V, setMF1V] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf1VI, setMF1VI] = useState<CraftedMemoryFragment | undefined>(undefined);
    
    const [combatant2, setCombatant2] = useState<Combatant | undefined>(undefined);
    const [partner2, setPartner2] = useState<Partner | undefined>(undefined);
    const [mfSets2, setSets2] = useState<SetType[] | undefined>(undefined);
    const [mf2I, setMF2I] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf2II, setMF2II] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf2III, setMF2III] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf2IV, setMF2IV] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf2V, setMF2V] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf2VI, setMF2VI] = useState<CraftedMemoryFragment | undefined>(undefined);
    
    const [combatant3, setCombatant3] = useState<Combatant | undefined>(undefined);
    const [partner3, setPartner3] = useState<Partner | undefined>(undefined);
    const [mf3I, setMF3I] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf3II, setMF3II] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf3III, setMF3III] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf3IV, setMF3IV] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf3V, setMF3V] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf3VI, setMF3VI] = useState<CraftedMemoryFragment | undefined>(undefined);

    const [bisSystem, setBisSystem] = useState(false)
    const [bisSystem2, setBisSystem2] = useState(false)

    const [member1, setMember1] = useState<any>({})

    useEffect(() => { /* TODO manage all parameters on the easiest way */
      console.log('hola')
      setMember1({
        ...member1,
        mfIII: mf1III
      })
    }, [mf1III])

    function saveTeam() { // TODO 
      const Teams = JSON.parse(localStorage.getItem("teams") || "[]");

      Teams.push({ 
          member1,
          member2: {

          },
          member3: {

          }
        });

      localStorage.setItem("teams", JSON.stringify(Teams));
      router.push("/teams");
    }

    

    /* const [combatants, setCombatants] = useState([
      { isOpen: false, value: {}, disable: false },
      { isOpen: false, value: {}, disable: false },
      { isOpen: false, value: {}, disable: false }
    ]); */

    /* const [combatant, setCombatant] = useState([
      { value: Combatant || undefined, disable: false },
      { value: Combatant || undefined, disable: false },
      { value: Combatant || undefined, disable: false }
    ]);

    const updateCombatant = (index: number, field: string, newValue: Combatant) => {
    setCombatant(prev => 
        prev.map((combatant, i) => 
        i === index ? { ...combatant, [field]: newValue } : combatant
        )
    );}; */

  return (
    <>
        <div className="my-8 container text-center">

          {/* <h1>Team Configurator</h1> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1"> {/* TODO with a for of 3 */}
            <div className="grid grid-cols-1 md:grid-cols-6">
                <CombatantSelector
                  key="Teams-CS1"
                  keyUnique="Teams-CS1"
                  disable={false}
                  setCombatant={setCombatant1}
                />
                <PartnerSelector
                  key="Teams-PS1"
                  keyUnique="Teams-PS1"
                  disable={false}
                  setPartner={setPartner1}
                />
                <div className="md:col-span-6">
                  <h1>TODO Build 1</h1>
                  {/* <BuildSelector>TODO</BuildSelector> */}
                </div>
                <div className="md:col-span-6 m-4">
                  <div className="flex items-center justify-center space-x-4">
                    <span className={`text-sm font-medium ${!bisSystem ? 'text-blue-600' : 'text-gray-500'}`}>
                      Manual Assignation
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={bisSystem}
                        onChange={() => setBisSystem(!bisSystem)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span className={`text-sm font-medium ${bisSystem ? 'text-blue-600' : 'text-gray-500'}`}>
                      Bis System
                    </span>
                  </div>
                </div>
                <div className="md:col-span-6">
                  <SetsSelector
                    uniqueKey="Teams-SS-1"
                    setSets={setSets1}
                  />
                </div>
                { bisSystem?
                  <>
                  <MemoryFragmentsBis 
                      uniqueKey="Teams-Bis-1"
                      sets={mfSets1}
                      setMFI={setMF1I}
                      setMFII={setMF1II}
                      setMFIII={setMF1III}
                      setMFIV={setMF1IV}
                      setMFV={setMF1V}
                      setMFVI={setMF1VI}
                    />
                  </>
                  :
                  <>
                    <MemoryFragmentsManual 
                      uniqueKey="Teams-Manual-1"
                      sets={mfSets1}
                      setMFI={setMF1I}
                      setMFII={setMF1II}
                      setMFIII={setMF1III}
                      setMFIV={setMF1IV}
                      setMFV={setMF1V}
                      setMFVI={setMF1VI}
                    />
                  </>
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6">
                <CombatantSelector
                  key="Teams-CS2"
                  keyUnique="Teams-CS2"
                  disable={false}
                  setCombatant={setCombatant2}
                />
                <PartnerSelector
                  key="Teams-PS2"
                  keyUnique="Teams-PS2"
                  disable={false}
                  setPartner={setPartner2}
                />
                <div className="md:col-span-6">
                  <h1>TODO Build 2</h1>
                  {/* <BuildSelector>TODO</BuildSelector> */}
                </div>
                <div className="md:col-span-6 m-4">
                  <div className="flex items-center justify-center space-x-4">
                    <span className={`text-sm font-medium ${!bisSystem2 ? 'text-blue-600' : 'text-gray-500'}`}>
                      Manual Assignation
                    </span>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={bisSystem2}
                        onChange={() => setBisSystem2(!bisSystem2)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>

                    <span className={`text-sm font-medium ${bisSystem2 ? 'text-blue-600' : 'text-gray-500'}`}>
                      Bis System
                    </span>
                  </div>
                </div>
                <div className="md:col-span-6">
                  <SetsSelector
                    uniqueKey="Teams-SS-2"
                    setSets={setSets2}
                  />
                </div>
                { bisSystem2 ?
                  <>
                  <MemoryFragmentsBis 
                      uniqueKey="Teams-Bis-2"
                      sets={mfSets2}
                      setMFI={setMF2I}
                      setMFII={setMF2II}
                      setMFIII={setMF2III}
                      setMFIV={setMF2IV}
                      setMFV={setMF2V}
                      setMFVI={setMF2VI}
                    />
                  </>
                  :
                  <>
                    <MemoryFragmentsManual 
                      uniqueKey="Teams-Manual-2"
                      sets={mfSets2}
                      setMFI={setMF2I}
                      setMFII={setMF2II}
                      setMFIII={setMF2III}
                      setMFIV={setMF2IV}
                      setMFV={setMF2V}
                      setMFVI={setMF2VI}
                    />
                  </>
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6">
                <CombatantSelector
                  key="Teams-CS3"
                  keyUnique="Teams-CS3"
                  disable={false}
                  setCombatant={setCombatant3}
                />
                <PartnerSelector
                  key="Teams-PS3"
                  keyUnique="Teams-PS3"
                  disable={false}
                  setPartner={setPartner3}
                />
                <div className="md:col-span-6">
                  <h1>TODO Build 3</h1>
                  {/* <BuildSelector>TODO</BuildSelector> */}
                </div>
                <div className="md:col-span-6">
                  <h1>TODO MF 3</h1>
                  {/* <MemoryFragmentsSelector>TODO</MemoryFragmentsSelector> */}
                </div>
            </div>
          </div>
        </div>
        <button className="btn-primary" 
          onClick={() => {
            saveTeam()
          }}>
          Save (TODO)
        </button>
        <Link href="/teams" className="btn-primary">
          Cancel
        </Link>
      </>
    );
}
