import { Consumer } from "../../types";

import Splitter from './Splitter';

import Nand from './Nand';

/**
 * Not gate:
 * out = not in
 */

//  CHIP Not {
//     IN in;
//     OUT out;

//     PARTS:
//     Nand(a=in, b=in, out=out);
// }
class Not {
    splitter: Splitter<boolean>
    nand: Nand;

    constructor() {
        this.nand = new Nand();
        this.splitter = new Splitter();
        this.splitter.connectOutput(this.nand.connectA());
        this.splitter.connectOutput(this.nand.connectB());
    }

    connectInput() {
        return this.splitter.connectInput();
    }

    sendIn(i: boolean) {
        this.splitter.send(i);
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.nand.connectOutput(receiver);
    }
}

export default Not;