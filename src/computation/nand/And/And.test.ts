import And from './And';

import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from '../types';

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
    let receiver = jest.fn();
    let myAnd = new And();
    myAnd.connectToOutputPin(PIN_OUTPUT, receiver);

    AND_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} AND ${b} = ${expected}`, () => {
            myAnd.sendToInputPin(PIN_A, a);
            myAnd.sendToInputPin(PIN_B, b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
})
