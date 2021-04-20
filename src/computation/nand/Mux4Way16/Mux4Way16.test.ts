import { binaryToBoolArray, booleanToBinArray, WORD_LENGTH } from "../types";
import Mux4Way16 from "./Mux4Way16"

interface TestCase {
    a: boolean[];
    b: boolean[];
    c: boolean[];
    d: boolean[];
    sel: boolean[];
    expected: boolean[]
}

const TEST_CASES: TestCase[] = [
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('00'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('01'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('10'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('11'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('1001100001110110'),
        c: binaryToBoolArray('1010101010101010'),
        d: binaryToBoolArray('0101010101010101'),
        sel: binaryToBoolArray('00'),
        expected: binaryToBoolArray('0001001000110100')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('1001100001110110'),
        c: binaryToBoolArray('1010101010101010'),
        d: binaryToBoolArray('0101010101010101'),
        sel: binaryToBoolArray('01'),
        expected: binaryToBoolArray('1001100001110110')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('1001100001110110'),
        c: binaryToBoolArray('1010101010101010'),
        d: binaryToBoolArray('0101010101010101'),
        sel: binaryToBoolArray('10'),
        expected: binaryToBoolArray('1010101010101010')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('1001100001110110'),
        c: binaryToBoolArray('1010101010101010'),
        d: binaryToBoolArray('0101010101010101'),
        sel: binaryToBoolArray('11'),
        expected: binaryToBoolArray('0101010101010101')
    },
]

describe('Mux 4 way 16', () => {
    let mux = new Mux4Way16();
    let receivers = Array(WORD_LENGTH).fill(null).map(i => jest.fn());
    mux.connectOutput(receivers);

    TEST_CASES.forEach(({ a, b, c, d, sel, expected }) => {
        const inputStr = Object.entries({ a, b, c, d }).map(([key, value]) => `${key}: ${booleanToBinArray(value)}`).join(', ');
        const testName = `${inputStr}, sel: ${booleanToBinArray(sel)}, expected: ${booleanToBinArray(expected)}`;
        test(testName, () => {
            mux.sendA(a);
            mux.sendB(b);
            mux.sendC(c);
            mux.sendD(d);
            mux.sendSel(sel);

            receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(expected[i]));
        })
    })

})