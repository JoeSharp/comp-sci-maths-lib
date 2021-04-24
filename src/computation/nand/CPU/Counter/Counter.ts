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
import { BinaryBus, PIN_INPUT, PIN_LOAD, PIN_OUTPUT, ZERO_WORD } from "../../types";

class Counter extends Chip {
    incrementer: Inc16;
    register: Register;
    busFork: BusFork;

    constructor(clock: Clock) {
        super('Counter');

        this.incrementer = new Inc16();
        this.register = new Register(clock);
        this.busFork = new BusFork()
            .withOutput(this.incrementer.getInputBus(PIN_INPUT));

        // Internal Wiring
        this.incrementer.connectToOutputBus(PIN_OUTPUT, this.register.getInputBus(PIN_INPUT));
        this.register.connectToOutputBus(PIN_OUTPUT, this.busFork.getInput())

        // External Wiring
        // this.createInputBus(PIN_INPUT, this.incrementer.getInputBus(PIN_INPUT));
        this.createOutputBus(PIN_OUTPUT, this.register.getOutputBus(PIN_OUTPUT));

        // Initial State
        // this.register.sendToInputBus(PIN_INPUT, ZERO_WORD);
        this.register.sendToInputPin(PIN_LOAD, true);
        // this.incrementer.sendToInputBus(PIN_INPUT, ZERO_WORD);
    }
}

export default Counter;