/**
 * Adds two 16-bit values.
 * The most significant carry bit is ignored.
 */

import { Consumer } from "../../../types";
import Chip from "../Chip";
import { PIN_C } from "../Dmux4Way/Dmux4Way";
import FullAdder from "../FullAdder";
import HalfAdder from "../HalfAdder";
import { PIN_CARRY, PIN_SUM } from "../HalfAdder/HalfAdder";
import { PIN_A, PIN_B, PIN_OUTPUT, WORD_LENGTH } from "../types";

//  CHIP Add16 {
//     IN a[16], b[16];
//     OUT out[16];

//     PARTS:
//     HalfAdder(a=a[0], b=b[0], sum=out[0], carry=carry0);
//     FullAdder(a=a[1], b=b[1], c=carry0, sum=out[1], carry=carry1);
//     FullAdder(a=a[2], b=b[2], c=carry1, sum=out[2], carry=carry2);
//     FullAdder(a=a[3], b=b[3], c=carry2, sum=out[3], carry=carry3);
//     FullAdder(a=a[4], b=b[4], c=carry3, sum=out[4], carry=carry4);
//     FullAdder(a=a[5], b=b[5], c=carry4, sum=out[5], carry=carry5);
//     FullAdder(a=a[6], b=b[6], c=carry5, sum=out[6], carry=carry6);
//     FullAdder(a=a[7], b=b[7], c=carry6, sum=out[7], carry=carry7);
//     FullAdder(a=a[8], b=b[8], c=carry7, sum=out[8], carry=carry8);
//     FullAdder(a=a[9], b=b[9], c=carry8, sum=out[9], carry=carry9);
//     FullAdder(a=a[10], b=b[10], c=carry9, sum=out[10], carry=carry10);
//     FullAdder(a=a[11], b=b[11], c=carry10, sum=out[11], carry=carry11);
//     FullAdder(a=a[12], b=b[12], c=carry11, sum=out[12], carry=carry12);
//     FullAdder(a=a[13], b=b[13], c=carry12, sum=out[13], carry=carry13);
//     FullAdder(a=a[14], b=b[14], c=carry13, sum=out[14], carry=carry14);
//     FullAdder(a=a[15], b=b[15], c=carry14, sum=out[15], carry=overflow);
// }
class Add16 extends Chip {
    halfAdd0: HalfAdder;
    adder1: FullAdder;
    adder2: FullAdder;
    adder3: FullAdder;
    adder4: FullAdder;
    adder5: FullAdder;
    adder6: FullAdder;
    adder7: FullAdder;
    adder8: FullAdder;
    adder9: FullAdder;
    adder10: FullAdder;
    adder11: FullAdder;
    adder12: FullAdder;
    adder13: FullAdder;
    adder14: FullAdder;
    adder15: FullAdder;

    constructor() {
        super('Add16');

        this.halfAdd0 = new HalfAdder();
        this.adder1 = new FullAdder();
        this.adder2 = new FullAdder();
        this.adder3 = new FullAdder();
        this.adder4 = new FullAdder();
        this.adder5 = new FullAdder();
        this.adder6 = new FullAdder();
        this.adder7 = new FullAdder();
        this.adder8 = new FullAdder();
        this.adder9 = new FullAdder();
        this.adder10 = new FullAdder();
        this.adder11 = new FullAdder();
        this.adder12 = new FullAdder();
        this.adder13 = new FullAdder();
        this.adder14 = new FullAdder();
        this.adder15 = new FullAdder();

        const fullAdders = [
            this.adder1,
            this.adder2,
            this.adder3,
            this.adder4,
            this.adder5,
            this.adder6,
            this.adder7,
            this.adder8,
            this.adder9,
            this.adder10,
            this.adder11,
            this.adder12,
            this.adder13,
            this.adder14,
            this.adder15
        ]

        const adders = [
            this.halfAdd0,
            ...fullAdders
        ]

        // Internal wiring
        this.halfAdd0.connectToOutputPin(PIN_CARRY, this.adder1.getInputPin(PIN_C));
        fullAdders.forEach((fullAdder, i) => {
            if (i < (fullAdders.length - 1)) {
                fullAdder.connectToOutputPin(PIN_CARRY, fullAdders[i + 1].getInputPin(PIN_C));
            }
        })

        // External Wiring
        this.createInputBus(PIN_A, adders.map(a => a.getInputPin(PIN_A)));
        this.createInputBus(PIN_B, adders.map(a => a.getInputPin(PIN_B)));
        this.createOutputBus(PIN_OUTPUT, adders.map(a => a.getOutputPin(PIN_SUM)));
    }
}

export default Add16;