import Chip from "../Chip";
import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import { PIN_E, PIN_F, PIN_G, PIN_H } from "../Dmux8Way/Dmux8Way";
import Mux16 from "../Mux16";
import Mux4Way16 from '../Mux4Way16';
import { PIN_A, PIN_B, PIN_OUTPUT, PIN_SELECTOR } from "../types";

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

class Mux8Way16 extends Chip {
    abcd: Mux4Way16;
    efgh: Mux4Way16;
    outMux: Mux16;

    constructor() {
        super('Mux8Way16');

        this.abcd = new Mux4Way16();
        this.efgh = new Mux4Way16();
        this.outMux = new Mux16();

        // Internal Wiring
        this.abcd.connectToOutputBus(PIN_OUTPUT, this.outMux.getInputBus(PIN_A));
        this.efgh.connectToOutputBus(PIN_OUTPUT, this.outMux.getInputBus(PIN_B));

        this.createInputBus(PIN_A, this.abcd.getInputBus(PIN_A));
        this.createInputBus(PIN_B, this.abcd.getInputBus(PIN_B));
        this.createInputBus(PIN_C, this.abcd.getInputBus(PIN_C));
        this.createInputBus(PIN_D, this.abcd.getInputBus(PIN_D));

        this.createInputBus(PIN_E, this.efgh.getInputBus(PIN_A));
        this.createInputBus(PIN_F, this.efgh.getInputBus(PIN_B));
        this.createInputBus(PIN_G, this.efgh.getInputBus(PIN_C));
        this.createInputBus(PIN_H, this.efgh.getInputBus(PIN_D));

        this.createInputBus(PIN_SELECTOR, [
            v => {
                this.abcd.sendToInputBus(PIN_SELECTOR, [v], 0);
                this.efgh.sendToInputBus(PIN_SELECTOR, [v], 0);
            },
            v => {
                this.abcd.sendToInputBus(PIN_SELECTOR, [v], 1);
                this.efgh.sendToInputBus(PIN_SELECTOR, [v], 1);
            },
            v => {
                this.outMux.sendToInputPin(PIN_SELECTOR, v);
            }
        ])

        this.createOutputBus(PIN_OUTPUT, this.outMux.getOutputBus(PIN_OUTPUT));
    }
}

export default Mux8Way16;