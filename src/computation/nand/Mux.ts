import { Consumer } from "../../../types";

import And from './And';
import Not from './Not';
import Or from './Or';

/** 
 * Multiplexor:
 * out = a if sel == 0
 *       b otherwise
 */
//  CHIP Mux {
//     IN a, b, sel;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     And(a=b, b=sel, out=bAndSel);
//     Not(in=sel, out=notSel);
//     And(a=a, b=notSel, out=aAndNotSel);
//     Or(a=aAndNotSel, b=bAndSel, out=out);
// }
class Mux {
    bAndSel: And;
    notSel: Not;
    aAndNotSel: And;
    aAndNotSelOrBAndSel: Or;

    constructor() {
        this.bAndSel = new And();
        this.notSel = new Not();
        this.aAndNotSel = new And();
        this.aAndNotSelOrBAndSel = new Or();

        this.notSel.connectOutput(this.aAndNotSel.connectB());
        this.bAndSel.connectOutput(this.aAndNotSelOrBAndSel.connectB());
        this.aAndNotSel.connectOutput(this.aAndNotSelOrBAndSel.connectA());
    }

    connectA() {
        return this.sendA.bind(this);
    }
    
    connectB() {
        return this.sendB.bind(this);
    }

    connectSel() {
        return this.sendSel.bind(this);
    }

    sendA(a: boolean) {
        this.aAndNotSel.sendA(a);
    }

    sendB(b: boolean) {
        this.bAndSel.sendA(b);
    }

    sendSel(sel: boolean) {
        this.bAndSel.sendB(sel);
        this.notSel.sendIn(sel);
    }

    connectOutput(r: Consumer<boolean>) {
        this.aAndNotSelOrBAndSel.connectOutput(r);
    }
}

export default Mux;