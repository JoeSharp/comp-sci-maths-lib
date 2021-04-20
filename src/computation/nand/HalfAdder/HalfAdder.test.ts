// |   a   |   b   |  sum  | carry |
// |   0   |   0   |   0   |   0   |
// |   0   |   1   |   1   |   0   |
// |   1   |   0   |   1   |   0   |
// |   1   |   1   |   0   |   1   |

import { getTestName } from "../types";
import HalfAdder from "./HalfAdder";

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
    { a: true, b: true, sum: true, carry: true }
]

describe('Half Adder', () => {
    const halfAdder = new HalfAdder();
    const sumReceiver = jest.fn();
    const carryReceiver = jest.fn();
    halfAdder.connectSum(sumReceiver);
    halfAdder.connectCarry(carryReceiver);

    TEST_CASES.forEach(({ a, b, sum, carry }) => {
        test(getTestName({ a, b, sum, carry }), () => {
            halfAdder.sendA(a);
            halfAdder.sendB(b);

            expect(sumReceiver).toHaveBeenCalledWith(sum);
            expect(carryReceiver).toHaveBeenCalledWith(carry);
        })
    })
})