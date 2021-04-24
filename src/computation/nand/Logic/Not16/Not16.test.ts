import Not16 from "./Not16";
import { binaryToBoolArray, booleanToBinArray } from "../../../../dataRepresentation/numberBases/simpleBinary";
import { PIN_OUTPUT, PIN_INPUT, BinaryBus } from "../../types";

interface TestCase {
    input: boolean[];
    expected: boolean[];
}

const TEST_CASES: TestCase[] = [
    {
        input: binaryToBoolArray('0000000000000000'),
        expected: binaryToBoolArray('1111111111111111')
    },
    {
        input: binaryToBoolArray('1111111111111111'),
        expected: binaryToBoolArray('0000000000000000')
    },
    {
        input: binaryToBoolArray('1010101010101010'),
        expected: binaryToBoolArray('0101010101010101')
    },
    {
        input: binaryToBoolArray('0011110011000011'),
        expected: binaryToBoolArray('1100001100111100')
    },
    {
        input: binaryToBoolArray('0001001000110100'),
        expected: binaryToBoolArray('1110110111001011')
    },

]


describe('NOT 16', () => {
    const or16 = new Not16();
    const receivers: BinaryBus = Array(16).fill(null).map(() => jest.fn());
    or16.connectToOutputBus(PIN_OUTPUT, receivers);

    TEST_CASES.forEach(({ input, expected }) => {
        test(`NOT ${booleanToBinArray(input)} = ${booleanToBinArray(expected)}`, () => {
            or16.sendToInputBus(PIN_INPUT, input);

            expected.forEach((e, i) => expect(receivers[i]).toHaveBeenLastCalledWith(e));
        })
    })
})