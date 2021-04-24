import { Optional } from "../../types";
import { BinaryBus, WORD_LENGTH } from "./types";

export const BUS_OUTPUT_1 = 'output1';
export const BUS_OUTPUT_2 = 'output2';

interface ForkOutput {
    startIndex: number,
    endIndex: number,
    bus: BinaryBus;
}

type BusCallback = (index: number, value: boolean) => void;

class BusFork {
    outputs: ForkOutput[];
    inputBus: BinaryBus;
    callback: BusCallback;

    constructor(width: number = WORD_LENGTH, callback: Optional<BusCallback> = undefined) {
        this.outputs = [];
        this.callback = callback

        this.inputBus = Array(width).fill(null).map((_, i) => v => {
            if (!!this.callback) this.callback(i, v);

            this.outputs.forEach(({ bus, startIndex, endIndex }) => {
                if (i >= startIndex && i < endIndex) {
                    bus[i - startIndex](v);
                }
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

    withOutput(bus: BinaryBus, startIndex: number = 0, endIndex: number = WORD_LENGTH): BusFork {
        this.outputs.push({ bus, startIndex, endIndex });
        return this;
    }
}

export default BusFork;