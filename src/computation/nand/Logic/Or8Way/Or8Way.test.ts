// |     in     | out |
// |  00000000  |  0  |
// |  11111111  |  1  |
// |  00010000  |  1  |
// |  00000001  |  1  |

import { binaryToBoolArray, booleanToBinArray, PIN_INPUT, PIN_OUTPUT } from "../../types";
import Or8Way from "./Or8Way";

// |  00100110  |  1  |
interface TestCase {
    input: boolean[];
    expected: boolean;
}

const TEST_CASES: TestCase[] = [{
    input: binaryToBoolArray('00000000'),
    expected: false,
}, {
    input: binaryToBoolArray('11111111'),
    expected: true,
}, {
    input: binaryToBoolArray('00010000'),
    expected: true,
}, {
    input: binaryToBoolArray('00000001'),
    expected: true,
}, {
    input: binaryToBoolArray('00100110'),
    expected: true,
},]

describe('Or 8 Way', () => {
    const or = new Or8Way();
    const receiever = jest.fn();
    or.connectToOutputPin(PIN_OUTPUT, receiever);

    TEST_CASES.forEach(({ input, expected }) => {
        test(booleanToBinArray(input), () => {
            or.sendToInputBus(PIN_INPUT, input);
            expect(receiever).toHaveBeenLastCalledWith(expected);
        })
    });
})