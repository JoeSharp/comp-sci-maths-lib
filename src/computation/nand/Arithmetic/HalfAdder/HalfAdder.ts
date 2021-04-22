/**
 * Computes the sum of two bits.
 */
import And from "../../And";
import Chip from "../../Chip";
import { PIN_A, PIN_B, PIN_OUTPUT } from "../../types";
import Xor from "../../Xor";

//  CHIP HalfAdder {
//     IN a, b;    // 1-bit inputs
//     OUT sum,    // Right bit of a + b
//         carry;  // Left bit of a + b

//     PARTS:
//     // Put you code here:
//     Xor(a=a, b=b, out=sum);
//     And(a=a, b=b, out=carry);
// }
export const PIN_SUM = 'sum';
export const PIN_CARRY = 'carry';

class HalfAdder extends Chip {
    sum: Xor;
    carry: And;

    constructor() {
        super('HalfAdder');

        this.sum = new Xor();
        this.carry = new And();

        // External Wiring
        this.createInputPin(PIN_A, this.sum.getInputPin(PIN_A), this.carry.getInputPin(PIN_A));
        this.createInputPin(PIN_B, this.sum.getInputPin(PIN_B), this.carry.getInputPin(PIN_B));
        this.createOutputPin(PIN_SUM, this.sum.getOutputPin(PIN_OUTPUT));
        this.createOutputPin(PIN_CARRY, this.carry.getOutputPin(PIN_OUTPUT));
    }
}

export default HalfAdder;