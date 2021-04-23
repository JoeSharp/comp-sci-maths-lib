import Chip from "../Chip";
import Splitter from "../Splitter";
import { BinaryBus, PIN_INPUT, PIN_OUTPUT } from "../types";

class SingleInOut extends Chip {
    value: boolean;
    output: Splitter<boolean>;

    constructor() {
        super('SingleInOut');

        this.value = false;
        this.output = new Splitter();
        this.updateValue(false);

        this.createInputPin(PIN_INPUT, (v) => {
            this.value = v;
            this.updateValue();
        });

        this.createOutputPin(PIN_OUTPUT, (r: BinaryBus) => {
            this.output.connectOutputs(r);
            this.updateValue(true);
        });
    }

    updateValue(force: boolean = false) {
        this.output.send(this.value, force);
    }
}

export default SingleInOut;