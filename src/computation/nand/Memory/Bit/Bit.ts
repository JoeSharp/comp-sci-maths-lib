/**
 * 1-bit register:
 * If load[t] == 1 then out[t+1] = in[t]
 *                 else out does not change (out[t+1] = out[t])
 */

import DataFlipFlop from "../DataFlipFlop";
import Mux from "../../Multiplexing/Mux";
import { Clock } from '../../Clocked';
import Chip from "../../Chip";
import { PIN_A, PIN_B, PIN_INPUT, PIN_LOAD, PIN_OUTPUT, PIN_SELECTOR } from "../../types";

// CHIP Bit {
//     IN in, load;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     Mux(a=t1, b=in, sel=load, out=w1);
//     DFF(in=w1, out=t1, out=out);
// }
class Bit extends Chip {
    mux: Mux;
    dff: DataFlipFlop;

    constructor(clock: Clock) {
        super('Bit');
        this.mux = new Mux();
        this.dff = new DataFlipFlop();

        clock.registerClocked(this.dff);

        // Internal Wiring
        this.dff.connectToOutputPin(PIN_OUTPUT, this.mux.getInputPin(PIN_A)); // t1
        this.mux.connectToOutputPin(PIN_OUTPUT, this.dff.getInputPin(PIN_INPUT)); // w1

        // External Wiring
        this.createInputPin(PIN_INPUT, this.mux.getInputPin(PIN_B));
        this.createInputPin(PIN_LOAD, this.mux.getInputPin(PIN_SELECTOR));
        this.createOutputPin(PIN_OUTPUT, this.dff.getOutputPin(PIN_OUTPUT));
    }
}

export default Bit;