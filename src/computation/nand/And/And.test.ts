import And from './And';

import { TwoInOneOutTestCase } from '../types';

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
    myAnd.connectOutput(receiver);

    AND_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} AND ${b} = ${expected}`, () => {
            myAnd.sendA(a);
            myAnd.sendB(b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
})
