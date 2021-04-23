import { BinaryBus, WORD_LENGTH } from "./types";

export const BUS_OUTPUT_1 = 'output1';
export const BUS_OUTPUT_2 = 'output2';

class BusFork {
    outputs: BinaryBus[];
    inputBus: BinaryBus;

    constructor() {
        this.outputs = [];

        this.inputBus = Array(WORD_LENGTH).fill(null).map((_, i) => v => {
            this.outputs.forEach(output => {
                output[i](v);
            })
        });
    }

    send(values: boolean[], startIndex: number = 0) {
        values.forEach((v, i) => {
            const index = i + startIndex;
            this.inputBus[index](v);
        })
    }

    getInput(): BinaryBus {
        return this.inputBus;
    }

    withOutput(bus: BinaryBus): BusFork {
        this.outputs.push(bus);
        return this;
    }
}

export default BusFork;