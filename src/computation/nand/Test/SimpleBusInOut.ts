import Chip from "../Chip";
import Splitter from "../Splitter";
import { BinaryBus, PIN_INPUT, PIN_OUTPUT, WORD_LENGTH } from "../types";

class SimpleBusInOut extends Chip {
    outputs: Splitter<boolean>[];

    constructor() {
        super("SimpleBusInOut");

        this.outputs = Array(WORD_LENGTH).fill(null).map(() => new Splitter());

        this.createInputBus(PIN_INPUT, Array(WORD_LENGTH).fill(null).map((_, i) => v =>
            this.outputs[i].send(v)
        ));
        this.createOutputBus(PIN_OUTPUT, Array(WORD_LENGTH).fill(null).map((_, i) => (rs: BinaryBus) => {
            rs.forEach(r => this.outputs[i].connectOutput(r));
        }));
    }
}

export default SimpleBusInOut;