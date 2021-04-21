import { Consumer } from "../../../types";
import { PIN_A, PIN_B, PIN_OUTPUT, WORD_LENGTH } from '../types';
import And from "../And";
import Chip from "../Chip";
/**
 * 16-bit bitwise And:
 * for i = 0..15: out[i] = (a[i] and b[i])
 */

//  CHIP And16 {
//     IN a[16], b[16];
//     OUT out[16];

//     PARTS:
//     And(a=a[0], b=b[0], out=out[0]);
//     And(a=a[1], b=b[1], out=out[1]);
//     And(a=a[2], b=b[2], out=out[2]);
//     And(a=a[3], b=b[3], out=out[3]);
//     And(a=a[4], b=b[4], out=out[4]);
//     And(a=a[5], b=b[5], out=out[5]);
//     And(a=a[6], b=b[6], out=out[6]);
//     And(a=a[7], b=b[7], out=out[7]);
//     And(a=a[8], b=b[8], out=out[8]);
//     And(a=a[9], b=b[9], out=out[9]);
//     And(a=a[10], b=b[10], out=out[10]);
//     And(a=a[11], b=b[11], out=out[11]);
//     And(a=a[12], b=b[12], out=out[12]);
//     And(a=a[13], b=b[13], out=out[13]);
//     And(a=a[14], b=b[14], out=out[14]);
//     And(a=a[15], b=b[15], out=out[15]);
// }
class And16 extends Chip {
    ands: And[];

    constructor() {
        super('And16');

        this.ands = Array(WORD_LENGTH).fill(null).map((_, i) => new And());

        // External Wiring
        this.createInputBus(PIN_A, this.ands.map(a => a.getInputPin(PIN_A)));
        this.createInputBus(PIN_B, this.ands.map(a => a.getInputPin(PIN_B)));
        this.createOutputBus(PIN_OUTPUT, this.ands.map(a => a.getOutputPin(PIN_OUTPUT)));
    }
}

export default And16;