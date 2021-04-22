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

import { Consumer } from "../../../types";
import Add16 from "../Add16";
import Chip from "../Chip";
import Mux16 from "../Mux16";
import Not from "../Not";
import Not16 from "../Not16";
import Or from "../Or";
import Or8Way from "../Or8Way";
import { WORD_LENGTH } from "../types";

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

        // this.xZero.sendB(Array(WORD_LENGTH).fill(false));
        // this.xZero.connectOutput(this.notXZero.connectInput());
        // this.xZero.connectOutput(this.xProcessed.connectA());
        // this.notXZero.connectOutput(this.xProcessed.connectB());

        // this.yZero.sendB(Array(WORD_LENGTH).fill(false));
        // this.yZero.connectOutput(this.notYZero.connectInput());
        // this.yZero.connectOutput(this.yProcessed.connectA());
        // this.notYZero.connectOutput(this.yProcessed.connectB());

        // this.xProcessed.connectOutput(this.xPlusy.connectA());
        // this.yProcessed.connectOutput(this.xPlusy.connectB());

        // this.xProcessed.connectOutput(this.xAndy.connectA());
        // this.yProcessed.connectOutput(this.xAndy.connectB());

        // this.xAndy.connectOutput(this.fOut.connectA());
        // this.xPlusy.connectOutput(this.fOut.connectB());

        // this.fOut.connectOutput(this.notFOut.connectInput());
        // this.fOut.connectOutput(this.out.connectA());
        // this.notFOut.connectOutput(this.out.connectB());

        // SORT OF UP TO HERE

        // Calculate negation of output and select negative flag, output, and split version of output for evaluation of zero
        // Mux16(a=fOut, b=notFOut, sel=no, out[15]=ng, out[0..7]=preOut1, out[8..15]=preOut2, out=out);

        // // Set the is zero flag
        // Or8Way(in=preOut1, out=zrLsb);
        // Or8Way(in=preOut2, out=zrMsb);
        // Or(a=zrLsb, b=zrMsb, out=nzr);
        // Not(in=nzr, out=zr);
    }

    // sendF(f: boolean) {
    //     this.fOut.sendSel(f);
    // }

    // sendX(as: boolean[], startIndex: number = 0) {
    //     this.xZero.sendA(as, startIndex);
    // }

    // sendY(as: boolean[], startIndex: number = 0) {
    //     this.yZero.sendA(as, startIndex);
    // }

    // sendZX(zx: boolean) {
    //     this.xZero.sendSel(zx);
    // }

    // sendNX(nx: boolean) {
    //     this.xProcessed.sendSel(nx);
    // }

    // sendZY(zy: boolean) {
    //     this.yZero.sendSel(zy);
    // }

    // sendNY(ny: boolean) {
    //     this.yProcessed.sendSel(ny);
    // }

    // sendNO(no: boolean) {
    //     this.out.sendSel(no);
    // }

    // connectZR(receiver: Consumer<boolean>) {
    //     this.zr.connectOutput(receiver);
    // }

    // connectNG(receiver: Consumer<boolean>) {
    //     this.out.connectOutput([receiver], 15);
    // }

    // connectOutput(receivers: Consumer<boolean>[], startIndex: number = 0) {
    //     this.out.connectOutput(receivers, startIndex);
    // }
}

export default ALU;