import { Consumer } from "../../../types";
import Or16 from "./Or16";
import { booleanToBinArray, binaryToBoolArray } from "../types";

interface TestCase {
    a: boolean[];
    b: boolean[];
    expected: boolean[];
}

const TEST_CASES: TestCase[] = [
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('0000000000000000'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0000000000000000'),
        b: binaryToBoolArray('1111111111111111'),
        expected: binaryToBoolArray('1111111111111111')
    },
    {
        a: binaryToBoolArray('1111111111111111'),
        b: binaryToBoolArray('1111111111111111'),
        expected: binaryToBoolArray('1111111111111111')
    },
    {
        a: binaryToBoolArray('1010101010101010'),
        b: binaryToBoolArray('0101010101010101'),
        expected: binaryToBoolArray('1111111111111111')
    },
    {
        a: binaryToBoolArray('0011110011000011'),
        b: binaryToBoolArray('0000111111110000'),
        expected: binaryToBoolArray('0011111111110011')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('1001100001110110'),
        expected: binaryToBoolArray('1001101001110110')
    }
]


describe('OR 16', () => {
    const or16 = new Or16();
    const receivers: Consumer<boolean>[] = Array(16).fill(null).map(() => jest.fn());
    or16.connectOutput(receivers);

    TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${booleanToBinArray(a)} AND ${booleanToBinArray(b)} = ${booleanToBinArray(expected)}`, () => {
            or16.sendA(a);
            or16.sendB(b);

            expected.forEach((e, i) => expect(receivers[i]).toHaveBeenLastCalledWith(e));
        })
    })
})