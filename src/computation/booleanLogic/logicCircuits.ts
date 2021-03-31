import { LogicCircuit, LogicCircuitInterface, NamedPinsAndBuses } from './types';

class MissingInputError extends Error {
    inputNames: string[];
    constructor(inputNames: string[]) {
        super(`Missing Inputs ${inputNames}`)
        this.inputNames = inputNames;
    }
}
class IncorrectBusError extends Error {
    busNames: string[];
    constructor(busNames: string[]) {
        super(`Busses Incorrect ${busNames}`)
        this.busNames = busNames;
    }
}

const decorateLogicCircuit = (logicCircuit: LogicCircuit, {expectedPins, expectedBuses}: LogicCircuitInterface): LogicCircuit => {
    return (inputs: NamedPinsAndBuses): NamedPinsAndBuses => {
        const [pins, buses] = inputs;
        const missingPins: string[] = expectedPins
            .filter(b => pins[b] === undefined);
        if (missingPins.length > 0) {
            throw new MissingInputError(missingPins)
        }

        const missingBuses: string[] = Object.keys(expectedBuses)
            .filter(b => buses[b] === undefined);
        if (missingBuses.length > 0) {
            throw new MissingInputError(missingBuses)
        }

        const incorrectBuses: string[] = Object.entries(expectedBuses)
            .filter(([name, values]) => buses[name].length !== values)
            .map(([name,]) => name);
        if (missingBuses.length > 0) {
            throw new IncorrectBusError(incorrectBuses)
        }

        return logicCircuit(inputs);
    }
}

export const NAND_INTERFACE: LogicCircuitInterface = {
    expectedPins: ['a', 'b'],
    expectedBuses: {}
}

const _NAND: LogicCircuit = ([{a, b}, _]) => ([{ out: !(a && b) }, {}]);
export const NAND = decorateLogicCircuit(_NAND, NAND_INTERFACE);

export const NOT_INTERFACE: LogicCircuitInterface = {
    expectedPins: ['in'],
    expectedBuses: {}
}

const _NOT: LogicCircuit = ([{input}, _]) => NAND([{a: input, b: input}, {}]);
export const NOT = decorateLogicCircuit(_NOT, NOT_INTERFACE);