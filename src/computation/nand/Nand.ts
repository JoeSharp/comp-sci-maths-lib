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

export default Nand;