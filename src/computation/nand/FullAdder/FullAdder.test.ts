import { getTestName } from "../types";
import FullAdder from "./FullAdder";

// |   a   |   b   |   c   |  sum  | carry |
// |   0   |   0   |   0   |   0   |   0   |
// |   0   |   0   |   1   |   1   |   0   |
// |   0   |   1   |   0   |   1   |   0   |
// |   0   |   1   |   1   |   0   |   1   |
// |   1   |   0   |   0   |   1   |   0   |
// |   1   |   0   |   1   |   0   |   1   |
// |   1   |   1   |   0   |   0   |   1   |
// |   1   |   1   |   1   |   1   |   1   |


interface TestCase {
    a: boolean;
    b: boolean;
    c: boolean;
    sum: boolean;
    carry: boolean;
}

const TEST_CASES: TestCase[] = [
    { a: false, b: false, c: false, sum: false, carry: false },
    { a: false, b: false, c: true, sum: true, carry: false },
    { a: false, b: true, c: false, sum: true, carry: false },
    { a: false, b: true, c: true, sum: false, carry: true },
    { a: true, b: false, c: false, sum: true, carry: false },
    { a: true, b: false, c: true, sum: false, carry: true },
    { a: true, b: true, c: false, sum: false, carry: true },
    { a: true, b: true, c: true, sum: true, carry: true },
]

describe('Full Adder', () => {
    const adder = new FullAdder();
    const sumReceiver = jest.fn();
    const carryReceiver = jest.fn();
    adder.connectSum(sumReceiver);
    adder.connectCarry(carryReceiver);

    TEST_CASES.forEach(({ a, b, c, sum, carry }) => {
        test(getTestName({ a, b, c, sum, carry }), () => {
            adder.sendA(a);
            adder.sendB(b);
            adder.sendC(c);

            expect(sumReceiver).toHaveBeenCalledWith(sum);
            expect(carryReceiver).toHaveBeenCalledWith(carry);
        })
    })
});