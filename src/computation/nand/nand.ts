import { Optional, Consumer } from "../../types";

import Splitter from './Splitter';

class Nand {
    a: boolean;
    b: boolean;
    lastOutput: Optional<boolean>;
    output: Splitter<boolean>;

    constructor() {
        this.a = false;
        this.b = false;
        this.output = new Splitter();
        this.updateValue();
    }

    connectA(): Consumer<boolean> {
        return this.sendA.bind(this);
    }

    connectB(): Consumer<boolean> {
        return this.sendB.bind(this);
    }

    sendA(a: boolean): void {
        this.a = a;
        this.updateValue();
    }

    sendB(b: boolean): void {
        this.b = b;
        this.updateValue();
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.output.connectOutput(receiver);
        this.updateValue(true);
    }

    updateValue(force: boolean = false) {
        const newValue = !(this.a && this.b);
        this.output.send(newValue, force);
    }
}

// NOT(A) = NAND(A, A);
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

// OR(A, B) = NAND(NOT(A), NOT(B));
class Or {
    nandNotA: Not
    nandNotB: Not;
    nandNotANotB: Nand;

    constructor() {

        this.nandNotA = new Not();
        this.nandNotB = new Not();

        this.nandNotANotB = new Nand();
        this.nandNotA.connectOutput(this.nandNotANotB.connectA());
        this.nandNotB.connectOutput(this.nandNotANotB.connectB());
    }

    connectA() {
        return this.sendA.bind(this);
    }
    
    connectB() {
        return this.sendB.bind(this);
    }

    sendA(i: boolean) {
        this.nandNotA.sendIn(i);
    }

    sendB(i: boolean) {
        this.nandNotB.sendIn(i);
    }

    connectOutput(receiver: Consumer<boolean>) {
        this.nandNotANotB.connectOutput(receiver);
    }
}

class And {
    nand: Nand;
    not: Not;

    constructor() {
        this.nand = new Nand();
        this.not = new Not();
        this.nand.connectOutput(this.not.connectInput())
    }

    connectA() {
        return this.sendA.bind(this);
    }
    
    connectB() {
        return this.sendB.bind(this);
    }

    sendA(v: boolean) {
        this.nand.sendA(v);
    }

    sendB(v: boolean) {
        this.nand.sendB(v);
    }

    connectOutput(r: Consumer<boolean>) {
        this.not.connectOutput(r);
    }
}

/** 
 * Multiplexor:
 * out = a if sel == 0
 *       b otherwise
 */
//  CHIP Mux {
//     IN a, b, sel;
//     OUT out;

//     PARTS:
//     // Put your code here:
//     And(a=b, b=sel, out=bAndSel);
//     Not(in=sel, out=notSel);
//     And(a=a, b=notSel, out=aAndNotSel);
//     Or(a=aAndNotSel, b=bAndSel, out=out);
// }
class Mux {
    bAndSel: And;
    notSel: Not;
    aAndNotSel: And;
    aAndNotSelOrBAndSel: Or;

    constructor() {
        this.bAndSel = new And();
        this.notSel = new Not();
        this.aAndNotSel = new And();
        this.aAndNotSelOrBAndSel = new Or();

        this.notSel.connectOutput(this.aAndNotSel.connectB());
        this.bAndSel.connectOutput(this.aAndNotSelOrBAndSel.connectB());
        this.aAndNotSel.connectOutput(this.aAndNotSelOrBAndSel.connectA());
    }

    sendA(a: boolean) {
        this.aAndNotSel.sendA(a);
    }

    sendB(b: boolean) {
        this.bAndSel.sendA(b);
    }

    sendSel(sel: boolean) {
        this.bAndSel.sendB(sel);
        this.notSel.sendIn(sel);
    }

    connectOutput(r: Consumer<boolean>) {
        this.aAndNotSelOrBAndSel.connectOutput(r);
    }
}

export {
    Splitter,
    Not,
    Or,
    And,
    Mux
}

export default Nand;