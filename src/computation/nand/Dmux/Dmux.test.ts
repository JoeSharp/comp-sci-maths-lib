import Dmux from "./Dmux";

/**
 * Demultiplexor:
 * {a, b} = {in, 0} if sel == 0
 *          {0, in} if sel == 1
 */

interface DmuxTestCase {
    input: boolean;
    sel: boolean;
    expectedA: boolean;
    expectedB: boolean;
}

const DMUX_TEST_CASES: DmuxTestCase[] = [{
    input: false,
    sel: false,
    expectedA: false,
    expectedB: false
}, {
    input: false,
    sel: true,
    expectedA: false,
    expectedB: false
}, {
    input: true,
    sel: false,
    expectedA: true,
    expectedB: false
}, {
    input: true,
    sel: true,
    expectedA: false,
    expectedB: true
}]

describe('Dmux', () => {
    DMUX_TEST_CASES.forEach(({ input, sel, expectedA, expectedB }) => {
        const dmux = new Dmux();
        const receiverA = jest.fn();
        const receiverB = jest.fn();
        dmux.connectA(receiverA);
        dmux.connectB(receiverB);

        test(`Input: ${input}, Sel: ${sel}, A: ${expectedA}, B: ${expectedB}`, () => {
            dmux.sendInput(input);
            dmux.sendSel(sel);
            expect(receiverA).toHaveBeenLastCalledWith(expectedA);
            expect(receiverB).toHaveBeenLastCalledWith(expectedB);
        })
    })
});