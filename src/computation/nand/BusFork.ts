import Chip from "./Chip";
import { BinaryBus, PIN_INPUT, WORD_LENGTH } from "./types";

export const BUS_OUTPUT_1 = 'output1';
export const BUS_OUTPUT_2 = 'output2';

class BusFork {
    chip: Chip;
    outputs: BinaryBus[];

    constructor() {
        this.chip = new Chip("BusFork");
        this.outputs = [];
    }

    send(values: boolean[]) {
        this.chip.sendToInputBus(PIN_INPUT, values);
    }

    getInput(): BinaryBus {
        return this.chip.getInputBus(PIN_INPUT);
    }

    withOutput(bus: BinaryBus): BusFork {
        this.outputs.push(bus);
        return this;
    }

    build(): BusFork {
        this.chip.createInputBus(PIN_INPUT, Array(WORD_LENGTH).fill(null).map((_, i) => v => {
            this.outputs.forEach(output => {
                output[i](v);
            })
        }));

        return this;
    }
}

export default BusFork;