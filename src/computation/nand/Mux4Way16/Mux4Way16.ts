
/**
 * 4-way 16-bit multiplexor:
 * out = a if sel == 00
 *       b if sel == 01
 *       c if sel == 10
 *       d if sel == 11
 */

import { Consumer } from "../../../types";
import Mux16 from "../Mux16";

//  CHIP Mux4Way16 {
//     IN a[16], b[16], c[16], d[16], sel[2];
//     OUT out[16];

//     PARTS:
//     Mux16(a=a, b=b, sel=sel[0], out=aOrB);
//     Mux16(a=c, b=d, sel=sel[0], out=cOrD);
//     Mux16(a=aOrB, b=cOrD, sel=sel[1], out=out);
// }
class Mux4Way16 {
    aOrB: Mux16;
    cOrD: Mux16;
    outMux: Mux16;

    constructor() {
        this.aOrB = new Mux16();
        this.cOrD = new Mux16();
        this.outMux = new Mux16();

        this.aOrB.connectOutput(this.outMux.connectA());
        this.cOrD.connectOutput(this.outMux.connectB());
    }

    connectA() {
        return this.sendA.bind(this);
    }
    connectB() {
        return this.sendB.bind(this);
    }
    connectC() {
        return this.sendC.bind(this);
    }
    connectD() {
        return this.sendD.bind(this);
    }

    sendSel(sel: boolean[], startIndex: number = 0) {
        sel.forEach((s, i) => {
            const index = startIndex + i;
            switch (index) {
                case 0:
                    this.aOrB.sendSel(s);
                    this.cOrD.sendSel(s);
                    break;
                case 1:
                    this.outMux.sendSel(s);
                    this.outMux.sendSel(s);
                    break;
            }
        })
    }

    sendA(as: boolean[], startIndex: number = 0) {
        this.aOrB.sendA(as, startIndex);
    }

    sendB(as: boolean[], startIndex: number = 0) {
        this.aOrB.sendB(as, startIndex);
    }

    sendC(as: boolean[], startIndex: number = 0) {
        this.cOrD.sendA(as, startIndex);
    }

    sendD(as: boolean[], startIndex: number = 0) {
        this.cOrD.sendB(as, startIndex);
    }

    connectOutput(receivers: Consumer<boolean>[], startIndex: number = 0) {
        this.outMux.connectOutput(receivers, startIndex);
    }
}

export default Mux4Way16;