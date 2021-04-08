import { LogicCircuit, LogicCircuitInterface, NamedPinsAndBuses, PinsAndBuses } from './types';
import MissingInputError from './error/MissingInputError';
import IncorrectBusError from './error/IncorrectBusError';

const decorateLogicCircuit = (logicCircuit: LogicCircuit, {name, expectedInputs }: LogicCircuitInterface): LogicCircuit => {
    return (inputs: NamedPinsAndBuses): NamedPinsAndBuses => {
        const [pins, buses] = inputs;
        const missingPins: string[] = expectedInputs.pins
            .filter(b => pins[b] === undefined);
        if (missingPins.length > 0) {
            throw new MissingInputError(name, missingPins)
        }

        const missingBuses: string[] = Object.keys(expectedInputs.buses)
            .filter(b => buses[b] === undefined);
        if (missingBuses.length > 0) {
            throw new MissingInputError(name, missingBuses)
        }

        const incorrectBuses: string[] = Object.entries(expectedInputs.buses)
            .filter(([busName, values]) => buses[busName].length !== values)
            .map(([busName,]) => busName);
        if (missingBuses.length > 0) {
            throw new IncorrectBusError(name, incorrectBuses)
        }

        return logicCircuit(inputs);
    }
}

export const ONE_INPUT_PIN = ['input'];
export const TWO_INPUT_PINS = ['a', 'b'];
export const ONE_OUTPUT_PIN: PinsAndBuses = {
    pins: ['output'],
    buses: {}
}

export const NAND_INTERFACE: LogicCircuitInterface = {
    name: 'NAND',
    expectedInputs: {
        pins: TWO_INPUT_PINS,
        buses: {}
    },
    expectedOuputs: ONE_OUTPUT_PIN
}

const _NAND: LogicCircuit = ([{ a, b }, _]) => ([{ output: !(a && b) }, {}]);
export const NAND = decorateLogicCircuit(_NAND, NAND_INTERFACE);

export const NOT_INTERFACE: LogicCircuitInterface = {
    name: 'NOT',
    expectedInputs: {
        pins: ONE_INPUT_PIN,
        buses: {}
    },
    expectedOuputs: ONE_OUTPUT_PIN
}

const _NOT: LogicCircuit = ([{ input }, _]) => NAND([{ a: input, b: input }, {}]);
export const NOT = decorateLogicCircuit(_NOT, NOT_INTERFACE);

export const OR_INTERFACE: LogicCircuitInterface = {
    name: 'OR',
    expectedInputs: {
        pins: TWO_INPUT_PINS,
        buses: {}
    },
    expectedOuputs: ONE_OUTPUT_PIN
}

const _OR: LogicCircuit = ([{a, b }, _]) => {
    const [{output: notA}] = NOT([{input: a}, {}]);
    const [{output: notB}] = NOT([{input: b}, {}]);
    return NAND([{a: notA, b: notB}, {}]);
}
export const OR = decorateLogicCircuit(_OR, OR_INTERFACE);