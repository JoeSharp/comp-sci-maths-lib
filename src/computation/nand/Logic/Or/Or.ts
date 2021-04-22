import Not from '../Not';
import Nand from '../Nand';
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT } from "../../types";
import Chip from "../../Chip";

/**
* Or gate:
* out = 1 if (a == 1 or b == 1)
*       0 otherwise
*/

//   CHIP Or {
//     IN a, b;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     Not(in=a, out=notA);
//     Not(in=b, out=notB);
//     Nand(a=notA, b=notB, out=out);
// }

class Or extends Chip {
    nandNotA: Not
    nandNotB: Not;
    nandNotANotB: Nand;

    constructor() {
        super('Or');

        this.nandNotA = new Not();
        this.nandNotB = new Not();

        this.nandNotANotB = new Nand();

        // Internal Wiring
        this.nandNotA.connectToOutputPin(PIN_OUTPUT, this.nandNotANotB.getInputPin(PIN_A));
        this.nandNotB.connectToOutputPin(PIN_OUTPUT, this.nandNotANotB.getInputPin(PIN_B));

        // External Wiring
        this.createInputPin(PIN_A, this.nandNotA.getInputPin(PIN_INPUT));
        this.createInputPin(PIN_B, this.nandNotB.getInputPin(PIN_INPUT));
        this.createOutputPin(PIN_OUTPUT, this.nandNotANotB.getOutputPin(PIN_OUTPUT));
    }
}

export default Or;