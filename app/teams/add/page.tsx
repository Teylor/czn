"use client"

import { Combatant } from "@/sections/domain/combatant/Combatant";
import { Partner } from "@/sections/domain/partner/Partner";
import { CraftedMemoryFragment } from "@/sections/domain/memoryFragment/MemoryFragment";
import CombatantSelector from "@/sections/teams/CombatantSelector";
import PartnerSelector from "@/sections/teams/PartnerSelector";
import MemoryFragmentSelector from "@/sections/teams/MemoryFragmentSelector";
import Link from "next/link";
import { JSX, useState } from "react";

export default function Partners(
  {

  }: {

  }): JSX.Element {

    /* TODO create button save */

    const [combatant1, setCombatant1] = useState<Combatant | undefined>(undefined);
    const [combatant2, setCombatant2] = useState<Combatant | undefined>(undefined);
    const [combatant3, setCombatant3] = useState<Combatant | undefined>(undefined);

    const [partner1, setPartner1] = useState<Partner | undefined>(undefined);
    const [partner2, setPartner2] = useState<Partner | undefined>(undefined);
    const [partner3, setPartner3] = useState<Partner | undefined>(undefined);

    const [mf1, setMF1] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf2, setMF2] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf3, setMF3] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf4, setMF4] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf5, setMF5] = useState<CraftedMemoryFragment | undefined>(undefined);
    const [mf6, setMF6] = useState<CraftedMemoryFragment | undefined>(undefined);


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

          <h1>Team Configurator</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div key="teamMember1" className="grid grid-cols-1 md:grid-cols-6">
                <CombatantSelector
                  key="Teams-CS1"
                  keyUnique="Teams-CS1"
                  disable={false}
                  //setCombatant={updateCombatant(0, "value", this)}
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
                
                  <MemoryFragmentSelector
                    key="Teams-MF1S1"
                    keyUnique="Teams-MF1S1"
                    disable={false}
                    piece={1}
                    setMF={setMF1}
                  />
                  <MemoryFragmentSelector
                    key="Teams-MF2S1"
                    keyUnique="Teams-MF2S1"
                    disable={false}
                    piece={2}
                    setMF={setMF2}
                  />
                  <MemoryFragmentSelector
                    key="Teams-MF3S1"
                    keyUnique="Teams-MF3S1"
                    disable={false}
                    piece={3}
                    setMF={setMF3}
                  />
                  <MemoryFragmentSelector
                    key="Teams-MF4S1"
                    keyUnique="Teams-MF4S1"
                    disable={false}
                    piece={4}
                    setMF={setMF4}
                  />
                  <MemoryFragmentSelector
                    key="Teams-MF5S1"
                    keyUnique="Teams-MF5S1"
                    disable={false}
                    piece={5}
                    setMF={setMF5}
                  />
                  <MemoryFragmentSelector
                    key="Teams-MF6S1"
                    keyUnique="Teams-MF6S1"
                    disable={false}
                    piece={6}
                    setMF={setMF6}
                  />
            </div>

            <div key="teamMember2" className="grid grid-cols-1 md:grid-cols-6">
                <CombatantSelector
                  key="Teams-CS2"
                  keyUnique="Teams-CS2"
                  disable={false}
                  //setCombatant={updateCombatant(0, "value", this)}
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
                <div className="md:col-span-6">
                  <h1>TODO MF 2</h1>
                  {/* <MemoryFragmentsSelector>TODO</MemoryFragmentsSelector> */}
                </div>
            </div>

            <div key="teamMember3" className="grid grid-cols-1 md:grid-cols-6">
                <CombatantSelector
                  key="Teams-CS3"
                  keyUnique="Teams-CS3"
                  disable={false}
                  //setCombatant={updateCombatant(0, "value", this)}
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
        <Link href="/teams" className="btn-primary">
          Cancel
        </Link>
        </>
    );
}