import { useState } from "react";
import { Combatant } from "@/sections/domain/combatant/Combatant";
import { Partner } from "@/sections/domain/partner/Partner";
import { CraftedMemoryFragment, MemoryFragmentsEquipped } from "@/sections/domain/memoryFragment/MemoryFragment";

export type TeamMember = {
  combatant: Combatant | undefined;
  partner: Partner | undefined;
  mfs: Partial<MemoryFragmentsEquipped> | undefined;
};

export default function useTeamMembers(count = 3) {
  const [members, setMembers] = useState<TeamMember[]>(
    Array.from({ length: count }, () => ({ combatant: undefined, partner: undefined, mfs: undefined }))
  );

  const setMemberAt = (index: number, patch: Partial<TeamMember>) =>
    setMembers(prev =>
      prev.map((m, i) => (i === index ? { ...m, ...patch, mfs: patch.mfs ?? m.mfs } : m))
    );

  const setCombatantAt = (index: number, combatant?: Combatant) => setMemberAt(index, { combatant });
  const setPartnerAt = (index: number, partner?: Partner) => setMemberAt(index, { partner });

  const setMFAt = (index: number, slot: keyof MemoryFragmentsEquipped, mf?: CraftedMemoryFragment) =>
    setMembers(prev => {
        return prev.map((m, i) => {
            if (i === index) {
                return {
                    ...m,
                    mfs: {
                        ...m.mfs,
                        [slot]: mf
                    }
                };
            }
            return m;
        });
    });

  return { members, setMemberAt, setCombatantAt, setPartnerAt, setMFAt };
}
