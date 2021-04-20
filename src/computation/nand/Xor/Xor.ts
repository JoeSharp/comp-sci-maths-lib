/**
 * Exclusive-or gate:
 * out = not (a == b)
 */

import { Consumer } from "../../../types";
import And from "../And";
import Not from "../Not";
import Or from "../Or";

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

class Xor {
    notA: Not;
    notB: Not;
    aAndNotB: And;
    notaAndB: And;
    outOr: Or;

    constructor() {
        this.notA = new Not();
        this.notB = new Not();
        this.aAndNotB = new And();
        this.notaAndB = new And();
        this.outOr = new Or();

        this.notA.connectOutput(this.notaAndB.connectA());

        this.notB.connectOutput(this.aAndNotB.connectB());
        this.aAndNotB.connectOutput(this.outOr.connectA());
        this.notaAndB.connectOutput(this.outOr.connectB());
    }

    connectA() {
        return this.sendA.bind(this);
    }

    connectB() {
        return this.sendB.bind(this);
    }

    sendA(a: boolean) {
        this.notA.sendIn(a);
        this.aAndNotB.sendA(a);
    }

    sendB(b: boolean) {
        this.notB.sendIn(b);
        this.notaAndB.sendB(b);
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.outOr.connectOutput(receiver);
    }
}

export default Xor;