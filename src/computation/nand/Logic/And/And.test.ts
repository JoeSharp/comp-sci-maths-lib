import And from './And';

import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from '../../types';
import PinSink from '../../PinSink';

const AND_TEST_CASES: TwoInOneOutTestCase[] = [
    {
        a: false,
        b: false,
        expected: false
    },
    {
        a: false,
        b: true,
        expected: false
    },
    {
        a: true,
        b: false,
        expected: false
    },
    {
        a: true,
        b: true,
        expected: true
    }
]

describe('AND', () => {
    const result = new PinSink();
    const myAnd = new And();
    myAnd.connectToOutputPin(PIN_OUTPUT, result.getPin());

    AND_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} AND ${b} = ${expected}`, () => {
            myAnd.sendToInputPin(PIN_A, a);
            myAnd.sendToInputPin(PIN_B, b);
            expect(result.getValue()).toBe(expected);
        })
    });
})
