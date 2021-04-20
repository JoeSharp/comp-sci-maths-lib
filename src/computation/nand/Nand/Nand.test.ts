import { TwoInOneOutTestCase } from '../types';

import Nand from ".";

const NAND_TEST_CASES: TwoInOneOutTestCase[] = [
    {
        a: false,
        b: false,
        expected: true
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

describe('NAND', () => {
    let receiver = jest.fn();
    let nand = new Nand();
    nand.connectOutput(receiver);

    NAND_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} NAND ${b} = ${expected}`, () => {
            nand.sendA(a);
            nand.sendB(b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
});
