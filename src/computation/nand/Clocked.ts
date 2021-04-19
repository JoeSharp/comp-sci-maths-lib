export interface IClocked {
    tick: () => void;
    tock: () => void;
}

export class Clock implements IClocked {
    chips: IClocked[];

    constructor() {
        this.chips = [];
    }

    tick() {
        this.chips.forEach(c => c.tick());
    }

    tock() {
        this.chips.forEach(c => c.tock());
    }

    ticktock() {
        this.tick();
        this.tock();
    }

    registerClocked(clocked: IClocked) {
        this.chips.push(clocked);
    }
}