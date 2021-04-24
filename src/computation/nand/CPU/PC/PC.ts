/**
 * A 16-bit counter with load and reset control bits.
 * if      (reset[t] == 1) out[t+1] = 0
 * else if (load[t] == 1)  out[t+1] = in[t]
 * else if (inc[t] == 1)   out[t+1] = out[t] + 1  (integer addition)
 * else                    out[t+1] = out[t]
 */

import Inc16 from "../../Arithmetic/Inc16";
import BusFork from "../../BusFork";
import Chip from "../../Chip";
import { Clock } from "../../Clocked";
import Register from "../../Memory/Register";
import Mux16 from "../../Multiplexing/Mux16";
import { PIN_A, PIN_B, PIN_INPUT, PIN_LOAD, PIN_OUTPUT, PIN_SELECTOR, WORD_LENGTH } from "../../types";

export const PIN_INCREMENT = 'inc';
export const PIN_RESET = 'reset';

//  CHIP PC {
//     IN in[16],load,inc,reset;
//     OUT out[16];

//     PARTS:
//     // Increment the last value, select the incremented one if possible
//     Inc16(in=lastPC, out=lastPCplusOne);
//     Mux16(a=lastPC, b=lastPCplusOne, sel=inc, out=io);

//     // Loading input takes precendence over incremented value
//     Mux16(a=io, b=in, sel=load, out=lo);

//     // Reset has highest priority
//     Mux16(a=lo, b[0..15]=false, sel=reset, out=ro);

//     // Create that time spacing
//     Register(in=ro, out=lastPC, out=out, load=true);
// }

class PC extends Chip {
    incrementer: Inc16;
    incrementMux: Mux16;

    loadMux: Mux16;
    resetMux: Mux16;

    register: Register;
    lastPCFork: BusFork;

    constructor(clock: Clock) {
        super('PC');

        this.incrementer = new Inc16();
        this.incrementMux = new Mux16();
        this.loadMux = new Mux16();
        this.resetMux = new Mux16();
        this.register = new Register(clock);
        this.lastPCFork = new BusFork();

        // Internal Wiring
        this.incrementer.connectToOutputBus(PIN_OUTPUT, this.incrementMux.getInputBus(PIN_B));
        this.lastPCFork.withOutput(this.incrementer.getInputBus(PIN_INPUT));
        this.lastPCFork.withOutput(this.incrementMux.getInputBus(PIN_A));
        this.incrementMux.connectToOutputBus(PIN_OUTPUT, this.loadMux.getInputBus(PIN_A));
        this.loadMux.connectToOutputBus(PIN_OUTPUT, this.resetMux.getInputBus(PIN_A));
        this.resetMux.connectToOutputBus(PIN_OUTPUT, this.register.getInputBus(PIN_INPUT));
        this.register.sendToInputPin(PIN_LOAD, true);
        this.register.connectToOutputBus(PIN_OUTPUT, this.lastPCFork.getInput());
        this.resetMux.sendToInputBus(PIN_B, Array(WORD_LENGTH).fill(null).map(() => false));

        // External Wiring
        this.createInputPin(PIN_LOAD, this.loadMux.getInputPin(PIN_SELECTOR));
        this.createInputPin(PIN_INCREMENT, this.incrementMux.getInputPin(PIN_SELECTOR));
        this.createInputPin(PIN_RESET, this.resetMux.getInputPin(PIN_SELECTOR));
        this.createInputBus(PIN_INPUT, this.loadMux.getInputBus(PIN_B));
        this.createOutputBus(PIN_OUTPUT, this.register.getOutputBus(PIN_OUTPUT));
    }
}

export default PC;