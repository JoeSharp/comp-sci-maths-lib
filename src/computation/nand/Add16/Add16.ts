/**
 * Adds two 16-bit values.
 * The most significant carry bit is ignored.
 */

import { Consumer } from "../../../types";
import FullAdder from "../FullAdder";
import HalfAdder from "../HalfAdder";
import { WORD_LENGTH } from "../types";

//  CHIP Add16 {
//     IN a[16], b[16];
//     OUT out[16];

//     PARTS:
//     HalfAdder(a=a[0], b=b[0], sum=out[0], carry=carry0);
//     FullAdder(a=a[1], b=b[1], c=carry0, sum=out[1], carry=carry1);
//     FullAdder(a=a[2], b=b[2], c=carry1, sum=out[2], carry=carry2);
//     FullAdder(a=a[3], b=b[3], c=carry2, sum=out[3], carry=carry3);
//     FullAdder(a=a[4], b=b[4], c=carry3, sum=out[4], carry=carry4);
//     FullAdder(a=a[5], b=b[5], c=carry4, sum=out[5], carry=carry5);
//     FullAdder(a=a[6], b=b[6], c=carry5, sum=out[6], carry=carry6);
//     FullAdder(a=a[7], b=b[7], c=carry6, sum=out[7], carry=carry7);
//     FullAdder(a=a[8], b=b[8], c=carry7, sum=out[8], carry=carry8);
//     FullAdder(a=a[9], b=b[9], c=carry8, sum=out[9], carry=carry9);
//     FullAdder(a=a[10], b=b[10], c=carry9, sum=out[10], carry=carry10);
//     FullAdder(a=a[11], b=b[11], c=carry10, sum=out[11], carry=carry11);
//     FullAdder(a=a[12], b=b[12], c=carry11, sum=out[12], carry=carry12);
//     FullAdder(a=a[13], b=b[13], c=carry12, sum=out[13], carry=carry13);
//     FullAdder(a=a[14], b=b[14], c=carry13, sum=out[14], carry=carry14);
//     FullAdder(a=a[15], b=b[15], c=carry14, sum=out[15], carry=overflow);
// }
class Add16 {
    halfAdd0: HalfAdder;
    adder1: FullAdder;
    adder2: FullAdder;
    adder3: FullAdder;
    adder4: FullAdder;
    adder5: FullAdder;
    adder6: FullAdder;
    adder7: FullAdder;
    adder8: FullAdder;
    adder9: FullAdder;
    adder10: FullAdder;
    adder11: FullAdder;
    adder12: FullAdder;
    adder13: FullAdder;
    adder14: FullAdder;
    adder15: FullAdder;

    constructor() {
        this.halfAdd0 = new HalfAdder();
        this.adder1 = new FullAdder();
        this.adder2 = new FullAdder();
        this.adder3 = new FullAdder();
        this.adder4 = new FullAdder();
        this.adder5 = new FullAdder();
        this.adder6 = new FullAdder();
        this.adder7 = new FullAdder();
        this.adder8 = new FullAdder();
        this.adder9 = new FullAdder();
        this.adder10 = new FullAdder();
        this.adder11 = new FullAdder();
        this.adder12 = new FullAdder();
        this.adder13 = new FullAdder();
        this.adder14 = new FullAdder();
        this.adder15 = new FullAdder();
    }

    connectA() {
        return Array(WORD_LENGTH).fill(null).map((_, i) => (v: boolean) => this.sendA([v], i))
    }

    connectB() {
        return Array(WORD_LENGTH).fill(null).map((_, i) => (v: boolean) => this.sendB([v], i))
    }

    sendA(as: boolean[], startIndex: number = 0) {
        as.forEach((a, i) => {
            const index = startIndex + i;
            switch (index) {
                case 0:
                    this.halfAdd0.sendA(a);
                    break;
                case 1:
                    this.adder1.sendA(a);
                    break;
                case 2:
                    this.adder2.sendA(a);
                    break;
                case 3:
                    this.adder3.sendA(a);
                    break;
                case 4:
                    this.adder4.sendA(a);
                    break;
                case 5:
                    this.adder5.sendA(a);
                    break;
                case 6:
                    this.adder6.sendA(a);
                    break;
                case 7:
                    this.adder7.sendA(a);
                    break;
                case 8:
                    this.adder8.sendA(a);
                    break;
                case 9:
                    this.adder9.sendA(a);
                    break;
                case 10:
                    this.adder10.sendA(a);
                    break;
                case 11:
                    this.adder11.sendA(a);
                    break;
                case 12:
                    this.adder12.sendA(a);
                    break;
                case 13:
                    this.adder13.sendA(a);
                    break;
                case 14:
                    this.adder14.sendA(a);
                    break;
                case 15:
                    this.adder15.sendA(a);
                    break;
            }
        })
    }

    sendB(as: boolean[], startIndex: number = 0) {
        as.forEach((a, i) => {
            const index = startIndex + i;
            switch (index) {
                case 0:
                    this.halfAdd0.sendB(a);
                    break;
                case 1:
                    this.adder1.sendB(a);
                    break;
                case 2:
                    this.adder2.sendB(a);
                    break;
                case 3:
                    this.adder3.sendB(a);
                    break;
                case 4:
                    this.adder4.sendB(a);
                    break;
                case 5:
                    this.adder5.sendB(a);
                    break;
                case 6:
                    this.adder6.sendB(a);
                    break;
                case 7:
                    this.adder7.sendB(a);
                    break;
                case 8:
                    this.adder8.sendB(a);
                    break;
                case 9:
                    this.adder9.sendB(a);
                    break;
                case 10:
                    this.adder10.sendB(a);
                    break;
                case 11:
                    this.adder11.sendB(a);
                    break;
                case 12:
                    this.adder12.sendB(a);
                    break;
                case 13:
                    this.adder13.sendB(a);
                    break;
                case 14:
                    this.adder14.sendB(a);
                    break;
                case 15:
                    this.adder15.sendB(a);
                    break;
            }
        })
    }

    connectOutput(receivers: Consumer<boolean>[], startIndex: number = 0) {
        receivers.forEach((r, i) => {
            const index = startIndex + i;
            switch (index) {
                case 0:
                    this.halfAdd0.connectSum(r);
                    break;
                case 1:
                    this.adder1.connectSum(r);
                    break;
                case 2:
                    this.adder2.connectSum(r);
                    break;
                case 3:
                    this.adder3.connectSum(r);
                    break;
                case 4:
                    this.adder4.connectSum(r);
                    break;
                case 5:
                    this.adder5.connectSum(r);
                    break;
                case 6:
                    this.adder6.connectSum(r);
                    break;
                case 7:
                    this.adder7.connectSum(r);
                    break;
                case 8:
                    this.adder8.connectSum(r);
                    break;
                case 9:
                    this.adder9.connectSum(r);
                    break;
                case 10:
                    this.adder10.connectSum(r);
                    break;
                case 11:
                    this.adder11.connectSum(r);
                    break;
                case 12:
                    this.adder12.connectSum(r);
                    break;
                case 13:
                    this.adder13.connectSum(r);
                    break;
                case 14:
                    this.adder14.connectSum(r);
                    break;
                case 15:
                    this.adder15.connectSum(r);
                    break;
            }
        })
    }
}

export default Add16;