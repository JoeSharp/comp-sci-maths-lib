export type NamedPins = Record<string, boolean>;
export type NamedBuses = Record<string, boolean[]>;
export type NamedPinsAndBuses = [NamedPins, NamedBuses];

export type LogicCircuit = (inputs: NamedPinsAndBuses) => NamedPinsAndBuses;

export interface LogicCircuitInterface {
    expectedPins: string[];
    expectedBuses: {
        [name: string]: number
    }
}

const DELIM = ', ';

export const pinsToString = (pins: NamedPins): string => Object.values(pins).length > 0 ?
    Object.entries(pins)
    .map(([name, value]) => `${name}: ${value}`)
    .join(DELIM) : undefined;

export const busesToString = (buses: NamedBuses): string => Object.values(buses).length > 0 ?
    Object.entries(buses)
    .map(([name, values]) => `${name}: [${values.join(DELIM)}]`)
    .join(DELIM) : undefined;

export const interfaceToString = ([pins, buses]: NamedPinsAndBuses): string =>
    [pinsToString(pins), busesToString(buses)].filter(x => x !== undefined).join(DELIM)

