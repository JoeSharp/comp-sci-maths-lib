import { BinaryBus, WORD_LENGTH } from "./types";

class BusSink {
    values: boolean[]

    constructor(width: number = WORD_LENGTH) {
        this.values = Array(width).fill(false);
    }

    getBus(): BinaryBus {
        return this.values.map((_, i) => (v: boolean) => this.values[i] = v);
    }

    getValues(): boolean[] {
        return this.values;
    }
}

export default BusSink;