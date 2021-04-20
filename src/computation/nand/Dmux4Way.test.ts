// | in  | sel  |  a  |  b  |  c  |  d  |
// |  0  |  00  |  0  |  0  |  0  |  0  |
// |  0  |  01  |  0  |  0  |  0  |  0  |
// |  0  |  10  |  0  |  0  |  0  |  0  |
// |  0  |  11  |  0  |  0  |  0  |  0  |
// |  1  |  00  |  1  |  0  |  0  |  0  |
// |  1  |  01  |  0  |  1  |  0  |  0  |
// |  1  |  10  |  0  |  0  |  1  |  0  |
// |  1  |  11  |  0  |  0  |  0  |  1  |

import Dmux4Way from "./Dmux4Way";
import { booleanToBinArray, boolToBin } from "./types";

interface TestCase {
    input: boolean;
    sel: boolean[];
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
}

const TEST_CASES: TestCase[] = [
    {
        input: false,
        sel: [false, false],
        a: false, b: false, c: false, d: false,
    },
    {
        input: false,
        sel: [true, false],
        a: false, b: false, c: false, d: false,
    },
    {
        input: false,
        sel: [false, true],
        a: false, b: false, c: false, d: false,
    },
    {
        input: false,
        sel: [true, true],
        a: false, b: false, c: false, d: false,
    },
    {
        input: true,
        sel: [false, false],
        a: true, b: false, c: false, d: false,
    },
    {
        input: true,
        sel: [true, false],
        a: false, b: true, c: false, d: false,
    },
    {
        input: true,
        sel: [false, true],
        a: false, b: false, c: true, d: false,
    },
    {
        input: true,
        sel: [true, true],
        a: false, b: false, c: false, d: true,
    },
]

describe('Dmux 4 Way', () => {
    const aReceiver = jest.fn();
    const bReceiver = jest.fn();
    const cReceiver = jest.fn();
    const dReceiver = jest.fn();
    const demux = new Dmux4Way();
    demux.connectA(aReceiver);
    demux.connectB(bReceiver);
    demux.connectC(cReceiver);
    demux.connectD(dReceiver);

    TEST_CASES.forEach(({ input, sel, a, b, c, d }) => {
        test(`In: ${boolToBin(input)}, Sel: ${booleanToBinArray(sel)}, a: ${boolToBin(a)}, b: ${boolToBin(b)}, c: ${boolToBin(c)}, d: ${boolToBin(d)}`, () => {
            demux.sendInput(input);
            demux.sendSel(sel);
            expect(aReceiver).toHaveBeenLastCalledWith(a);
            expect(bReceiver).toHaveBeenLastCalledWith(b);
            expect(cReceiver).toHaveBeenLastCalledWith(c);
            expect(dReceiver).toHaveBeenLastCalledWith(d);
        })
    })
})