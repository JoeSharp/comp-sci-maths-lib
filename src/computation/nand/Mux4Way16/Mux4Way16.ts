
/**
 * 4-way 16-bit multiplexor:
 * out = a if sel == 00
 *       b if sel == 01
 *       c if sel == 10
 *       d if sel == 11
 */

import { Consumer } from "../../../types";
import Chip from "../Chip";
import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import Mux16 from "../Mux16";
import { PIN_A, PIN_B, PIN_OUTPUT, PIN_SELECTOR } from "../types";

//  CHIP Mux4Way16 {
//     IN a[16], b[16], c[16], d[16], sel[2];
//     OUT out[16];

//     PARTS:
//     Mux16(a=a, b=b, sel=sel[0], out=aOrB);
//     Mux16(a=c, b=d, sel=sel[0], out=cOrD);
//     Mux16(a=aOrB, b=cOrD, sel=sel[1], out=out);
// }
class Mux4Way16 extends Chip {
    aOrB: Mux16;
    cOrD: Mux16;
    outMux: Mux16;

    constructor() {
        super('Mux4Way16')
        this.aOrB = new Mux16();
        this.cOrD = new Mux16();
        this.outMux = new Mux16();

        // Internal Wiring
        this.aOrB.connectToOutputBus(PIN_OUTPUT, this.outMux.getInputBus(PIN_A));
        this.cOrD.connectToOutputBus(PIN_OUTPUT, this.outMux.getInputBus(PIN_B));

        // External Wiring
        this.createInputBus(PIN_A, this.aOrB.getInputBus(PIN_A));
        this.createInputBus(PIN_B, this.aOrB.getInputBus(PIN_B));
        this.createInputBus(PIN_C, this.cOrD.getInputBus(PIN_A));
        this.createInputBus(PIN_D, this.cOrD.getInputBus(PIN_B));
        this.createInputBus(PIN_SELECTOR, [v => {
            this.aOrB.sendToInputPin(PIN_SELECTOR, v);
            this.cOrD.sendToInputPin(PIN_SELECTOR, v);
        }, v => {
            this.outMux.sendToInputPin(PIN_SELECTOR, v);
            this.outMux.sendToInputPin(PIN_SELECTOR, v);
        }])
        this.createOutputBus(PIN_OUTPUT, this.outMux.getOutputBus(PIN_OUTPUT));
    }
}

export default Mux4Way16;