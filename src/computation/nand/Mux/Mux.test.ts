import Mux from '.';
import { PIN_A, PIN_B, PIN_OUTPUT, PIN_SELECTOR } from '../types';

interface MuxTestCase {
    a: boolean;
    b: boolean;
    sel: boolean;
    expected: boolean;
}

const MUX_TEST_CASES: MuxTestCase[] = [
    {
        a: true,
        b: false,
        sel: false,
        expected: true
    }, {
        a: true,
        b: false,
        sel: true,
        expected: false
    }, {
        a: false,
        b: true,
        sel: false,
        expected: false
    }, {
        a: false,
        b: true,
        sel: true,
        expected: true
    }, {
        a: false,
        b: false,
        sel: true,
        expected: false
    }, {
        a: true,
        b: true,
        sel: true,
        expected: true
    }
]

describe('Mux', () => {
    const receiver = jest.fn();
    const mux = new Mux();
    mux.connectToOutputPin(PIN_OUTPUT, receiver);

    MUX_TEST_CASES.forEach(({ a, b, sel, expected }) => {
        test(`${a} Mux ${b} Sel ${sel} = ${expected}`, () => {
            mux.sendToInputPin(PIN_A, a);
            mux.sendToInputPin(PIN_B, b);
            mux.sendToInputPin(PIN_SELECTOR, sel);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    })
});