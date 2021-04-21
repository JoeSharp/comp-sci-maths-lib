import { Consumer } from "../../../types";
import And16 from "./And16";
import { booleanToBinArray, binaryToBoolArray, PIN_OUTPUT, PIN_A, PIN_B } from "../types";

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
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('1111111111111111'),
        b: binaryToBoolArray('1111111111111111'),
        expected: binaryToBoolArray('1111111111111111')
    },
    {
        a: binaryToBoolArray('1010101010101010'),
        b: binaryToBoolArray('0101010101010101'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        a: binaryToBoolArray('0011110011000011'),
        b: binaryToBoolArray('0000111111110000'),
        expected: binaryToBoolArray('0000110011000000')
    },
    {
        a: binaryToBoolArray('0001001000110100'),
        b: binaryToBoolArray('1001100001110110'),
        expected: binaryToBoolArray('0001000000110100')
    }
]


describe('AND 16', () => {
    const and16 = new And16();
    const receivers: Consumer<boolean>[] = Array(16).fill(null).map(() => jest.fn());
    and16.connectToOutputBus(PIN_OUTPUT, receivers);

    TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${booleanToBinArray(a)} AND ${booleanToBinArray(b)} = ${booleanToBinArray(expected)}`, () => {
            and16.sendToInputBus(PIN_A, a);
            and16.sendToInputBus(PIN_B, b);

            expected.forEach((e, i) => expect(receivers[i]).toHaveBeenLastCalledWith(e));
        })
    })
})