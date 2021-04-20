import { Consumer } from '../../../types';
import Mux from '../Mux';
import { WORD_LENGTH } from '../types'

/**
 * 16-bit multiplexor: 
 * for i = 0..15 out[i] = a[i] if sel == 0 
 *                        b[i] if sel == 1
 */

//  CHIP Mux16 {
//     IN a[16], b[16], sel;
//     OUT out[16];

//     PARTS:
//     Not(in=sel, out=notSel);
//     Mux(a=a[0], b=b[0], sel=sel, out=out[0]);
//     Mux(a=a[1], b=b[1], sel=sel, out=out[1]);
//     Mux(a=a[2], b=b[2], sel=sel, out=out[2]);
//     Mux(a=a[3], b=b[3], sel=sel, out=out[3]);
//     Mux(a=a[4], b=b[4], sel=sel, out=out[4]);
//     Mux(a=a[5], b=b[5], sel=sel, out=out[5]);
//     Mux(a=a[6], b=b[6], sel=sel, out=out[6]);
//     Mux(a=a[7], b=b[7], sel=sel, out=out[7]);
//     Mux(a=a[8], b=b[8], sel=sel, out=out[8]);
//     Mux(a=a[9], b=b[9], sel=sel, out=out[9]);
//     Mux(a=a[10], b=b[10], sel=sel, out=out[10]);
//     Mux(a=a[11], b=b[11], sel=sel, out=out[11]);
//     Mux(a=a[12], b=b[12], sel=sel, out=out[12]);
//     Mux(a=a[13], b=b[13], sel=sel, out=out[13]);
//     Mux(a=a[14], b=b[14], sel=sel, out=out[14]);
//     Mux(a=a[15], b=b[15], sel=sel, out=out[15]);

// }

class Mux16 {
    muxes: Mux[];

    constructor() {
        this.muxes = Array(WORD_LENGTH).fill(null).map((_, i) => new Mux());
    }

    connectSel() {
        return this.sendSel.bind(this);
    }

    sendSel(sel: boolean) {
        this.muxes.forEach(m => m.sendSel(sel));
    }

    connectA() {
        return this.muxes.map(m => m.connectA());
    }

    sendA(as: boolean[], startIndex: number = 0) {
        as.forEach((a, i) => this.muxes[startIndex + i].sendA(a));
    }

    connectB() {
        return this.muxes.map(m => m.connectB());
    }

    sendB(bs: boolean[], startIndex: number = 0) {
        bs.forEach((b, i) => this.muxes[startIndex + i].sendB(b));
    }

    connectOutput(receivers: Consumer<boolean>[], startIndex: number = 0) {
        receivers.forEach((r, i) => this.muxes[i + startIndex].connectOutput(r));
    }
}

export default Mux16;