import { Consumer } from "../../../types";
import { WORD_LENGTH } from '../types';
import Not from "../Not";
/**
 * 16-bit Not:
 * for i=0..15: out[i] = not in[i]
 */
/**
 CHIP Not16 {
    IN in[16];
    OUT out[16];

    PARTS:
    Not(in=in[0], out=out[0]);
    Not(in=in[1], out=out[1]);
    Not(in=in[2], out=out[2]);
    Not(in=in[3], out=out[3]);
    Not(in=in[4], out=out[4]);
    Not(in=in[5], out=out[5]);
    Not(in=in[6], out=out[6]);
    Not(in=in[7], out=out[7]);
    Not(in=in[8], out=out[8]);
    Not(in=in[9], out=out[9]);
    Not(in=in[10], out=out[10]);
    Not(in=in[11], out=out[11]);
    Not(in=in[12], out=out[12]);
    Not(in=in[13], out=out[13]);
    Not(in=in[14], out=out[14]);
    Not(in=in[15], out=out[15]);
}
 */
class Not16 {
    nots: Not[];

    constructor() {
        this.nots = Array(WORD_LENGTH).fill(null).map((_, i) => new Not());
    }

    connectInput() {
        return this.sendInput.bind(this)
    }

    sendInput(inputs: boolean[], startIndex: number = 0) {
        inputs.forEach((a, i) => this.nots[startIndex + i].sendIn(a));
    }

    connectOutput(receivers: Consumer<boolean>[], startIndex: number = 0) {
        receivers.forEach((r, i) => this.nots[i + startIndex].connectOutput(r));
    }
}

export default Not16;