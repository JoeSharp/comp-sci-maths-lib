import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from '../types';

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
    const receiver = jest.fn();
    const nand = new Nand();
    nand.connectToOutputPin(PIN_OUTPUT, receiver);

    NAND_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} NAND ${b} = ${expected}`, () => {
            nand.sendToInputPin(PIN_A, a);
            nand.sendToInputPin(PIN_B, b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
});
