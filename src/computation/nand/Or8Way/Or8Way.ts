/**
 * 8-way Or: 
 * out = (in[0] or in[1] or ... or in[7])
 */

import { Consumer } from "../../../types";
import Or from "../Or/Or";

//  CHIP Or8Way {
//     IN in[8];
//     OUT out;

//     PARTS:
//     Or(a=in[0], b=in[1], out=or1);
//     Or(a=or1, b=in[2], out=or2);
//     Or(a=or2, b=in[3], out=or3);
//     Or(a=or3, b=in[4], out=or4);
//     Or(a=or4, b=in[5], out=or5);
//     Or(a=or5, b=in[6], out=or6);
//     Or(a=or6, b=in[7], out=out);
// }
class Or8Way {
    or1: Or;
    or2: Or;
    or3: Or;
    or4: Or;
    or5: Or;
    or6: Or;
    orOut: Or;

    constructor() {
        this.or1 = new Or();
        this.or2 = new Or();
        this.or3 = new Or();
        this.or4 = new Or();
        this.or5 = new Or();
        this.or6 = new Or();
        this.orOut = new Or();
        this.or1.connectOutput(this.or2.connectA());
        this.or2.connectOutput(this.or3.connectA());
        this.or3.connectOutput(this.or4.connectA());
        this.or4.connectOutput(this.or5.connectA());
        this.or5.connectOutput(this.or6.connectA());
        this.or6.connectOutput(this.orOut.connectA());
    }

    sendInput(inputs: boolean[], startIndex: number = 0) {
        inputs.forEach((input, i) => {
            const index = startIndex + i;
            switch (index) {
                case 0:
                    this.or1.sendA(input);
                    break;
                case 1:
                    this.or1.sendB(input);
                    break;
                case 2:
                    this.or2.sendB(input);
                    break;
                case 3:
                    this.or3.sendB(input);
                    break;
                case 4:
                    this.or4.sendB(input);
                    break;
                case 5:
                    this.or5.sendB(input);
                    break;
                case 6:
                    this.or6.sendB(input);
                    break;
                case 7:
                    this.orOut.sendB(input);
                    break;
            }
        });
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.orOut.connectOutput(receiver);
    }
}

export default Or8Way;