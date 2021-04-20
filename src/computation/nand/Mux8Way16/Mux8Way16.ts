import { Consumer } from "../../../types";
import Mux16 from "../Mux16";
import Mux4Way16 from '../Mux4Way16';

/**
 * 8-way 16-bit multiplexor:
 * out = a if sel == 000
 *       b if sel == 001
 *       etc.
 *       h if sel == 111
 */

//  CHIP Mux8Way16 {
//     IN a[16], b[16], c[16], d[16],
//        e[16], f[16], g[16], h[16],
//        sel[3];
//     OUT out[16];

//     PARTS:
//     // Put your code here:
//     Mux4Way16(a=a, b=b, c=c, d=d, sel=sel[0..1], out=abcd);
//     Mux4Way16(a=e, b=f, c=g, d=h, sel=sel[0..1], out=efgh);
//     Mux16(a=abcd, b=efgh, sel=sel[2], out=out);
// }

class Mux8Way16 {
    abcd: Mux4Way16;
    efgh: Mux4Way16;
    outMux: Mux16;

    constructor() {
        this.abcd = new Mux4Way16();
        this.efgh = new Mux4Way16();
        this.outMux = new Mux16();

        this.abcd.connectOutput(this.outMux.connectA());
        this.efgh.connectOutput(this.outMux.connectB());
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

    connectE() {
        return this.sendE.bind(this);
    }
    connectF() {
        return this.sendF.bind(this);
    }
    connectG() {
        return this.sendG.bind(this);
    }
    connectH() {
        return this.sendH.bind(this);
    }

    sendA(as: boolean[], startIndex: number = 0) {
        this.abcd.sendA(as, startIndex);
    }

    sendB(as: boolean[], startIndex: number = 0) {
        this.abcd.sendB(as, startIndex);
    }

    sendC(as: boolean[], startIndex: number = 0) {
        this.abcd.sendC(as, startIndex);
    }

    sendD(as: boolean[], startIndex: number = 0) {
        this.abcd.sendD(as, startIndex);
    }

    sendE(as: boolean[], startIndex: number = 0) {
        this.efgh.sendA(as, startIndex);
    }

    sendF(as: boolean[], startIndex: number = 0) {
        this.efgh.sendB(as, startIndex);
    }

    sendG(as: boolean[], startIndex: number = 0) {
        this.efgh.sendC(as, startIndex);
    }

    sendH(as: boolean[], startIndex: number = 0) {
        this.efgh.sendD(as, startIndex);
    }

    sendSel(sel: boolean[], startIndex: number = 0) {
        sel.forEach((s, i) => {
            const index = startIndex + i;
            switch (index) {
                case 0:
                case 1:
                    this.abcd.sendSel([s], index);
                    this.efgh.sendSel([s], index);
                    break;
                case 2:
                    this.outMux.sendSel(s);
                    this.outMux.sendSel(s);
                    break;
            }
        })
    }

    connectOutput(receivers: Consumer<boolean>[], startIndex: number = 0) {
        this.outMux.connectOutput(receivers, startIndex);
    }
}

export default Mux8Way16;