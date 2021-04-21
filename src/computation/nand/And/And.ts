import Chip from "../Chip";

import Nand from '../Nand';
import Not from '../Not';
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "../types";

/**
 * And gate: 
 * out = 1 if (a == 1 and b == 1)
 *       0 otherwise
 */

class And extends Chip {
    nand: Nand;
    not: Not;

    constructor() {
        super('And');

        this.nand = new Nand();
        this.not = new Not();

        // Internal Wiring
        this.nand.connectToOutputPin(PIN_OUTPUT, this.not.getInputPin(PIN_INPUT))

        // External wiring
        this.createInputPin(PIN_A, this.nand.getInputPin(PIN_A));
        this.createInputPin(PIN_B, this.nand.getInputPin(PIN_B));
        this.createOutputPin(PIN_OUTPUT, this.not.getOutputPin(PIN_OUTPUT));
    }
}

export default And;