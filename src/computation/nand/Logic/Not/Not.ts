import Nand from '../Nand';
import Chip from "../../Chip";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "../../types";

/**
 * Not gate:
 * out = not in
 */

//  CHIP Not {
//     IN in;
//     OUT out;

//     PARTS:
//     Nand(a=in, b=in, out=out);
// }
class Not extends Chip {
    nand: Nand;

    constructor() {
        super('Not');

        this.nand = new Nand();

        // External Wiring
        this.createInputPin(PIN_INPUT, this.nand.getInputPin(PIN_A), this.nand.getInputPin(PIN_B));
        this.createOutputPin(PIN_OUTPUT, this.nand.getOutputPin(PIN_OUTPUT));
    }
}

export default Not;