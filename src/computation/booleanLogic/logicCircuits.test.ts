import { NAND, NOT } from './logicCircuits';
import { interfaceToString, LogicCircuit, NamedBuses, NamedPins } from './types';

interface TestCase {
    name: string,
    circuit: LogicCircuit,
    cases: {
        inputs: [NamedPins, NamedBuses],
        expectedOutputs: [NamedPins, NamedBuses]
    }[
   ]
}

const testCases: TestCase[] = [
    {
        name: 'NAND',
        circuit: NAND,
        cases: [{
            inputs: [{a: false, b: false}, {}],
            expectedOutputs: [{out: true}, {}]
        },{
            inputs: [{a: false, b: true},{}],
            expectedOutputs: [{out: true}, {}]
        },{
            inputs: [{a: true, b: false},{}],
            expectedOutputs: [{out: true}, {}]
        },{
            inputs: [{a: true, b: true},{}],
            expectedOutputs: [{out: false}, {}]
        }]
    },
    {
        name: 'NOT',
        circuit: NOT,
        cases: [{
            inputs: [{in: false }, {}],
            expectedOutputs: [{out: true}, {}]
        },{
            inputs: [{in: true }, {}],
            expectedOutputs: [{out: false}, {}]
        }]
    }
]

describe('Logic Circuits', () => {
    testCases.forEach(({name, circuit, cases}) => {
        cases.forEach(({inputs, expectedOutputs}) => {
        test(`${name} - Inputs: ${interfaceToString(inputs)}, Outputs: ${interfaceToString(expectedOutputs)}`, () => {
                const outputs = circuit(inputs);
                for (let x=0; x<expectedOutputs.length; x++) {
                    Object.entries(expectedOutputs[x]).forEach(([exOpName, exOpValue])=> {
                        expect(outputs[x][exOpName]).toBe(exOpValue);
                    })
                }
            })
        });
    })


});