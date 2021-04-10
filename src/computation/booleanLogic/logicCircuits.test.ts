import { NAND, NOT, OR } from './logicCircuits';
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
            expectedOutputs: [{output: true}, {}]
        },{
            inputs: [{a: false, b: true},{}],
            expectedOutputs: [{output: true}, {}]
        },{
            inputs: [{a: true, b: false},{}],
            expectedOutputs: [{output: true}, {}]
        },{
            inputs: [{a: true, b: true},{}],
            expectedOutputs: [{output: false}, {}]
        }]
    },
    {
        name: 'OR',
        circuit: OR,
        cases: [{
            inputs: [{a: false, b: false}, {}],
            expectedOutputs: [{output: false}, {}]
        },{
            inputs: [{a: false, b: true},{}],
            expectedOutputs: [{output: true}, {}]
        },{
            inputs: [{a: true, b: false},{}],
            expectedOutputs: [{output: true}, {}]
        },{
            inputs: [{a: true, b: true},{}],
            expectedOutputs: [{output: true}, {}]
        }]
    },
    {
        name: 'NOT',
        circuit: NOT,
        cases: [{
            inputs: [{input: false }, {}],
            expectedOutputs: [{output: true}, {}]
        },{
            inputs: [{input: true }, {}],
            expectedOutputs: [{output: false}, {}]
        }]
    }
]

describe('Logic Circuits', () => {
    testCases.forEach(({name, circuit, cases}) => {
        cases.forEach(({inputs, expectedOutputs}) => {
        test(`${name}\t${interfaceToString(inputs)}, ${interfaceToString(expectedOutputs)}`, () => {
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