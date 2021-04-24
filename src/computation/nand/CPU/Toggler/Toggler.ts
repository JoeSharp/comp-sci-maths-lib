import Chip from "../../Chip";
import { Clock } from "../../Clocked";
import Not from "../../Logic/Not";
import Bit from "../../Memory/Bit";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from "../../types";

class Toggler extends Chip {
    not: Not;
    bit: Bit;

    constructor(clock: Clock) {
        super('Toggler');

        this.not = new Not();
        this.bit = new Bit(clock);

        // Internal Wiring
        this.not.connectToOutputPin(PIN_OUTPUT, this.bit.getInputPin(PIN_INPUT));
        this.bit.connectToOutputPin(PIN_OUTPUT, this.not.getInputPin(PIN_INPUT));

        // External Wiring
        this.createOutputPin(PIN_OUTPUT, this.bit.getOutputPin(PIN_OUTPUT));

        this.bit.sendToInputPin(PIN_LOAD, true);
    }
}

export default Toggler;