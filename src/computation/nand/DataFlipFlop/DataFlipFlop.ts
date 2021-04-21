import Chip from "../Chip";
import { IClocked } from "../Clocked";

import Splitter from '../Splitter';
import { PIN_INPUT, PIN_OUTPUT } from "../types";

class DataFlipFlop extends Chip implements IClocked {
    input: boolean;
    output: Splitter<boolean>;

    constructor() {
        super('DFF');
        this.output = new Splitter();

        this.createInputPin(PIN_INPUT, v => this.input = v);
        this.createOutputPin(PIN_OUTPUT, rs => this.output.connectOutputs(rs));
    }

    tick() {
    }

    tock() {
        this.output.send(this.input);
    }
}

export default DataFlipFlop;
