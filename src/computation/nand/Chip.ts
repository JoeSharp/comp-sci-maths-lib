import { Consumer } from "../../types";
import Splitter from "./Splitter";



class Chip {
    name: string;
    inputPins: {
        [name: string]: Consumer<boolean>
    }
    inputBuses: {
        [name: string]: Consumer<boolean>[];
    }
    outputPins: {
        [name: string]: Consumer<Consumer<boolean>[]>;
    }
    outputBuses: {
        [name: string]: Consumer<Consumer<boolean>[]>[];
    }

    constructor(name: string) {
        this.name = name;
        this.inputPins = {};
        this.outputPins = {};
        this.inputBuses = {};
        this.outputBuses = {};
    }

    createInputPin(name: string, ...consumers: Consumer<boolean>[]) {
        if (name in this.inputPins) throw new Error(`Input Pin already exists on ${this.name}: ${name}`);

        this.inputPins[name] = (v: boolean) => consumers.forEach(c => c(v));
    }

    createInputBus(name: string, consumers: Consumer<boolean>[]) {
        if (name in this.inputPins) throw new Error(`Input Pin already exists on ${this.name}: ${name}`);

        this.inputBuses[name] = consumers;
    }

    createOutputPin(name: string, output: Consumer<Consumer<boolean>[]>) {
        if (name in this.outputPins) throw new Error(`Output Pin ${name} already exists on ${this.name}`);

        this.outputPins[name] = output;
    }

    createOutputBus(name: string, outputs: Consumer<Consumer<boolean>[]>[]) {
        if (name in this.outputBuses) throw new Error(`Output Bus ${name} already exists on ${this.name}`);
        this.outputBuses[name] = outputs;
    }

    sendToInputBus(name: string, values: boolean[], startIndex: number = 0) {
        const bus: Consumer<boolean>[] = this.getInputBus(name);
        values.forEach((v, i) => {
            const index = i + startIndex;
            bus[index](v);
        })
    }

    getInputBus(name: string): Consumer<boolean>[] {
        if (!(name in this.inputBuses)) throw new Error(`Input Bus ${name} doesn't exist on ${this.name}`);
        return this.inputBuses[name];
    }

    sendToInputPin(name: string, value: boolean) {
        this.getInputPin(name)(value);
    }

    getInputPin(name: string): Consumer<boolean> {
        if (!(name in this.inputPins)) throw new Error(`Input Pin ${name} doesn't exist on ${this.name}`);
        return this.inputPins[name];
    }

    connectToOutputPin(name: string, ...receivers: Consumer<boolean>[]) {
        this.getOutputPin(name)(receivers);
    }

    getOutputPin(name: string) {
        if (!(name in this.outputPins)) throw new Error(`Output Pin ${name} doesn't exist on ${this.name}`);
        return this.outputPins[name];
    }

    connectToOutputBus(name: string, receivers: Consumer<boolean>[], startIndex: number = 0) {
        const bus: Consumer<Consumer<boolean>[]>[] = this.getOutputBus(name);
        receivers.forEach((r, i) => {
            const index = startIndex + i;
            bus[index]([r]);
        })
    }

    getOutputBus(name: string, startIndex: number = 0, endIndex: number = -1): Consumer<Consumer<boolean>[]>[] {
        if (!(name in this.outputBuses)) throw new Error(`Output Bus ${name} doesn't exist on ${this.name}`);
        const bus = this.outputBuses[name];

        if (endIndex !== -1) {
            return bus.slice(startIndex, endIndex);
        }

        if (startIndex > 0) {
            return bus.slice(startIndex);
        }

        return bus;
    }
}

export default Chip;