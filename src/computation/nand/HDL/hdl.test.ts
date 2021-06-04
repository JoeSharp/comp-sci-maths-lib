import { readFileSync } from 'fs';
import { isComment } from '../../TestScripts/parseTestScripts';
import { parseCodeLine, parseIOLine, parseOpeningLine, parseHdlFile } from './hdl'

describe('Hardware Description Lanuage (Hack HDL)', () => {
    test('Detect Comment', () => {
        expect(isComment('// This is a comment')).toBe(true);
        expect(isComment('  /* This is start of big comment')).toBe(true);
        expect(isComment('  * This is part of big comment')).toBe(true);
        expect(isComment('This is not a comment')).toBe(false);
    });

    test("Opening Line", () => {
        const chipName = parseOpeningLine('CHIP Xor {');
        expect(chipName).toBe('Xor');
    });

    test("IO Lines - Input (pins)", () => {
        const ioLine = parseIOLine("IN a, b;");
        expect(ioLine.direction).toBe('IN');
        expect(ioLine.pins).toEqual(['a', 'b']);
    });

    test('IO Lines - Input (buses)', () => {
        const ioLine = parseIOLine('IN a[16], b[16], c, d;');
        expect(ioLine.direction).toBe('IN');
        expect(ioLine.pins).toEqual(['c', 'd']);
        expect(ioLine.buses).toHaveLength(2);

        const [pinA, pinB] = ioLine.buses;
        expect(pinA.name).toBe('a');
        expect(pinA.width).toBe(16);
        expect(pinB.name).toBe('b');
        expect(pinB.width).toBe(16);
    })

    test("IO Lines - Output", () => {
        const ioLine = parseIOLine("OUT out;");
        expect(ioLine.direction).toBe('OUT');
        expect(ioLine.pins).toEqual(['out']);
    });

    test("Code Line", () => {
        const { chipName, parameters } = parseCodeLine('Not(in=a, out=notA);');
        expect(chipName).toBe('Not');
        expect(parameters).toHaveLength(2);

        const [inA, outNotA] = parameters;
        expect(inA.inputName).toBe('in');
        expect(inA.outputName).toBe('a');

        expect(outNotA.inputName).toBe('out');
        expect(outNotA.outputName).toBe('notA');
    });

    test("Code Line (spaces)", () => {
        const { chipName, parameters } = parseCodeLine('Not (in=a, out=notA);');
        expect(chipName).toBe('Not');
        expect(parameters).toHaveLength(2);

        const [inA, outNotA] = parameters;
        expect(inA.inputName).toBe('in');
        expect(inA.outputName).toBe('a');

        expect(outNotA.inputName).toBe('out');
        expect(outNotA.outputName).toBe('notA');
    });

    test('Code Line (buses)', () => {
        const {chipName, parameters} = parseCodeLine('And(a=aa[4], b=bb[5], out=outout[6]);');
        expect(chipName).toBe('And');
        expect(parameters).toHaveLength(3);
        const [pinA, pinB, pinOut] = parameters;
        expect(pinA.inputName).toBe('a');
        expect(pinA.outputName).toBe('aa');
        expect(pinA.outputFrom).toBe(4);

        expect(pinB.inputName).toBe('b');
        expect(pinB.outputName).toBe('bb');
        expect(pinB.outputFrom).toBe(5);

        expect(pinOut.inputName).toBe('out');
        expect(pinOut.outputName).toBe('outout');
        expect(pinOut.outputFrom).toBe(6);
    })

    test('Code Line (bus, precise selection)', () => {
        const {chipName, parameters} =parseCodeLine('RAM512(in=inA, out=ra, address=add[3..11], load=la);');
        expect(chipName).toBe('RAM512');

        const [pinA, pinB, pinAddress, pinLoad] = parameters;
        expect(pinA.inputName).toBe('in');
        expect(pinA.outputName).toBe('inA');

        expect(pinB.inputName).toBe('out');
        expect(pinB.outputName).toBe('ra');

        expect(pinAddress.inputName).toBe('address');
        expect(pinAddress.outputName).toBe('add');
        expect(pinAddress.outputFrom).toBe(3);
        expect(pinAddress.outputTo).toBe(11);

        expect(pinLoad.inputName).toBe('load');
        expect(pinLoad.outputName).toBe('la');
    })

    test('Code File', () => {
        const data = readFileSync('src/computation/nand/NandTestScript/testData/01/Or.hdl', 'utf8');
        const hdlFile = parseHdlFile(data);
        expect(hdlFile.name).toBe('Or');
        expect(hdlFile.inputSpec.pins).toEqual(['a', 'b']);
        expect(hdlFile.outputSpec.pins).toEqual(['out']);
        expect(hdlFile.codeLines.length).toBe(3);

        expect(hdlFile.codeLines[0].chipName).toBe('Not');
        expect(hdlFile.codeLines[0].parameters.length).toBe(2);
        expect(hdlFile.codeLines[0].parameters[0].inputName).toBe('in');
        expect(hdlFile.codeLines[0].parameters[0].outputName).toBe('a');
        expect(hdlFile.codeLines[0].parameters[1].inputName).toBe('out');
        expect(hdlFile.codeLines[0].parameters[1].outputName).toBe('notA');

        expect(hdlFile.codeLines[1].chipName).toBe('Not');
        expect(hdlFile.codeLines[1].parameters.length).toBe(2);
        expect(hdlFile.codeLines[1].parameters[0].inputName).toBe('in');
        expect(hdlFile.codeLines[1].parameters[0].outputName).toBe('b');
        expect(hdlFile.codeLines[1].parameters[1].inputName).toBe('out');
        expect(hdlFile.codeLines[1].parameters[1].outputName).toBe('notB');
    });
});