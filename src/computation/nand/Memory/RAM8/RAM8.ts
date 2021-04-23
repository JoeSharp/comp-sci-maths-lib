import { PIN_F } from "../../Arithmetic/ALU/ALU";
import BusFork from "../../BusFork";
import Chip from "../../Chip";
import { Clock } from "../../Clocked";
import { PIN_C, PIN_D } from "../../Multiplexing/Dmux4Way/Dmux4Way";
import Dmux8Way from "../../Multiplexing/Dmux8Way";
import { PIN_E, PIN_G, PIN_H } from "../../Multiplexing/Dmux8Way/Dmux8Way";
import Mux8Way16 from "../../Multiplexing/Mux8Way16";
import { PIN_A, PIN_ADDRESS, PIN_B, PIN_INPUT, PIN_LOAD, PIN_OUTPUT, PIN_SELECTOR, WORD_LENGTH } from "../../types";
import Register from "../Register";

/**
 * Memory of 8 registers, each 16 bit-wide. Out holds the value
 * stored at the memory location specified by address. If load==1, then 
 * the in value is loaded into the memory location specified by address 
 * (the loaded value will be emitted to out from the next time step onward).
 */

//  CHIP RAM8 {
//     IN in[16], load, address[3];
//     OUT out[16];

//     PARTS:
//     DMux8Way(in=load, sel=address, a=la, b=lb, c=lc, d=ld, e=le, f=lf, g=lg, h=lh);
//     Register(in=in, out=ra, load=la);
//     Register(in=in, out=rb, load=lb);
//     Register(in=in, out=rc, load=lc);
//     Register(in=in, out=rd, load=ld);
//     Register(in=in, out=re, load=le);
//     Register(in=in, out=rf, load=lf);
//     Register(in=in, out=rg, load=lg);
//     Register(in=in, out=rh, load=lh);

//     Mux8Way16(a=ra, b=rb, c=rc, d=rd, e=re, f=rf, g=rg, h=rh, sel=address, out=out);
// }

class RAM8 extends Chip {
    demux: Dmux8Way;
    mux: Mux8Way16;
    registers: Register[];
    addressFork: BusFork;
    inputFork: BusFork;

    constructor(clock: Clock) {
        super('RAM8');

        this.demux = new Dmux8Way();
        this.mux = new Mux8Way16();
        this.registers = Array(WORD_LENGTH).fill(null).map(() => new Register(clock));

        this.addressFork = new BusFork();
        this.inputFork = new BusFork();

        this.registers.forEach(r => this.inputFork.withOutput(r.getInputBus(PIN_INPUT)));
        this.inputFork.build();

        this.addressFork
            .withOutput(this.demux.getInputBus(PIN_SELECTOR))
            .withOutput(this.mux.getInputBus(PIN_SELECTOR))
            .build();

        [PIN_A, PIN_B, PIN_C, PIN_D, PIN_E, PIN_F, PIN_G, PIN_H].forEach((pin, i) => {
            this.demux.connectToOutputPin(pin, this.registers[i].getInputPin(PIN_LOAD));
            this.registers[i].connectToOutputBus(PIN_OUTPUT, this.mux.getInputBus(pin));
        })

        this.createInputPin(PIN_LOAD, this.demux.getInputPin(PIN_INPUT));
        this.createInputBus(PIN_ADDRESS, this.addressFork.getInput());
        this.createInputBus(PIN_INPUT, this.inputFork.getInput());
        this.createOutputBus(PIN_OUTPUT, this.mux.getOutputBus(PIN_OUTPUT));
    }
}

export default RAM8;