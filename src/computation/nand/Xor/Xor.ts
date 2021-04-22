/**
 * Exclusive-or gate:
 * out = not (a == b)
 */

import And from "../And";
import Chip from "../Chip";
import Not from "../Not";
import Or from "../Or";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "../types";

//  CHIP Xor {
//     IN a, b;
//     OUT out;

//     PARTS:
//     Not (in=a, out=nota);
//     Not (in=b, out=notb);
//     And (a=a, b=notb, out=aAndNotb);
//     And (a=nota, b=b, out=notaAndb);
//     Or (a=aAndNotb, b=notaAndb, out=out);
// }

class Xor extends Chip {
    notA: Not;
    notB: Not;
    aAndNotB: And;
    notaAndB: And;
    outOr: Or;

    constructor() {
        super('Xor');

        this.notA = new Not();
        this.notB = new Not();
        this.aAndNotB = new And();
        this.notaAndB = new And();
        this.outOr = new Or();

        // Internal Wiring
        this.notA.connectToOutputPin(PIN_OUTPUT, this.notaAndB.getInputPin(PIN_A));
        this.notB.connectToOutputPin(PIN_OUTPUT, this.aAndNotB.getInputPin(PIN_B));
        this.aAndNotB.connectToOutputPin(PIN_OUTPUT, this.outOr.getInputPin(PIN_A));
        this.notaAndB.connectToOutputPin(PIN_OUTPUT, this.outOr.getInputPin(PIN_B));

        // External Wiring
        this.createInputPin(PIN_A, this.notA.getInputPin(PIN_INPUT), this.aAndNotB.getInputPin(PIN_A));
        this.createInputPin(PIN_B, this.notB.getInputPin(PIN_INPUT), this.notaAndB.getInputPin(PIN_B));
        this.createOutputPin(PIN_OUTPUT, this.outOr.getOutputPin(PIN_OUTPUT));
    }
}

export default Xor;