import Dmux8Way from '.';
import { PIN_C, PIN_D } from '../Dmux4Way/Dmux4Way';
import { binaryToBoolArray, booleanToBinArray, boolToBin } from "../../../../dataRepresentation/numberBases/simpleBinary";
import { PIN_A, PIN_B, PIN_INPUT, PIN_SELECTOR } from '../../types';
import { PIN_E, PIN_F, PIN_G, PIN_H } from './Dmux8Way';

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
    dmux.connectToOutputPin(PIN_A, receiverA);
    dmux.connectToOutputPin(PIN_B, receiverB);
    dmux.connectToOutputPin(PIN_C, receiverC);
    dmux.connectToOutputPin(PIN_D, receiverD);
    dmux.connectToOutputPin(PIN_E, receiverE);
    dmux.connectToOutputPin(PIN_F, receiverF);
    dmux.connectToOutputPin(PIN_G, receiverG);
    dmux.connectToOutputPin(PIN_H, receiverH);

    TEST_CASES.forEach(({ input, sel, a, b, c, d, e, f, g, h }) => {
        test(`in: ${boolToBin(input)}, sel: ${booleanToBinArray(sel)}, abcdefgh: ${[a, b, c, d, e, f, g, h].map(boolToBin)}`, () => {
            dmux.sendToInputPin(PIN_INPUT, input);
            dmux.sendToInputBus(PIN_SELECTOR, sel);

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