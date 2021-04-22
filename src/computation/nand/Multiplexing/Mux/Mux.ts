import { Consumer } from "../../../../types";

import And from '../../And';
import Chip from "../../Chip";
import Not from '../../Not';
import Or from '../../Or';
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "../../types";

/**
 * Multiplexor:
 * out = a if sel == 0
 *       b otherwise
 */
//  CHIP Mux {
//     IN a, b, sel;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     And(a=b, b=sel, out=bAndSel);
//     Not(in=sel, out=notSel);
//     And(a=a, b=notSel, out=aAndNotSel);
//     Or(a=aAndNotSel, b=bAndSel, out=out);
// }
class Mux extends Chip {
    bAndSel: And;
    notSel: Not;
    aAndNotSel: And;
    aAndNotSelOrBAndSel: Or;

    constructor() {
        super('Mux')
        this.bAndSel = new And();
        this.notSel = new Not();
        this.aAndNotSel = new And();
        this.aAndNotSelOrBAndSel = new Or();

        // Internal Wiring
        this.notSel.connectToOutputPin(PIN_OUTPUT, this.aAndNotSel.getInputPin(PIN_B));
        this.bAndSel.connectToOutputPin(PIN_OUTPUT, this.aAndNotSelOrBAndSel.getInputPin(PIN_B));
        this.aAndNotSel.connectToOutputPin(PIN_OUTPUT, this.aAndNotSelOrBAndSel.getInputPin(PIN_A));

        // External Wiring
        this.createInputPin(PIN_A, this.aAndNotSel.getInputPin(PIN_A));
        this.createInputPin(PIN_B, this.bAndSel.getInputPin(PIN_A));
        this.createInputPin(PIN_SELECTOR, this.notSel.getInputPin(PIN_INPUT), this.bAndSel.getInputPin(PIN_B));
        this.createOutputPin(PIN_OUTPUT, this.aAndNotSelOrBAndSel.getOutputPin(PIN_OUTPUT));
    }
}

export default Mux;