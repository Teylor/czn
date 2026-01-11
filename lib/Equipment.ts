import { Equipment, EquipmentType, EquipmentRarity } from "@/sections/domain/equipment/Equipment"

/* TODO add all equipments */
export const WEAPON_EQUIPMENT: Equipment[] = [
    {
        id: "branch_of_eternity",
        name: "Branch of Eternity",
        img: "/equipment/weapon/branch_of_eternity.png",
        effect: "On Heal or Recover, Fixed Damage to all enemies equal to 50% of Recover amount",
        stat: 90,
        system: "Swamp of Judgment",
        type: EquipmentType.WEAPON,
        rarity: EquipmentRarity.MYTHIC
    },
    {
        id: "chimeranite",
        name: "Chimeranite",
        img: "/equipment/weapon/chimeranite.png",
        effect: "When you Draw by an ability, +35% Damage amount to your own Attack Card(s) for 1 turn (Max 1 time per turn)",
        stat: 90,
        system: "Lab 0",
        type: EquipmentType.WEAPON,
        rarity: EquipmentRarity.MYTHIC
    },
]
export const ARMOR_EQUIPMENT: Equipment[] = [
    {
        id: "consecrated_halo",
        name: "Consecrated Halo",
        img: "/equipment/armor/consecrated_halo.png",
        effect: "+25% Shield Gain",
        stat: 34,
        system: "The Foretold Ruin",
        type: EquipmentType.ARMOR,
        rarity: EquipmentRarity.MYTHIC
    },
    {
        id: "fragment_of_the_empty_void",
        name: "Fragment of the Empty Void",
        img: "/equipment/armor/fragment_of_the_empty_void.png",
        effect: "When you Draw by an ability, +35% Damage amount to your own Attack Card(s) for 1 turn (Max 1 time per turn)",
        stat: 34,
        system: "Lab 0",
        type: EquipmentType.ARMOR,
        rarity: EquipmentRarity.MYTHIC
    },
]
export const RING_EQUIPMENT: Equipment[] = [
    {
        id: "corrupted_core",
        name: "Corrupted Core",
        img: "/equipment/ring/corrupted_core.png",
        effect: "+15% Defense, Retain +20% Shield",
        stat: 91,
        system: "The Foretold Ruin",
        type: EquipmentType.RING,
        rarity: EquipmentRarity.MYTHIC
    },
    {
        id: "dice_of_chaos",
        name: "Dice of Chaos",
        img: "/equipment/ring/dice_of_chaos.png",
        effect: "At the end of turn, 40% x 2~6 Fixed Damage to a random enemies, and trigger 200% Fixed Damage on allies with one random 1 effect.",
        stat: 91,
        system: "The Blue Pot",
        type: EquipmentType.RING,
        rarity: EquipmentRarity.MYTHIC
    },
]