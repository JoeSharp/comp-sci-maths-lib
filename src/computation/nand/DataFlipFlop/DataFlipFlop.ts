import { Consumer } from "../../../types";
import { IClocked } from "../Clocked";

import Splitter from '../Splitter';

class DataFlipFlop implements IClocked {
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

    connectOutput(receiver: Consumer<boolean>) {
        this.output.connectOutput(receiver);
    }

    tick() {
    }

    tock() {
        this.output.send(this.input);
    }
}

export default DataFlipFlop;
