import { Consumer } from "../../../types";
import { binaryToBoolArray, booleanToBinArray, getTestName } from "../types"
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
    const receivers: Consumer<boolean>[] = Array(16).fill(null).map(() => jest.fn());
    inc16.connectOutput(receivers);

    TEST_CASES.forEach(({ input, expected }) => {
        const testName = getTestName({ input: booleanToBinArray(input), expected: booleanToBinArray(expected) });
        test(testName, () => {
            inc16.sendInput(input);
            receivers.forEach((r, i) => expect(r).toHaveBeenCalledWith(expected[i]))
        })
    })
})