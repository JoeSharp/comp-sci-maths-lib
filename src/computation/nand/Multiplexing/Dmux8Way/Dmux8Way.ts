/**
 * 8-way demultiplexor:
 * {a, b, c, d, e, f, g, h} = {in, 0, 0, 0, 0, 0, 0, 0} if sel == 000
 *                            {0, in, 0, 0, 0, 0, 0, 0} if sel == 001
 *                            etc.
 *                            {0, 0, 0, 0, 0, 0, 0, in} if sel == 111
 */
import And from "../../Logic/And";
import Chip from "../../Chip";
import Dmux4Way from "../Dmux4Way";
import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import Not from "../../Logic/Not";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR } from "../../types";

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

export const PIN_E = 'e';
export const PIN_F = 'f';
export const PIN_G = 'g';
export const PIN_H = 'h';

class Dmux8Way extends Chip {
    notSel2: Not;
    inAndNotSel2: And;
    dmuxABCD: Dmux4Way;
    inAndSel2: And;
    dmuxEFGH: Dmux4Way;

    constructor() {
        super('Dmux8Way')
        this.notSel2 = new Not();
        this.inAndNotSel2 = new And();
        this.dmuxABCD = new Dmux4Way();
        this.inAndSel2 = new And();
        this.dmuxEFGH = new Dmux4Way();

        // Internal Wiring
        this.notSel2.connectToOutputPin(PIN_OUTPUT, this.inAndNotSel2.getInputPin(PIN_B));
        this.inAndNotSel2.connectToOutputPin(PIN_OUTPUT, this.dmuxABCD.getInputPin(PIN_INPUT));
        this.inAndSel2.connectToOutputPin(PIN_OUTPUT, this.dmuxEFGH.getInputPin(PIN_INPUT));

        // External Wiring
        this.createInputPin(PIN_INPUT, this.inAndNotSel2.getInputPin(PIN_A), this.inAndSel2.getInputPin(PIN_A));
        this.createInputBus(PIN_SELECTOR, [
            (v) => {
                this.dmuxABCD.sendToInputBus(PIN_SELECTOR, [v], 0)
                this.dmuxEFGH.sendToInputBus(PIN_SELECTOR, [v], 0)
            },
            (v) => {
                this.dmuxABCD.sendToInputBus(PIN_SELECTOR, [v], 1)
                this.dmuxEFGH.sendToInputBus(PIN_SELECTOR, [v], 1)
            },
            (v) => {
                this.notSel2.sendToInputPin(PIN_INPUT, v)
                this.inAndSel2.sendToInputPin(PIN_B, v)
            }
        ]);

        this.createOutputPin(PIN_A, this.dmuxABCD.getOutputPin(PIN_A));
        this.createOutputPin(PIN_B, this.dmuxABCD.getOutputPin(PIN_B));
        this.createOutputPin(PIN_C, this.dmuxABCD.getOutputPin(PIN_C));
        this.createOutputPin(PIN_D, this.dmuxABCD.getOutputPin(PIN_D));

        this.createOutputPin(PIN_E, this.dmuxEFGH.getOutputPin(PIN_A));
        this.createOutputPin(PIN_F, this.dmuxEFGH.getOutputPin(PIN_B));
        this.createOutputPin(PIN_G, this.dmuxEFGH.getOutputPin(PIN_C));
        this.createOutputPin(PIN_H, this.dmuxEFGH.getOutputPin(PIN_D));
    }
}

export default Dmux8Way;