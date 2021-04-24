import And from "../../Logic/And";
import Chip from "../../Chip";
import Dmux from "../../Multiplexing/Dmux";
import Not from "../../Logic/Not";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "../../types";

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

export const PIN_C = 'c';
export const PIN_D = 'd';

class Dmux4Way extends Chip {
    notSel1: Not;
    inAndNotSel1: And;
    dmuxAB: Dmux;

    inAndSel1: And;
    dmuxCD: Dmux;

    constructor() {
        super('Dmux4Way')
        // in=1, sel=01
        // Demux AB, CD, sel = sel[0]
        this.notSel1 = new Not(); // false
        this.inAndNotSel1 = new And(); // false
        this.dmuxAB = new Dmux(); // in=false
        this.inAndSel1 = new And(); // true
        this.dmuxCD = new Dmux(); // in=true

        // Internal Wiring
        this.notSel1.connectToOutputPin(PIN_OUTPUT, this.inAndNotSel1.getInputPin(PIN_B));
        this.inAndNotSel1.connectToOutputPin(PIN_OUTPUT, this.dmuxAB.getInputPin(PIN_INPUT));
        this.inAndSel1.connectToOutputPin(PIN_OUTPUT, this.dmuxCD.getInputPin(PIN_INPUT));

        // External Wiring
        this.createInputPin(PIN_INPUT, this.inAndNotSel1.getInputPin(PIN_A), this.inAndSel1.getInputPin(PIN_A));
        this.createInputBus(PIN_SELECTOR, [
            (v) => {
                this.dmuxAB.sendToInputPin(PIN_SELECTOR, v)
                this.dmuxCD.sendToInputPin(PIN_SELECTOR, v)
            },
            (v) => {
                this.notSel1.sendToInputPin(PIN_INPUT, v)
                this.inAndSel1.sendToInputPin(PIN_B, v)
            }
        ]);

        this.createOutputPin(PIN_A, this.dmuxAB.getOutputPin(PIN_A));
        this.createOutputPin(PIN_B, this.dmuxAB.getOutputPin(PIN_B));
        this.createOutputPin(PIN_C, this.dmuxCD.getOutputPin(PIN_A));
        this.createOutputPin(PIN_D, this.dmuxCD.getOutputPin(PIN_B));
    }
}

export default Dmux4Way;