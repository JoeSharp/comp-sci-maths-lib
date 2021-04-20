/**
 * Computes the sum of three bits.
 */

import { Consumer } from "../../../types";
import HalfAdder from "../HalfAdder";
import Or from "../Or";

//  CHIP FullAdder {
//     IN a, b, c;  // 1-bit inputs
//     OUT sum,     // Right bit of a + b + c
//         carry;   // Left bit of a + b + c

//     PARTS:
//     HalfAdder(a=a, b=b, sum=sumAB, carry=carryAB);
//     HalfAdder(a=sumAB, b=c, sum=sum, carry=carryABC);
//     Or(a=carryAB, b=carryABC, out=carry);
// }

class FullAdder {
    addAB: HalfAdder;
    addABC: HalfAdder;
    carryOr: Or;

    constructor() {
        this.addAB = new HalfAdder();
        this.addABC = new HalfAdder();
        this.carryOr = new Or();

        this.addAB.connectSum(this.addABC.connectA());
        this.addAB.connectCarry(this.carryOr.connectA());
        this.addABC.connectCarry(this.carryOr.connectB());
    }

    sendA(a: boolean) {
        this.addAB.sendA(a);
    }

    sendB(b: boolean) {
        this.addAB.sendB(b);
    }

    sendC(c: boolean) {
        this.addABC.sendB(c);
    }

    connectSum(receiver: Consumer<boolean>) {
        this.addABC.connectSum(receiver);
    }

    connectCarry(receiver: Consumer<boolean>) {
        this.carryOr.connectOutput(receiver);
    }
}

export default FullAdder;