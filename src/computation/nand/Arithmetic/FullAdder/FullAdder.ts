/**
 * Computes the sum of three bits.
 */
import Chip from "../../Chip";
import HalfAdder from "../HalfAdder";
import { PIN_CARRY, PIN_SUM } from "../HalfAdder/HalfAdder";
import Or from "../../Or";
import { PIN_A, PIN_B, PIN_OUTPUT } from "../../types";
import { PIN_C } from "../../Multiplexing/Dmux4Way/Dmux4Way";

//  CHIP FullAdder {
//     IN a, b, c;  // 1-bit inputs
//     OUT sum,     // Right bit of a + b + c
//         carry;   // Left bit of a + b + c

//     PARTS:
//     HalfAdder(a=a, b=b, sum=sumAB, carry=carryAB);
//     HalfAdder(a=sumAB, b=c, sum=sum, carry=carryABC);
//     Or(a=carryAB, b=carryABC, out=carry);
// }

class FullAdder extends Chip {
    addAB: HalfAdder;
    addABC: HalfAdder;
    carryOr: Or;

    constructor() {
        super('FullAdder');

        this.addAB = new HalfAdder();
        this.addABC = new HalfAdder();
        this.carryOr = new Or();

        // Internal Wiring
        this.addAB.connectToOutputPin(PIN_SUM, this.addABC.getInputPin(PIN_A));
        this.addAB.connectToOutputPin(PIN_CARRY, this.carryOr.getInputPin(PIN_A));
        this.addABC.connectToOutputPin(PIN_CARRY, this.carryOr.getInputPin(PIN_B));

        // External Wiring
        this.createInputPin(PIN_A, this.addAB.getInputPin(PIN_A));
        this.createInputPin(PIN_B, this.addAB.getInputPin(PIN_B));
        this.createInputPin(PIN_C, this.addABC.getInputPin(PIN_B));

        this.createOutputPin(PIN_SUM, this.addABC.getOutputPin(PIN_SUM));
        this.createOutputPin(PIN_CARRY, this.carryOr.getOutputPin(PIN_OUTPUT));
    }
}

export default FullAdder;