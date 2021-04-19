import { Consumer } from "../../../types";

import Not from './Not';
import Nand from './Nand2';

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

class Or {
    nandNotA: Not
    nandNotB: Not;
    nandNotANotB: Nand;

    constructor() {

        this.nandNotA = new Not();
        this.nandNotB = new Not();

        this.nandNotANotB = new Nand();
        this.nandNotA.connectOutput(this.nandNotANotB.connectA());
        this.nandNotB.connectOutput(this.nandNotANotB.connectB());
    }

    connectA() {
        return this.sendA.bind(this);
    }
    
    connectB() {
        return this.sendB.bind(this);
    }

    sendA(i: boolean) {
        this.nandNotA.sendIn(i);
    }

    sendB(i: boolean) {
        this.nandNotB.sendIn(i);
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.nandNotANotB.connectOutput(receiver);
    }
}

export default Or;