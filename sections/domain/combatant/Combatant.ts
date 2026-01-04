export interface ICombatant {
    id: string,
    img: string;
    name: string,
    level: number,
    ego: number,
    //potentials: any, // TODO
}

export class Combatant implements ICombatant {
    readonly id: string;
    readonly img: string;
    name: string;
    level: number;
    ego: number;
    constructor(name: string, level: number, ego: number) {
        this.id = `C-${name}-${level}`;
        this.img = `/combatants/${name.toLowerCase()}.png`;
        this.name = name;
        this.level = level; // TODO add control 0><=60
        this.ego = ego; // TODO add control 0>=<=6
    }
}
