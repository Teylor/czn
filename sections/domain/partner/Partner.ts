export interface IPartner {
    id: string,
    img: string;
    name: string,
    level: number,
    ego: number
}

export class Partner implements IPartner {
    readonly id: string;
    readonly img: string;
    name: string;
    level: number;
    ego: number;
    constructor(name: string, level: number, ego: number) {
        this.id = `P-${name}-${level}`;
        this.img = `/partners/${name.toLowerCase()}.png`;
        this.name = name;
        this.level = level; // TODO add control 0><=60
        this.ego = ego; // TODO add control 0>=<=4
    }
}
