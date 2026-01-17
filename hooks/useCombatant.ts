import { Combatant } from "@/sections/domain/combatant/Combatant";
import { useState, useEffect } from "react";

export default function useCombatant() {
  const [combatant, setCombatant] = useState<Combatant | undefined>(undefined);
  const [level, setLevel] = useState<number>(1);
  const [ego, setEgo] = useState<number>(0);

    useEffect(() => {
      setLevel(level < 1 ? 1 : level > 60 ? 60 : level);
      setEgo(ego < 0 ? 0 : ego > 6 ? 6 : ego);
    }, [level, ego]);

  return { combatant, setCombatant, level, setLevel, ego, setEgo };
}