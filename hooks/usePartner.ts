import { Partner } from "@/sections/domain/partner/Partner";
import { useState, useEffect } from "react";

export default function usePartner() {
  const [partner, setPartner] = useState<Partner | undefined>(undefined);
  const [level, setLevel] = useState<number>(1);
  const [ego, setEgo] = useState<number>(0);

    useEffect(() => {
        if (partner) {
            setLevel(level < 1 ? 1 : level > 60 ? 60 : level);
            setEgo(ego < 0 ? 0 : ego > 6 ? 6 : ego);
        }
    }, [level, ego]);

  return { partner, setPartner, level, setLevel, ego, setEgo };
}