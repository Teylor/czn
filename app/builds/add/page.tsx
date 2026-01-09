"use client"

import { JSX, useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import Image from 'next/image'
import CombatantSelector from "@/sections/infrastructure/shared/CombatantSelector";
import { Combatant } from "@/sections/domain/combatant/Combatant";
import { BASIC_SETS, BasicSetCard, Epiphany, COMBATANTS_EPIPHANIES, DIVINE_EPIPHANIES } from "@/lib/Builds";

export default function Builds(
  {}: {}): JSX.Element {
    const router = useRouter();

    const [combatant, setCombatant] = useState<Combatant | undefined>(undefined);
    const [basicSet, setBasicSet] = useState<BasicSetCard[]>([]);
    const [epiphaniesSet, setEpiphaniesSet] = useState<Record<string, Epiphany[]>>({});
    const [epiphanies, setEpiphanies] = useState<Epiphany[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [epiphanyIsOpen, setEpiphanyIsOpen] = useState<boolean>(false);
    const [divineIsOpen, setDivineIsOpen] = useState<boolean>(false);
    const [divineEpiphanies, setDivineEpiphanies] = useState<any[]>([]);
    const [selectedDivineCardId, setSelectedDivineCardId] = useState<string | null>(null);

    const [buildName, setBuildName] = useState<string>("New Build");

    useEffect(() => {
      if (!combatant) {
        setBasicSet([]);
        return;
      }
      const sets = BASIC_SETS as Record<string, BasicSetCard[]>;
      const base = sets[combatant.name.toLocaleLowerCase()] || [];
      setBasicSet(base.map(card => ({ ...card })));
      const epiphanies = COMBATANTS_EPIPHANIES as Record<string, Record<string, Epiphany[]>>;
      const combatantEpiphanies = epiphanies[combatant.name.toLowerCase()] || {};
      setEpiphaniesSet(Object.assign({}, combatantEpiphanies));
      console.log(combatantEpiphanies);
    }, [combatant]);

    function saveBuild() {
        const Builds = JSON.parse(localStorage.getItem("builds") || "[]");
        Builds.push({id: `${combatant?.name}-${buildName}-${Date.now()}`, name: buildName, img: `${combatant?.img}`});
        localStorage.setItem("builds", JSON.stringify(Builds));
        router.push("/builds");
    }

    function handleDeleteCard(id: string) {
      const next = basicSet.filter((c) => c.id !== id);
      setBasicSet(next);
    }

    function handleCopyCard(id: string) {
      const cardToCopy = basicSet.find((c) => c.id === id);
      if (cardToCopy) {
        const newCard = {...cardToCopy, id: `${cardToCopy.id}_copy`};
        setBasicSet([...basicSet, newCard]);
      }
    }

    function handleEpiphanyCard(id: string) {
      let epiphanyId = id;
      if (epiphanyId.includes("_copy")) {
        epiphanyId = epiphanyId.split("_copy")[0];
      }
      const cardEpiphanies = epiphaniesSet[epiphanyId] || [];
      setEpiphanies(cardEpiphanies);
      setSelectedCardId(id);
      setEpiphanyIsOpen(true);
    }

    function handleSelectEpiphany(cardId: string | null, epiphanyId: string) {
      let idToUse = cardId || selectedCardId;
      if (!idToUse) return;
      const index = basicSet.findIndex((c) => c.id === idToUse);
      if (index != -1) {
        const epiphany: Epiphany | undefined = epiphanies.find((e: Epiphany) => e.id === epiphanyId);
        basicSet[index].epiphany = epiphany?.effect || basicSet[index].effect;
        basicSet[index].cost = epiphany?.cost || basicSet[index].cost;
        basicSet[index].type = epiphany?.type || basicSet[index].type;
        setBasicSet([...basicSet]);
      }
      setEpiphanyIsOpen(false);
      setSelectedCardId(null);
    }

    function handleDivineEpiphany(id: string) {
      setDivineEpiphanies(DIVINE_EPIPHANIES || []);
      setSelectedDivineCardId(id);
      setDivineIsOpen(true);
    }

    function handleSelectDivine(cardId: string | null, divineId: string) {
      const idToUse = cardId || selectedDivineCardId;
      if (!idToUse) return;
      const index = basicSet.findIndex((c) => c.id === idToUse);
      if (index != -1) {
        const divine = divineEpiphanies.find((d: any) => d.id === divineId);
        basicSet[index].divine = divine?.effect || divine?.name || "Divine Epiphany";
        setBasicSet([...basicSet]);
      }
      setDivineIsOpen(false);
      setSelectedDivineCardId(null);
    }

    function removeDivineEpiphany(cardId: string) {
      const index = basicSet.findIndex((c) => c.id === cardId);
      if (index != -1) {
        basicSet[index].divine = undefined;
        setBasicSet([...basicSet]);
      }
    }

  return (
        <>
          <CombatantSelector selected={combatant} onSelect={(c: Combatant) => setCombatant(c)} />
          {epiphanyIsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => { setEpiphanyIsOpen(false); setSelectedCardId(null); }}
              />
              <div className="relative z-10 bg-white p-6 rounded-md max-w-2xl w-full mx-4 sm:mx-6">
                <h3 className="text-xl font-bold mb-3">Select Epiphany</h3>
                <div className="space-y-3 max-h-96 overflow-auto">
                  {epiphanies.length === 0 && <div className="text-sm text-gray-500">No epiphanies available</div>}
                  {epiphanies.map((epiphany) => (
                    <div key={`${selectedCardId}-${epiphany.id}`}>
                      <button
                        className="w-full text-left p-3 border rounded hover:bg-gray-100"
                        onClick={() => handleSelectEpiphany(selectedCardId, epiphany.id)}
                      >
                        {epiphany.effect}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <button className="btn-primary" onClick={() => { setEpiphanyIsOpen(false); setSelectedCardId(null); }}>Close</button>
                </div>
              </div>
            </div>
          )}
          {divineIsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => { setDivineIsOpen(false); setSelectedDivineCardId(null); }}
              />
                    <div className="relative z-10 bg-white p-6 rounded-md max-w-2xl w-full mx-4 sm:mx-6">
                      <h3 className="text-xl font-bold mb-3">Select Divine Epiphany</h3>
                      <div className="space-y-3 max-h-96 overflow-auto">
                        {divineEpiphanies.length === 0 && <div className="text-sm text-gray-500">No divine epiphanies available</div>}
                        {divineEpiphanies.map((d) => (
                          <div key={`${selectedDivineCardId}-${d.id}`}>
                            <button
                              className="w-full text-left p-3 border rounded hover:bg-gray-100"
                              onClick={() => handleSelectDivine(selectedDivineCardId, d.id)}
                            >
                              {d.name} — {d.effect}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-right">
                        <button className="btn-primary" onClick={() => { setDivineIsOpen(false); setSelectedDivineCardId(null); }}>Close</button>
                      </div>
                    </div>
            </div>
          )}
          {
            combatant && basicSet.length > 0 && (
              <div className="my-8 container">
                <input
                  type="text"
                  className="m-1 mb-4 p-2 border border-gray-300 rounded-md text-lg text-center"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                /> 
                {/* TODO items */}
                <div className="grid grid-cols-1 gap-1 md:grid-cols-3 mb-4">
                  
                </div>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-4">
                  {
                    basicSet.map((card) => (
                      <div 
                        key={card.id}
                        className="relative border border-zinc-300 rounded-md p-4 flex flex-col items-center">
                        <button
                          aria-label="Delete card"
                          onClick={() => handleDeleteCard(card.id as unknown as string)}
                          className="absolute z-5 top-1 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full hover:bg-red-700"
                          >
                            X
                        </button>
                        <button
                          hidden={card.id.includes("1") || card.id.includes("2") || card.id.includes("3")}
                          aria-label="Copy card"
                          onClick={() => handleCopyCard(card.id as unknown as string)}
                          className="absolute z-5 top-1 right-8 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-green-600 rounded-full hover:bg-green-700"
                          >
                            C
                        </button>
                        <button
                          hidden={card.id.includes("1") || card.id.includes("2") || card.id.includes("3") || card.id.includes("8")}
                          aria-label="Epiphany card"
                          onClick={() => handleEpiphanyCard(card.id as unknown as string)}
                          className="absolute z-5 top-8 right-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                          >
                            E
                        </button>
                        <button
                          hidden={card.id.includes("1") || card.id.includes("2") || card.id.includes("3") || card.id.includes("8")}
                          aria-label="Divine Epiphany"
                          onClick={() => handleDivineEpiphany(card.id as unknown as string)}
                          className="absolute z-5 top-8 right-8 w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-yellow-600 rounded-full hover:bg-yellow-700"
                          >
                            D
                        </button>
                        {/* TODO add common epiphanies */}
                        <b className="mb-2">{card.name}</b>
                        <Image src={card.img} alt={card.name} width={64} height={64} />
                        <h1 className={card.type === "Attack" ? "text-red-600" : card.type === "Skill" ? "text-blue-600" : "text-green-600"}>{card.type}</h1>
                        <h1>Cost: {card.cost}</h1>
                        {!card.epiphany && <h3 className="mt-2 text-center">{card.effect}</h3>}
                        {card.epiphany && <h3 className="mt-2 text-center text-blue-600">{card.epiphany}</h3>}
                        
                        {card.divine && <h3 className="mt-2 text-center text-yellow-600">{card.divine} <button onClick={() => removeDivineEpiphany(card.id as unknown as string)}>X</button></h3>}
                      </div>
                    ))
                  }
                  <div className="relative border border-zinc-300 rounded-md p-4 flex flex-col items-center">
                    <button>
                      + Add Card (TODO)
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          <button className="m-1 btn-primary"
            onClick={() => {saveBuild()}}
            >
            Save
          </button>
          <Link href="/builds" className="m-1 btn-primary">
            Cancel
          </Link>
        </>
    );
}
