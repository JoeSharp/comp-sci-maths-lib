// |     in     | out |
// |  00000000  |  0  |
// |  11111111  |  1  |
// |  00010000  |  1  |
// |  00000001  |  1  |

import { binaryToBoolArray, booleanToBinArray } from "../types";
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
    let or = new Or8Way();
    let receiever = jest.fn();
    or.connectOutput(receiever);

    TEST_CASES.forEach(({ input, expected }) => {
        test(booleanToBinArray(input), () => {
            or.sendInput(input);
            expect(receiever).toHaveBeenCalledWith(expected);
        })
    });
})