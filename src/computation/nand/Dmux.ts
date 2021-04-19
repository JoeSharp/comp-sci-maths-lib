import { Consumer } from "../../types";
import And from "./And";
import Not from "./Not";

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */
//  CHIP DMux {
//     IN in, sel;
//     OUT a, b;

//     PARTS:
//     // Put your code here:
//     Not(in=sel, out=notSel);
//     And(a=in, b=notSel, out=a);
//     And(a=in, b=sel, out=b);
// }
class Dmux {
    notSel: Not;
    inAndNotSel: And;
    inAndSel: And;

    constructor() {
        this.notSel = new Not();
        this.inAndNotSel = new And();
        this.inAndSel = new And();
        this.notSel.connectOutput(this.inAndNotSel.connectB());
    }

    connectInput() {
        return this.sendInput.bind(this);
    }

    connectSel() {
        return this.sendSel.bind(this);
    }

    sendInput(input: boolean) {
        this.inAndSel.sendA(input);
        this.inAndNotSel.sendA(input);
    }

    sendSel(sel: boolean) {
        this.notSel.sendIn(sel);
        this.inAndSel.sendB(sel);
    }

    connectA(receiver: Consumer<boolean>) {
        this.inAndNotSel.connectOutput(receiver);
    }

    connectB(receiver: Consumer<boolean>) {
        this.inAndSel.connectOutput(receiver);
    }
}

export default Dmux;