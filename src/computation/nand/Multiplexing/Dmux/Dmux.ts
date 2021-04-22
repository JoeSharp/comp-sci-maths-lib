import And from "../../And";
import Chip from "../../Chip";
import Not from "../../Not";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "../../types";

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */
//  CHIP DMux {
//     IN in, sel;
//     OUT a, b;

//     PARTS:
//     // Put your code here:
//     Not(in=sel, out=notSel);
//     And(a=in, b=notSel, out=a);
//     And(a=in, b=sel, out=b);
// }
class Dmux extends Chip {
    notSel: Not;
    inAndNotSel: And;
    inAndSel: And;

    constructor() {
        super('Dmux');

        this.notSel = new Not();
        this.inAndNotSel = new And();
        this.inAndSel = new And();

        // Internal Wiring
        this.notSel.connectToOutputPin(PIN_OUTPUT, this.inAndNotSel.getInputPin(PIN_B));

        // External Wiring
        this.createInputPin(PIN_INPUT,
            this.inAndNotSel.getInputPin(PIN_A),
            this.inAndSel.getInputPin(PIN_A));
        this.createInputPin(PIN_SELECTOR,
            this.notSel.getInputPin(PIN_INPUT),
            this.inAndSel.getInputPin(PIN_B));
        this.createOutputPin(PIN_A, this.inAndNotSel.getOutputPin(PIN_OUTPUT));
        this.createOutputPin(PIN_B, this.inAndSel.getOutputPin(PIN_OUTPUT));
    }
}

export default Dmux;