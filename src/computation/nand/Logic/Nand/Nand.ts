import { Optional } from "../../../../types";
import Chip from "../../Chip";

import Splitter from '../../Splitter';
import { BinaryBus, PIN_A, PIN_B, PIN_OUTPUT } from "../../types";

class Nand extends Chip {
    a: boolean;
    b: boolean;
    lastOutput: Optional<boolean>;
    output: Splitter<boolean>;

    constructor() {
        super('Nand');

        this.a = false;
        this.b = false;
        this.output = new Splitter();
        this.updateValue();

        this.createInputPin(PIN_A, v => {
            this.a = v;
            this.updateValue();
        });
        this.createInputPin(PIN_B, v => {
            this.b = v;
            this.updateValue();
        });
        this.createOutputPin(PIN_OUTPUT, (r: BinaryBus) => {
            this.output.connectOutputs(r);
            this.updateValue(true);
        });
    }

    updateValue(force: boolean = false) {
        const newValue = !(this.a && this.b);
        this.output.send(newValue, force);
    }
}

export default Nand;