import { Optional } from "../../types";

type Consumer<T> = (v: T) => void;

class Splitter<T> {
    lastOutput: Optional<T>;
    receivers: Consumer<T>[] = [];

    constructor(receivers: Consumer<T>[] = []) {
        receivers.forEach(r => this.receivers.push(r));
    }

    connectOutput(receiver: Consumer<T>): Splitter<T> {
        this.receivers.push(receiver);
        return this;
    }

    send(newValue: T, force: boolean = false) {
        if (force || !this.lastOutput || newValue !== this.lastOutput) {
            this.lastOutput = newValue;
            this.receivers.forEach(r => r(newValue));
        }
    }

    connectInput(): Consumer<T> {
        return this.send.bind(this);
    }
}

class Nand {
    a: boolean;
    b: boolean;
    lastOutput: Optional<boolean>;
    out: Splitter<boolean>;

    constructor() {
        this.a = false;
        this.b = false;
        this.out = new Splitter();
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

    connectOut(receiver: Consumer<boolean>) {
        this.out.connectOutput(receiver);
        this.updateValue(true);
    }

    updateValue(force: boolean = false) {
        const newValue = !(this.a && this.b);
        this.out.send(newValue, force);
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

    connectOut(receiver: Consumer<boolean>) {
        this.nand.connectOut(receiver);
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
        this.nandNotA.connectOut(this.nandNotANotB.connectA());
        this.nandNotB.connectOut(this.nandNotANotB.connectB());
    }

    sendA(i: boolean) {
        this.nandNotA.sendIn(i);
    }

    sendB(i: boolean) {
        this.nandNotB.sendIn(i);
    }

    connectOut(receiver: Consumer<boolean>) {
        this.nandNotANotB.connectOut(receiver);
    }
}

class And {
    nand: Nand;
    not: Not;

    constructor() {
        this.nand = new Nand();
        this.not = new Not();
        this.nand.connectOut(this.not.connectInput())
    }

    sendA(v: boolean) {
        this.nand.sendA(v);
    }

    sendB(v: boolean) {
        this.nand.sendB(v);
    }

    connectOut(r: Consumer<boolean>) {
        this.not.connectOut(r);
    }
}

export {
    Splitter,
    Not,
    Or,
    And
}

export default Nand;