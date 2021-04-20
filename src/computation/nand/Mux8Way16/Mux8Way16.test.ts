import { binaryToBoolArray, booleanToBinArray, WORD_LENGTH } from "../types";
import Mux8Way16 from "./Mux8Way16"

interface TestCase {
    a: boolean[];
    b: boolean[];
    c: boolean[];
    d: boolean[];
    e: boolean[];
    f: boolean[];
    g: boolean[];
    h: boolean[];
    sel: boolean[];
    expected: boolean[]
}

// |        a         |        b         |        c         |        d         |        e         |        f         |        g         |        h         |  sel  |       out        |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  000  | 0000000000000000 |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  001  | 0000000000000000 |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  010  | 0000000000000000 |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  011  | 0000000000000000 |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  100  | 0000000000000000 |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  101  | 0000000000000000 |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  110  | 0000000000000000 |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 | 0000000000000000 |  111  | 0000000000000000 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  000  | 0001001000110100 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  001  | 0010001101000101 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  010  | 0011010001010110 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  011  | 0100010101100111 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  100  | 0101011001111000 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  101  | 0110011110001001 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  110  | 0111100010011010 |
// | 0001001000110100 | 0010001101000101 | 0011010001010110 | 0100010101100111 | 0101011001111000 | 0110011110001001 | 0111100010011010 | 1000100110101011 |  111  | 1000100110101011 |


const TEST_CASES: TestCase[] = [
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('000'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('001'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('010'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('011'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('100'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('101'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('110'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        c: binaryToBoolArray('0000000000000000'),
        d: binaryToBoolArray('0000000000000000'),
        e: binaryToBoolArray('0000000000000000'),
        f: binaryToBoolArray('0000000000000000'),
        g: binaryToBoolArray('0000000000000000'),
        h: binaryToBoolArray('0000000000000000'),
        sel: binaryToBoolArray('111'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('000'),
        expected: binaryToBoolArray('0001001000110100')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('001'),
        expected: binaryToBoolArray('0010001101000101')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('010'),
        expected: binaryToBoolArray('0011010001010110')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('011'),
        expected: binaryToBoolArray('0100010101100111')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('100'),
        expected: binaryToBoolArray('0101011001111000')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('101'),
        expected: binaryToBoolArray('0110011110001001')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('110'),
        expected: binaryToBoolArray('0111100010011010')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('0010001101000101'),
        c: binaryToBoolArray('0011010001010110'),
        d: binaryToBoolArray('0100010101100111'),
        e: binaryToBoolArray('0101011001111000'),
        f: binaryToBoolArray('0110011110001001'),
        g: binaryToBoolArray('0111100010011010'),
        h: binaryToBoolArray('1000100110101011'),
        sel: binaryToBoolArray('111'),
        expected: binaryToBoolArray('1000100110101011')
    },
]

describe('Mux 8 way 16', () => {
    let mux = new Mux8Way16();
    let output = Array(WORD_LENGTH).fill(false);
    let receivers = Array(WORD_LENGTH).fill(null).map((_, i) => (v: boolean) => output[i] = v);
    mux.connectOutput(receivers);

    TEST_CASES.forEach(({ a, b, c, d, e, f, g, h, sel, expected }) => {
        const inputStr = Object.entries({ a, b, c, d, e, f, g, h }).map(([key, value]) => `${key}: ${booleanToBinArray(value)}`).join(', ');
        const testName = `${inputStr}, sel: ${booleanToBinArray(sel)}, expected: ${booleanToBinArray(expected)}`;
        test(testName, () => {
            mux.sendA(a);
            mux.sendB(b);
            mux.sendC(c);
            mux.sendD(d);
            mux.sendE(e);
            mux.sendF(f);
            mux.sendG(g);
            mux.sendH(h);
            mux.sendSel(sel);

            const outputExpected = booleanToBinArray(expected);
            const outputReceived = booleanToBinArray(output);
            expect(outputReceived).toBe(outputExpected);

            // receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(expected[i]));
        })
    })

})