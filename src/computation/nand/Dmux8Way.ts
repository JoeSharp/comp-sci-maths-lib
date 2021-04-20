/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */

import { Consumer } from "../../types";
import And from "./And";
import Dmux4Way from "./Dmux4Way";
import Not from "./Not";

//  CHIP DMux8Way {
//     IN in, sel[3];
//     OUT a, b, c, d, e, f, g, h;

//     PARTS:
//     Not(in=sel[2], out=notSel2);

//     And(a=in, b=notSel2, out=inAndNotSel2);
//     DMux4Way(in=inAndNotSel2, sel=sel[0..1], a=a, b=b, c=c, d=d);

//     And(a=in, b=sel[2], out=inAndSel2);
//     DMux4Way(in=inAndSel2, sel=sel[0..1], a=e, b=f, c=g, d=h);    
// }

class Dmux8Way {
    notSel2: Not;
    inAndNotSel2: And;
    dmuxABCD: Dmux4Way;
    inAndSel2: And;
    dmuxEFGH: Dmux4Way;

    constructor() {
        this.notSel2 = new Not();
        this.inAndNotSel2 = new And();
        this.dmuxABCD = new Dmux4Way();
        this.inAndSel2 = new And();
        this.dmuxEFGH = new Dmux4Way();

        this.notSel2.connectOutput(this.inAndNotSel2.connectB());
        this.inAndNotSel2.connectOutput(this.dmuxABCD.connectInput());
        this.inAndSel2.connectOutput(this.dmuxEFGH.connectInput());
    }

    connectInput() {
        return this.sendInput.bind(this);
    }

    sendSel(sel: boolean[], startIndex: number = 0) {
        sel.forEach((s, i) => {
            const index = startIndex + i;
            switch (index) {
                case 0:
                case 1:
                    this.dmuxABCD.sendSel([s], index);
                    this.dmuxEFGH.sendSel([s], index);
                    break;
                case 2:
                    this.notSel2.sendIn(s);
                    this.inAndSel2.sendB(s);
                    break;
            }
        })
    }

    sendInput(input: boolean) {
        this.inAndNotSel2.sendA(input);
        this.inAndSel2.sendA(input);
    }

    connectA(receiver: Consumer<boolean>) {
        this.dmuxABCD.connectA(receiver);
    }

    connectB(receiver: Consumer<boolean>) {
        this.dmuxABCD.connectB(receiver);
    }

    connectC(receiver: Consumer<boolean>) {
        this.dmuxABCD.connectC(receiver);
    }

    connectD(receiver: Consumer<boolean>) {
        this.dmuxABCD.connectD(receiver);
    }

    connectE(receiver: Consumer<boolean>) {
        this.dmuxEFGH.connectA(receiver);
    }

    connectF(receiver: Consumer<boolean>) {
        this.dmuxEFGH.connectB(receiver);
    }

    connectG(receiver: Consumer<boolean>) {
        this.dmuxEFGH.connectC(receiver);
    }

    connectH(receiver: Consumer<boolean>) {
        this.dmuxEFGH.connectD(receiver);
    }
}

export default Dmux8Way;