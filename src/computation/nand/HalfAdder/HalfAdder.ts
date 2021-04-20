/**
 * Computes the sum of two bits.
 */

import { Consumer } from "../../../types";
import And from "../And";
import Xor from "../Xor";

//  CHIP HalfAdder {
//     IN a, b;    // 1-bit inputs
//     OUT sum,    // Right bit of a + b 
//         carry;  // Left bit of a + b

//     PARTS:
//     // Put you code here:
//     Xor(a=a, b=b, out=sum);
//     And(a=a, b=b, out=carry);
// }
class HalfAdder {
    sum: Xor;
    carry: And;

    constructor() {
        this.sum = new Xor();
        this.carry = new And();
    }

    connectA() {
        return this.sendA.bind(this);
    }

    connectB() {
        return this.sendB.bind(this);
    }

    sendA(a: boolean) {
        this.sum.sendA(a);
        this.carry.sendA(a);
    }

    sendB(b: boolean) {
        this.sum.sendB(b);
        this.carry.sendB(b);
    }

    connectSum(receiver: Consumer<boolean>) {
        this.sum.connectOutput(receiver);
    }

    connectCarry(receiver: Consumer<boolean>) {
        this.carry.connectOutput(receiver);
    }
}

export default HalfAdder;