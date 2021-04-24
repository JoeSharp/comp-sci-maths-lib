import Chip from "../../Chip";
import { Clock, IClocked } from "../../Clocked";

import Splitter from '../../Splitter';
import { PIN_INPUT, PIN_OUTPUT } from "../../types";

class DataFlipFlop extends Chip implements IClocked {
    value: boolean;
    output: Splitter<boolean>;

    constructor(clock: Clock) {
        super('DFF');
        this.value = false; 
        this.output = new Splitter();
        clock.registerClocked(this);

        this.createInputPin(PIN_INPUT, v => this.value = v);
        this.createOutputPin(PIN_OUTPUT, rs => this.output.connectOutputs(rs));
    }

    tick() {
        ((): undefined => undefined)(); // No-op
    }

    tock() {
        this.output.send(this.value);
    }
}

export default DataFlipFlop;
