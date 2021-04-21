// |   a   |   b   |  sum  | carry |
// |   0   |   0   |   0   |   0   |
// |   0   |   1   |   1   |   0   |
// |   1   |   0   |   1   |   0   |
// |   1   |   1   |   0   |   1   |

import { getTestName, PIN_A, PIN_B } from "../types";
import HalfAdder, { PIN_CARRY, PIN_SUM } from "./HalfAdder";

interface TestCase {
    a: boolean;
    b: boolean;
    sum: boolean;
    carry: boolean;
}

const TEST_CASES: TestCase[] = [
    { a: false, b: false, sum: false, carry: false },
    { a: false, b: true, sum: true, carry: false },
    { a: true, b: false, sum: true, carry: false },
    { a: true, b: true, sum: false, carry: true }
]

describe('Half Adder', () => {
    const halfAdder = new HalfAdder();
    const sumReceiver = jest.fn();
    const carryReceiver = jest.fn();
    halfAdder.connectToOutputPin(PIN_SUM, sumReceiver);
    halfAdder.connectToOutputPin(PIN_CARRY, carryReceiver);

    TEST_CASES.forEach(({ a, b, sum, carry }) => {
        test(getTestName({ a, b, sum, carry }), () => {
            halfAdder.sendToInputPin(PIN_A, a);
            halfAdder.sendToInputPin(PIN_B, b);

            expect(sumReceiver).toHaveBeenLastCalledWith(sum);
            expect(carryReceiver).toHaveBeenLastCalledWith(carry);
        })
    })
})