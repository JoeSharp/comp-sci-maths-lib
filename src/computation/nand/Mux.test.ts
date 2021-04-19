import Mux from './Mux';

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
    let receiver = jest.fn();
    let mux = new Mux();
    mux.connectOutput(receiver);

    MUX_TEST_CASES.forEach(({ a, b, sel, expected }) => {
        test(`${a} Mux ${b} Sel ${sel} = ${expected}`, () => {
            mux.sendA(a);
            mux.sendB(b);
            mux.sendSel(sel);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    })
});