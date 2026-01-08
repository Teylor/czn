export enum ParterType {
    STRIKER = "striker",
    HUNTER = "hunter",
    CONTROLLER = "controller",
    RANGER = "ranger",
    PSIONIC = "psionic",
    VANGUARD = "vanguard",
}

export enum PartnerRarity {
    THREE_STAR = 3,
    FOUR_STAR = 4,
    FIVE_STAR = 5,
}

export interface IPartner {
    id: string,
    img: string;
    name: string,
    level: number,
    ego: number,
    rarity?: PartnerRarity,
    type?: ParterType,
    passive?: string,
    skill?: string,
}

export class Partner implements IPartner {
    readonly id: string;
    readonly img: string;
    readonly alt: string;
    name: string;
    level: number;
    ego: number;
    constructor(name: string, level: number, ego: number) { // TODO on construct get basic stats of each partn
        this.id = `P-${name}-${Date.now()}`;
        this.img = `/partners/${name.toLowerCase()}.png`;
        this.name = name;
        this.level = level < 0 ? 0 : level > 60 ? 60 : level;
        this.ego = ego < 0 ? 0 : ego > 4 ? 4 : ego;
        this.alt = `${this.name} - ${this.level} Lvl ${this.ego} Ego`;
    }
}
