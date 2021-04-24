/**
 * The ALU (Arithmetic Logic Unit).
 * Computes one of the following functions:
 * x+y, x-y, y-x, 0, 1, -1, x, y, -x, -y, !x, !y,
 * x+1, y+1, x-1, y-1, x&y, x|y on two 16-bit inputs,
 * according to 6 input bits denoted zx,nx,zy,ny,f,no.
 * In addition, the ALU computes two 1-bit outputs:
 * if the ALU output == 0, zr is set to 1; otherwise zr is set to 0;
 * if the ALU output < 0, ng is set to 1; otherwise ng is set to 0.
 */
import Add16 from "../../Arithmetic/Add16";
import Chip from "../../Chip";
import Mux16 from "../../Multiplexing/Mux16";
import Not from "../../Logic/Not";
import Not16 from "../../Logic/Not16";
import Or from "../../Logic/Or";
import Or8Way from "../../Logic/Or8Way";
import { PIN_A, PIN_B, PIN_INPUT, PIN_OUTPUT, PIN_SELECTOR, WORD_LENGTH } from "../../types";

// Implementation: the ALU logic manipulates the x and y inputs
// and operates on the resulting values, as follows:
// if (zx == 1) set x = 0        // 16-bit constant
// if (nx == 1) set x = !x       // bitwise not
// if (zy == 1) set y = 0        // 16-bit constant
// if (ny == 1) set y = !y       // bitwise not
// if (f == 1)  set out = x + y  // integer 2's complement addition
// if (f == 0)  set out = x & y  // bitwise and
// if (no == 1) set out = !out   // bitwise not
// if (out == 0) set zr = 1
// if (out < 0) set ng = 1
/*
CHIP ALU {
    IN
        x[16], y[16],  // 16-bit inputs
        zx, // zero the x input?
        nx, // negate the x input?
        zy, // zero the y input?
        ny, // negate the y input?
        f,  // compute out = x + y (if 1) or x & y (if 0)
        no; // negate the out output?

    OUT
        out[16], // 16-bit output
        zr, // 1 if (out == 0), 0 otherwise
        ng; // 1 if (out < 0),  0 otherwise

    PARTS:

    // Use the flags for the x input to generate xProcessed
    Mux16(a=x, b[0..15]=false, sel=zx, out=xZero);
    Not16(in=xZero, out=notXZero);
    Mux16(a=xZero, b=notXZero, sel=nx, out=xProcessed);

    // Use the flags for the y input to generate yProcessed
    Mux16(a=y, b[0..15]=false, sel=zy, out=yZero);
    Not16(in=yZero, out=notYZero);
    Mux16(a=yZero, b=notYZero, sel=ny, out=yProcessed);

    // Calculate both results of combining x and y, select the correct one into fOut
    Add16(a=xProcessed, b=yProcessed, out=xPlusy);
    And16(a=xProcessed, b=yProcessed, out=xAndy);
    Mux16(a=xAndy, b=xPlusy, sel=f, out=fOut);

    // Calculate negation of output and select negative flag, output, and split version of output for evaluation of zero
    Not16(in=fOut, out=notFOut);
    Mux16(a=fOut, b=notFOut, sel=no, out[15]=ng, out[0..7]=preOut1, out[8..15]=preOut2, out=out);

    // Set the is zero flag
    Or8Way(in=preOut1, out=zrLsb);
    Or8Way(in=preOut2, out=zrMsb);
    Or(a=zrLsb, b=zrMsb, out=nzr);
    Not(in=nzr, out=zr);
}
*/

export const PIN_X = 'x';
export const PIN_Y = 'y';
export const PIN_ZX = 'zx';
export const PIN_NX = 'nx';
export const PIN_ZY = 'zy';
export const PIN_NY = 'ny';
export const PIN_F = 'f';
export const PIN_NO = 'no';
export const PIN_ZR = 'zr';
export const PIN_NG = 'ng';

class ALU extends Chip {
    // Use the flags for the x input to generate xProcessed
    xZero: Mux16;
    notXZero: Not16;
    xProcessed: Mux16;

    yZero: Mux16;
    notYZero: Not16;
    yProcessed: Mux16;

    xPlusy: Add16;
    xAndy: Add16;
    fOut: Mux16;

    notFOut: Not16;
    out: Mux16;

    zrLsb: Or8Way;
    zrMsb: Or8Way;
    nzr: Or;
    zr: Not;

    constructor() {
        super('ALU');

        this.xZero = new Mux16();
        this.notXZero = new Not16();
        this.xProcessed = new Mux16();

        this.yZero = new Mux16();
        this.notYZero = new Not16();
        this.yProcessed = new Mux16();

        this.xPlusy = new Add16();
        this.xAndy = new Add16();
        this.fOut = new Mux16();
        this.notFOut = new Not16();
        this.out = new Mux16();

        this.zrLsb = new Or8Way();
        this.zrMsb = new Or8Way();
        this.nzr = new Or();
        this.zr = new Not();

        this.xZero.sendToInputBus(PIN_B, Array(WORD_LENGTH).fill(false));
        this.xZero.connectToOutputBus(PIN_OUTPUT, this.notXZero.getInputBus(PIN_INPUT));
        this.xZero.connectToOutputBus(PIN_OUTPUT, this.xProcessed.getInputBus(PIN_A));
        this.notXZero.connectToOutputBus(PIN_OUTPUT, this.xProcessed.getInputBus(PIN_B));

        this.yZero.sendToInputBus(PIN_B, Array(WORD_LENGTH).fill(false));
        this.yZero.connectToOutputBus(PIN_OUTPUT, this.notYZero.getInputBus(PIN_INPUT));
        this.yZero.connectToOutputBus(PIN_OUTPUT, this.yProcessed.getInputBus(PIN_A));
        this.notYZero.connectToOutputBus(PIN_OUTPUT, this.yProcessed.getInputBus(PIN_B));

        this.xProcessed.connectToOutputBus(PIN_OUTPUT, this.xPlusy.getInputBus(PIN_A));
        this.yProcessed.connectToOutputBus(PIN_OUTPUT, this.xPlusy.getInputBus(PIN_B));

        this.xProcessed.connectToOutputBus(PIN_OUTPUT, this.xAndy.getInputBus(PIN_A));
        this.yProcessed.connectToOutputBus(PIN_OUTPUT, this.xAndy.getInputBus(PIN_B));

        this.xAndy.connectToOutputBus(PIN_OUTPUT, this.fOut.getInputBus(PIN_A));
        this.xPlusy.connectToOutputBus(PIN_OUTPUT, this.fOut.getInputBus(PIN_B));

        this.fOut.connectToOutputBus(PIN_OUTPUT, this.notFOut.getInputBus(PIN_INPUT));
        this.fOut.connectToOutputBus(PIN_OUTPUT, this.out.getInputBus(PIN_A));
        this.notFOut.connectToOutputBus(PIN_OUTPUT, this.out.getInputBus(PIN_B));

        this.fOut.connectToOutputBus(PIN_OUTPUT, this.out.getInputBus(PIN_A));
        this.notFOut.connectToOutputBus(PIN_OUTPUT, this.out.getInputBus(PIN_B));

        this.out.connectToOutputBus(PIN_OUTPUT, this.zrLsb.getInputBus(PIN_INPUT), 0); // preOut1
        this.out.connectToOutputBus(PIN_OUTPUT, this.zrMsb.getInputBus(PIN_INPUT), 8); // preOut2

        this.zrLsb.connectToOutputPin(PIN_OUTPUT, this.nzr.getInputPin(PIN_A));
        this.zrMsb.connectToOutputPin(PIN_OUTPUT, this.nzr.getInputPin(PIN_B));

        // External Wiring
        this.createInputBus(PIN_X, this.xZero.getInputBus(PIN_A));
        this.createInputBus(PIN_Y, this.yZero.getInputBus(PIN_A));
        this.createInputPin(PIN_ZX, this.xZero.getInputPin(PIN_SELECTOR));
        this.createInputPin(PIN_ZY, this.yZero.getInputPin(PIN_SELECTOR));
        this.createInputPin(PIN_NX, this.xProcessed.getInputPin(PIN_SELECTOR));
        this.createInputPin(PIN_NY, this.yProcessed.getInputPin(PIN_SELECTOR));
        this.createInputPin(PIN_F, this.fOut.getInputPin(PIN_SELECTOR));
        this.createInputPin(PIN_NO, this.out.getInputPin(PIN_SELECTOR));

        this.createOutputBus(PIN_OUTPUT, this.out.getOutputBus(PIN_OUTPUT));
        this.createOutputPin(PIN_NG, this.out.getOutputBus(PIN_OUTPUT, 15)[0]);
        this.createOutputPin(PIN_ZR, this.nzr.getOutputPin(PIN_OUTPUT));
    }
}

export default ALU;