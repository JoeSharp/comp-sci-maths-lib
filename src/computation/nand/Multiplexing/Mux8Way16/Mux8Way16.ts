import Chip from "../../Chip";
import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import { PIN_E, PIN_F, PIN_G, PIN_H } from "../Dmux8Way/Dmux8Way";
import Mux16 from "../Mux16";
import Mux4Way16 from "../Mux4Way16";
import { PIN_A, PIN_B, PIN_OUTPUT, PIN_SELECTOR } from "../../types";

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
    super("Mux8Way16");

    this.abcd = new Mux4Way16();
    this.efgh = new Mux4Way16();
    this.outMux = new Mux16();

    // Internal Wiring
    this.abcd.connectToBus(PIN_OUTPUT, this.outMux.getBus(PIN_A));
    this.efgh.connectToBus(PIN_OUTPUT, this.outMux.getBus(PIN_B));

    this.createBus(PIN_A, this.abcd.getBus(PIN_A));
    this.createBus(PIN_B, this.abcd.getBus(PIN_B));
    this.createBus(PIN_C, this.abcd.getBus(PIN_C));
    this.createBus(PIN_D, this.abcd.getBus(PIN_D));

    this.createBus(PIN_E, this.efgh.getBus(PIN_A));
    this.createBus(PIN_F, this.efgh.getBus(PIN_B));
    this.createBus(PIN_G, this.efgh.getBus(PIN_C));
    this.createBus(PIN_H, this.efgh.getBus(PIN_D));

    this.createBus(PIN_SELECTOR, [
      (v) => {
        this.abcd.sendToBus(PIN_SELECTOR, [v], 0);
        this.efgh.sendToBus(PIN_SELECTOR, [v], 0);
      },
      (v) => {
        this.abcd.sendToBus(PIN_SELECTOR, [v], 1);
        this.efgh.sendToBus(PIN_SELECTOR, [v], 1);
      },
      (v) => {
        this.outMux.sendToPin(PIN_SELECTOR, v);
      },
    ]);

    this.createBus(PIN_OUTPUT, this.outMux.getBus(PIN_OUTPUT));
  }
}

export default Mux8Way16;
