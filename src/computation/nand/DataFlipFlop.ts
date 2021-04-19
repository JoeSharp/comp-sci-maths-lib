import { Consumer } from "../../types";
import { Clock, IClocked } from "./Clocked";
import Mux from "./Mux";

import Splitter from './Splitter';

class DataFlipFlop implements IClocked {
    input: boolean;
    output: Splitter<boolean>;
    
    constructor() {
        this.output = new Splitter();
    }

    sendInput(n: boolean) {
        this.input = n;
    }

    connectInput(): Consumer<boolean> {
        return this.sendInput.bind(this);
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.output.connectOutput(receiver);
    }

    tick() {
    }

    tock() {
        this.output.send(this.input);
    }
}

/**
 * 1-bit register:
 * If load[t] == 1 then out[t+1] = in[t]
 *                 else out does not change (out[t+1] = out[t])
 */

// CHIP Bit {
//     IN in, load;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     Mux(a=t1, b=in, sel=load, out=w1);
//     DFF(in=w1, out=t1, out=out);
// }
class OneBitRegister {
    mux: Mux;
    dff: DataFlipFlop;

    constructor(clock: Clock) {
        this.mux = new Mux();
        this.dff = new DataFlipFlop();
        this.dff.connectOutput(this.mux.connectB()); // t1
        this.mux.connectOutput(this.dff.connectInput()); // w1
        clock.registerClocked(this.dff);
    }

    connectInput() {
        return this.sendInput.bind(this);
    }

    sendInput(input: boolean) {
        this.mux.sendB(input);
    }

    sendLoad(load: boolean) {
        this.mux.sendSel(load);
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.dff.connectOutput(receiver);
    }
}

export default DataFlipFlop;

export {
    OneBitRegister
}