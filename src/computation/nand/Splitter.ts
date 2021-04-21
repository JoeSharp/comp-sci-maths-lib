import { Optional, Consumer } from "../../types";

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

    connectOutputs(receivers: Consumer<T>[]): Splitter<T> {
        receivers.forEach(r => this.connectOutput(r));
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

export default Splitter;