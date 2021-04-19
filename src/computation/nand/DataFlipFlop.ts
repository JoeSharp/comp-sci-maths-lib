import { Optional, Consumer } from "../../types";

import Splitter from './Splitter';

class DTypeFlipFlop {
    input: boolean;
    output: Splitter<boolean>;
    
    constructor() {
        this.output = new Splitter();
    }
    
    sendInput(n: boolean) {
        this.input = n;
    }

    connectInput(): Consumer<boolean> {
        return this.sendInput.bind(this);
    }

    connectOut(receiver: Consumer<boolean>) {
        this.output.connectOutput(receiver);
    }

    ticktock() {
        this.output.send(this.input);
    }
}

export default DTypeFlipFlop;