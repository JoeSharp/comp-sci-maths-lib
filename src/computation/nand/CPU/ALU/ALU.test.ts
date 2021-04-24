
import { binaryToBoolArray } from "../../../../dataRepresentation/numberBases/simpleBinary";
import { getTestName, PIN_OUTPUT, WORD_LENGTH } from "../../types";
import ALU, { PIN_F, PIN_NG, PIN_NO, PIN_NX, PIN_NY, PIN_X, PIN_Y, PIN_ZR, PIN_ZX, PIN_ZY } from "./ALU";

interface TestCase {
    x: string;
    y: string;
    zx: boolean;
    nx: boolean;
    zy: boolean;
    ny: boolean;
    f: boolean;
    no: boolean;
    out: string;
    zr: boolean;
    ng: boolean;
}

const TEST_CASES: TestCase[] = [
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: false, zy: true, ny: false, f: true, no: false, out: '0000000000000000', zr: true, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: true, zy: true, ny: true, f: true, no: true, out: '0000000000000001', zr: false, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: true, zy: true, ny: false, f: true, no: false, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: false, zy: true, ny: true, f: false, no: false, out: '0000000000000000', zr: true, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: true, zy: false, ny: false, f: false, no: false, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: false, zy: true, ny: true, f: false, no: true, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: true, zy: false, ny: false, f: false, no: true, out: '0000000000000000', zr: true, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: false, zy: true, ny: true, f: true, no: true, out: '0000000000000000', zr: true, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: true, zy: false, ny: false, f: true, no: true, out: '0000000000000001', zr: false, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: true, zy: true, ny: true, f: true, no: true, out: '0000000000000001', zr: false, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: true, zy: false, ny: true, f: true, no: true, out: '0000000000000000', zr: true, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: false, zy: true, ny: true, f: true, no: false, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000000000', y: '1111111111111111', zx: true, nx: true, zy: false, ny: false, f: true, no: false, out: '1111111111111110', zr: false, ng: true },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: false, zy: false, ny: false, f: true, no: false, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: true, zy: false, ny: false, f: true, no: true, out: '0000000000000001', zr: false, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: false, zy: false, ny: true, f: true, no: true, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: false, zy: false, ny: false, f: false, no: false, out: '0000000000000000', zr: true, ng: false },
    { x: '0000000000000000', y: '1111111111111111', zx: false, nx: true, zy: false, ny: true, f: false, no: true, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: false, zy: true, ny: false, f: true, no: false, out: '0000000000000000', zr: true, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: true, zy: true, ny: true, f: true, no: true, out: '0000000000000001', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: true, zy: true, ny: false, f: true, no: false, out: '1111111111111111', zr: false, ng: true },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: false, zy: true, ny: true, f: false, no: false, out: '0000000000010001', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: true, zy: false, ny: false, f: false, no: false, out: '0000000000000011', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: false, zy: true, ny: true, f: false, no: true, out: '1111111111101110', zr: false, ng: true },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: true, zy: false, ny: false, f: false, no: true, out: '1111111111111100', zr: false, ng: true },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: false, zy: true, ny: true, f: true, no: true, out: '1111111111101111', zr: false, ng: true },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: true, zy: false, ny: false, f: true, no: true, out: '1111111111111101', zr: false, ng: true },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: true, zy: true, ny: true, f: true, no: true, out: '0000000000010010', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: true, zy: false, ny: true, f: true, no: true, out: '0000000000000100', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: false, zy: true, ny: true, f: true, no: false, out: '0000000000010000', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: true, nx: true, zy: false, ny: false, f: true, no: false, out: '0000000000000010', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: false, zy: false, ny: false, f: true, no: false, out: '0000000000010100', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: true, zy: false, ny: false, f: true, no: true, out: '0000000000001110', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: false, zy: false, ny: true, f: true, no: true, out: '1111111111110010', zr: false, ng: true },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: false, zy: false, ny: false, f: false, no: false, out: '0000000000000001', zr: false, ng: false },
    { x: '0000000000010001', y: '0000000000000011', zx: false, nx: true, zy: false, ny: true, f: false, no: true, out: '0000000000010011', zr: false, ng: false },
]

describe('ALU', () => {
    const alu = new ALU();
    const outReceivers = Array(WORD_LENGTH).fill(null).map(() => jest.fn());
    const zrReceiver = jest.fn();
    const ngReceiver = jest.fn();
    alu.connectToOutputBus(PIN_OUTPUT, outReceivers);
    alu.connectToOutputPin(PIN_NG, ngReceiver);
    alu.connectToOutputPin(PIN_ZR, zrReceiver);

    TEST_CASES.forEach((testCase) => {
        const { x, y, zx, nx, zy, ny, f, no, out, zr, ng } = testCase;
        const testName = getTestName(testCase);

        test(testName, () => {
            alu.sendToInputBus(PIN_X, binaryToBoolArray(x));
            alu.sendToInputPin(PIN_NX, nx);
            alu.sendToInputPin(PIN_ZX, zx);
            alu.sendToInputBus(PIN_Y, binaryToBoolArray(y));
            alu.sendToInputPin(PIN_NY, ny);
            alu.sendToInputPin(PIN_ZY, zy);
            alu.sendToInputPin(PIN_F, f);
            alu.sendToInputPin(PIN_NO, no);

            const expectedOutput = binaryToBoolArray(out);
            expectedOutput.forEach((v, i) => expect(outReceivers[i]).toHaveBeenCalledWith(v));
        })
    })
});