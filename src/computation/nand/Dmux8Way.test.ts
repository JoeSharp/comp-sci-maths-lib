import Dmux8Way from './Dmux8Way';
import { binaryToBoolArray, booleanToBinArray, boolToBin } from './types';

interface TestCase {
    input: boolean;
    sel: boolean[];
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
    e: boolean;
    f: boolean;
    g: boolean;
    h: boolean;
}
const TEST_CASES: TestCase[] = [
    {
        input: false,
        sel: binaryToBoolArray('000'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: false,
        sel: binaryToBoolArray('001'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: false,
        sel: binaryToBoolArray('010'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: false,
        sel: binaryToBoolArray('011'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: false,
        sel: binaryToBoolArray('100'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: false,
        sel: binaryToBoolArray('101'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: false,
        sel: binaryToBoolArray('110'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: false,
        sel: binaryToBoolArray('111'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('000'),
        a: true, b: false, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('001'),
        a: false, b: true, c: false, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('010'),
        a: false, b: false, c: true, d: false, e: false, f: false, g: false, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('011'),
        a: false, b: false, c: false, d: true, e: false, f: false, g: false, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('100'),
        a: false, b: false, c: false, d: false, e: true, f: false, g: false, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('101'),
        a: false, b: false, c: false, d: false, e: false, f: true, g: false, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('110'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: true, h: false
    },
    {
        input: true,
        sel: binaryToBoolArray('111'),
        a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: true
    },
];

describe('DMux 8 Way', () => {
    const dmux = new Dmux8Way();
    const receiverA = jest.fn();
    const receiverB = jest.fn();
    const receiverC = jest.fn();
    const receiverD = jest.fn();
    const receiverE = jest.fn();
    const receiverF = jest.fn();
    const receiverG = jest.fn();
    const receiverH = jest.fn();
    dmux.connectA(receiverA);
    dmux.connectB(receiverB);
    dmux.connectC(receiverC);
    dmux.connectD(receiverD);
    dmux.connectE(receiverE);
    dmux.connectF(receiverF);
    dmux.connectG(receiverG);
    dmux.connectH(receiverH);

    TEST_CASES.forEach(({input, sel, a, b, c, d, e, f, g, h}) => {
        test(`in: ${boolToBin(input)}, sel: ${booleanToBinArray(sel)}, abcdefgh: ${[a,b,c,d,e,f,g,h].map(boolToBin)}`, () => {
            dmux.sendInput(input);
            dmux.sendSel(sel);

            expect(receiverA).toHaveBeenLastCalledWith(a);
            expect(receiverB).toHaveBeenLastCalledWith(b);
            expect(receiverC).toHaveBeenLastCalledWith(c);
            expect(receiverD).toHaveBeenLastCalledWith(d);
            expect(receiverE).toHaveBeenLastCalledWith(e);
            expect(receiverF).toHaveBeenLastCalledWith(f);
            expect(receiverG).toHaveBeenLastCalledWith(g);
            expect(receiverH).toHaveBeenLastCalledWith(h);
        })
    })
});