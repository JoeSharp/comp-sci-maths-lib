/**
 * 16-bit incrementer:
 * out = in + 1 (arithmetic addition)
 */

import { Consumer } from "../../../types";
import Add16 from "../Add16";

//  CHIP Inc16 {
//     IN in[16];
//     OUT out[16];

//     PARTS:
//    // Put you code here:
//    Add16(a=in, b[0]=true, b[1..7]=false, out=out);
// }

class Inc16 {
    adder: Add16;

    constructor() {
        this.adder = new Add16();
        this.adder.sendB([true, false, false, false, false, false, false, false]);
    }

    connectInput() {
        return this.sendInput.bind(this);
    }

    sendInput(as: boolean[], startIndex: number = 0) {
        this.adder.sendA(as, startIndex);
    }

    connectOutput(receivers: Consumer<boolean>[], startIndex: number = 0) {
        return this.adder.connectOutput(receivers, startIndex);
    }
}

export default Inc16;