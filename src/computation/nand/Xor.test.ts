import { TwoInOneOutTestCase } from './types';

import Xor from './Xor';

const XOR_TEST_CASES: TwoInOneOutTestCase[] = [
    {
        a: false,
        b: false,
        expected: false
    },
    {
        a: false,
        b: true,
        expected: true
    },
    {
        a: true,
        b: false,
        expected: true
    },
    {
        a: true,
        b: true,
        expected: false
    }
]
describe('XOR', () => {
    let receiver = jest.fn();
    let xor = new Xor();
    xor.connectOutput(receiver);

    XOR_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} OR ${b} = ${expected}`, () => {
            xor.sendA(a);
            xor.sendB(b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
})
