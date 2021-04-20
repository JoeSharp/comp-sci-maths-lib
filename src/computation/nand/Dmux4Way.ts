import { Consumer } from "../../types";
import And from "./And";
import Dmux from "./Dmux";
import Not from "./Not";

/**
 * 4-way demultiplexor:
 * {a, b, c, d} = {in, 0, 0, 0} if sel == 00
 *                {0, in, 0, 0} if sel == 01
 *                {0, 0, in, 0} if sel == 10
 *                {0, 0, 0, in} if sel == 11
 */
//  CHIP DMux4Way {
//     IN in, sel[2];
//     OUT a, b, c, d;

//     PARTS:
//     Not(in=sel[1], out=notSel1);
//     And(a=in, b=notSel1, out=inAndNotSel1);
//     DMux(in=inAndNotSel1, sel=sel[0], a=a, b=b);

//     And(a=in, b=sel[1], out=inAndSel1);
//     DMux(in=inAndSel1, sel=sel[0], a=c, b=d);    
// }

class Dmux4Way {
    notSel1: Not;
    inAndNotSel1: And;
    dmuxAB: Dmux;

    inAndSel1: And;
    dmuxCD: Dmux;

    constructor() {
        // in=1, sel=01        
        // Demux AB, CD, sel = sel[0]
        this.notSel1 = new Not(); // false
        this.inAndNotSel1 = new And(); // false
        this.dmuxAB = new Dmux(); // in=false
        this.inAndSel1 = new And(); // true
        this.dmuxCD = new Dmux(); // in=true
    
        this.notSel1.connectOutput(this.inAndNotSel1.connectB());
        this.inAndNotSel1.connectOutput(this.dmuxAB.connectInput());
        this.inAndSel1.connectOutput(this.dmuxCD.connectInput());
    }

    connectInput() {
        return this.sendInput.bind(this);
    }

    sendInput(input: boolean) {
        this.inAndNotSel1.sendA(input);
        this.inAndSel1.sendA(input);
    }

    sendSel(sel: boolean[], startIndex: number = 0) {
        sel.forEach((s, i) => {
            const index = startIndex + i;
            switch(index) {
                case 0:
                    this.dmuxAB.sendSel(s);
                    this.dmuxCD.sendSel(s);
                    break;
                case 1:
                    this.notSel1.sendIn(s);
                    this.inAndSel1.sendB(s);
                    break;
            }
        })
    }

    connectA(receiver: Consumer<boolean>) {
        this.dmuxAB.connectA(receiver);
    }
    connectB(receiver: Consumer<boolean>) {
        this.dmuxAB.connectB(receiver);
    }
    connectC(receiver: Consumer<boolean>) {
        this.dmuxCD.connectA(receiver);
    }
    connectD(receiver: Consumer<boolean>) {
        this.dmuxCD.connectB(receiver);
    }
}

export default Dmux4Way;