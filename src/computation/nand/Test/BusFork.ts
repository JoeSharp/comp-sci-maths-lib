import Chip from "../Chip";
import Splitter from "../Splitter";
import { BinaryBus, PIN_INPUT, PIN_OUTPUT, WORD_LENGTH } from "../types";

export const BUS_OUTPUT_1 = 'output1';
export const BUS_OUTPUT_2 = 'output2';

class BusFork extends Chip {
    outputs1: Splitter<boolean>[];
    outputs2: Splitter<boolean>[];

    constructor() {
        super("BusFork");

        this.outputs1 = Array(WORD_LENGTH).fill(null).map(() => new Splitter());
        this.outputs2 = Array(WORD_LENGTH).fill(null).map(() => new Splitter());

        this.createInputBus(PIN_INPUT, Array(WORD_LENGTH).fill(null).map((_, i) => v => {
            this.outputs1[i].send(v);
            this.outputs2[i].send(v);
        }));
        this.createOutputBus(BUS_OUTPUT_1, Array(WORD_LENGTH).fill(null).map((_, i) => (rs: BinaryBus) => {
            rs.forEach(r => this.outputs1[i].connectOutput(r));
        }));
        this.createOutputBus(BUS_OUTPUT_2, Array(WORD_LENGTH).fill(null).map((_, i) => (rs: BinaryBus) => {
            rs.forEach(r => this.outputs2[i].connectOutput(r));
        }));
    }
}

export default BusFork;