// |        a         |        b         |       out        |
// | 0000000000000000 | 0000000000000000 | 0000000000000000 |
// | 0000000000000000 | 1111111111111111 | 1111111111111111 |
// | 1111111111111111 | 1111111111111111 | 1111111111111110 |
// | 1010101010101010 | 0101010101010101 | 1111111111111111 |
// | 0011110011000011 | 0000111111110000 | 0100110010110011 |
// | 0001001000110100 | 1001100001110110 | 1010101010101010 |

import { Consumer } from "../../../types";
import { binaryToBoolArray, booleanToBinArray, getTestName } from "../types";
import Add16 from "./Add16";

interface TestCase {
    a: boolean[];
    b: boolean[];
    expected: boolean[];
}

const TEST_CASES: TestCase[] = [
    { a: binaryToBoolArray('0000000000000000'), b: binaryToBoolArray('0000000000000000'), expected: binaryToBoolArray('0000000000000000') },
    { a: binaryToBoolArray('0000000000000000'), b: binaryToBoolArray('1111111111111111'), expected: binaryToBoolArray('1111111111111111') },
    { a: binaryToBoolArray('1111111111111111'), b: binaryToBoolArray('1111111111111111'), expected: binaryToBoolArray('1111111111111110') },
    { a: binaryToBoolArray('1010101010101010'), b: binaryToBoolArray('0101010101010101'), expected: binaryToBoolArray('1111111111111111') },
    { a: binaryToBoolArray('0011110011000011'), b: binaryToBoolArray('0000111111110000'), expected: binaryToBoolArray('0100110010110011') },
    { a: binaryToBoolArray('0001001000110100'), b: binaryToBoolArray('1001100001110110'), expected: binaryToBoolArray('1010101010101010') },
]

describe('Add 16', () => {
    const add16 = new Add16();
    const receivers: Consumer<boolean>[] = Array(16).fill(null).map(() => jest.fn());
    add16.connectOutput(receivers);

    TEST_CASES.forEach(({ a, b, expected }) => {
        const testName = getTestName({ a: booleanToBinArray(a), b: booleanToBinArray(b), expected: booleanToBinArray(expected) });
        test(testName, () => {
            add16.sendA(a);
            add16.sendB(b);
            receivers.forEach((r, i) => expect(r).toHaveBeenCalledWith(expected[i]))
        })
    })
})