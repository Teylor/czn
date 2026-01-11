export enum EquipmentType {
    WEAPON = "weapon",
    ARMOR = "armor",
    RING = "ring",
}

export enum EquipmentRarity {
    MYTHIC = "Mythic",
    LEGENDARY = "Legendary",
    RARE = "Rare",
}

export interface IEquipment {
    id: string;
    img: string;
    name: string;
    type: EquipmentType;
    rarity: EquipmentRarity;
    effect: string;
    stat: number;
    system: string;
}

export class Equipment implements IEquipment {
    readonly id: string;
    readonly img: string;
    name: string;
    type: EquipmentType;
    rarity: EquipmentRarity;
    effect: string;
    stat: number;
    system: string;
    constructor(id: string, img: string, name: string, type: EquipmentType, rarity: EquipmentRarity, effect: string, stat: number, system: string) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.type = type;
        this.rarity = rarity;
        this.effect = effect;
        this.stat = stat;
        this.system = system;
    }
}
