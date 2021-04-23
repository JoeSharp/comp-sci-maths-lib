import { Consumer } from "../../types";
import { BinaryPin, BinaryBus } from "./types";

abstract class Chip {
    name: string;
    inputPins: {
        [name: string]: BinaryPin
    }
    inputBuses: {
        [name: string]: BinaryBus;
    }
    outputPins: {
        [name: string]: Consumer<BinaryPin[]>;
    }
    outputBuses: {
        [name: string]: Consumer<BinaryBus>[];
    }

    constructor(name: string) {
        this.name = name;
        this.inputPins = {};
        this.outputPins = {};
        this.inputBuses = {};
        this.outputBuses = {};
    }

    createInputPin(name: string, ...consumers: BinaryBus) {
        if (name in this.inputPins) throw new Error(`Input Pin already exists on ${this.name}: ${name}`);

        this.inputPins[name] = (v: boolean) => consumers.forEach(c => c(v));
    }

    createInputBus(name: string, consumers: BinaryBus) {
        if (name in this.inputPins) throw new Error(`Input Pin already exists on ${this.name}: ${name}`);

        this.inputBuses[name] = consumers;
    }

    createOutputPin(name: string, output: Consumer<BinaryPin[]>) {
        if (name in this.outputPins) throw new Error(`Output Pin ${name} already exists on ${this.name}`);

        this.outputPins[name] = output;
    }

    createOutputBus(name: string, outputs: Consumer<BinaryBus>[]) {
        if (name in this.outputBuses) throw new Error(`Output Bus ${name} already exists on ${this.name}`);
        this.outputBuses[name] = outputs;
    }

    sendToInputBus(name: string, values: boolean[], startIndex: number = 0) {
        const bus: BinaryBus = this.getInputBus(name);
        values.forEach((v, i) => {
            const index = i + startIndex;
            bus[index](v);
        })
    }

    getInputBus(name: string): BinaryBus {
        if (!(name in this.inputBuses)) throw new Error(`Input Bus ${name} doesn't exist on ${this.name}`);
        return this.inputBuses[name];
    }

    sendToInputPin(name: string, value: boolean) {
        this.getInputPin(name)(value);
    }

    getInputPin(name: string): BinaryPin {
        if (!(name in this.inputPins)) throw new Error(`Input Pin ${name} doesn't exist on ${this.name}`);
        return this.inputPins[name];
    }

    connectToOutputPin(name: string, ...receivers: BinaryBus) {
        this.getOutputPin(name)(receivers);
    }

    getOutputPin(name: string): Consumer<BinaryPin[]> {
        if (!(name in this.outputPins)) throw new Error(`Output Pin ${name} doesn't exist on ${this.name}`);
        return this.outputPins[name];
    }

    connectToOutputBus(name: string, receivers: BinaryBus, startIndex: number = 0) {
        const bus: Consumer<BinaryBus>[] = this.getOutputBus(name);
        receivers.forEach((r, i) => {
            const index = startIndex + i;
            if (index >= bus.length) throw new Error(`Connecting too many receivers ${receivers.length} to bus ${name} which is ${bus.length} bits wide`)
            bus[index]([r]);
        })
    }

    getOutputBus(name: string, startIndex: number = 0, endIndex: number = -1): Consumer<BinaryBus>[] {
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