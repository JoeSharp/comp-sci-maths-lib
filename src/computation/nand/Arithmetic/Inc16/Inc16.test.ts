import { BinaryBus, binaryToBoolArray, booleanToBinArray, getTestName, PIN_INPUT, PIN_OUTPUT } from "../../types"
import Inc16 from "./Inc16"

interface TestCase {
    input: boolean[];
    expected: boolean[];
}

const TEST_CASES: TestCase[] = [
    { input: binaryToBoolArray('0000000000000000'), expected: binaryToBoolArray('0000000000000001') },
    { input: binaryToBoolArray('1111111111111111'), expected: binaryToBoolArray('0000000000000000') },
    { input: binaryToBoolArray('0000000000000101'), expected: binaryToBoolArray('0000000000000110') },
    { input: binaryToBoolArray('1111111111111011'), expected: binaryToBoolArray('1111111111111100') },
]

describe('Inc 16', () => {
    const inc16 = new Inc16();
    const receivers: BinaryBus = Array(16).fill(null).map(() => jest.fn());
    inc16.connectToOutputBus(PIN_OUTPUT, receivers);

    TEST_CASES.forEach(({ input, expected }) => {
        const testName = getTestName({ input: booleanToBinArray(input), expected: booleanToBinArray(expected) });
        test(testName, () => {
            inc16.sendToInputBus(PIN_INPUT, input);
            receivers.forEach((r, i) => expect(r).toHaveBeenLastCalledWith(expected[i]))
        })
    })
})