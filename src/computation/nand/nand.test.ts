import Nand, { Splitter, Not, Or, And } from "./nand";

interface TwoInOneOutTestCase {
    a: boolean;
    b: boolean;
    expected: boolean;
}

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

const OR_TEST_CASES: TwoInOneOutTestCase[] = [
    {
        a: false,
        b: false,
        expected: false
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
        expected: true
    }
]

const AND_TEST_CASES: TwoInOneOutTestCase[] = [
    {
        a: false,
        b: false,
        expected: false
    },
    {
        a: false,
        b: true,
        expected: false
    },
    {
        a: true,
        b: false,
        expected: false
    },
    {
        a: true,
        b: true,
        expected: true
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

describe('NAND - NOT', () => {
    let receiver = jest.fn();
    let nand = new Nand();

    // NOT(A) = NAND(A, A);
    nand.connectOutput(receiver);

    let splitter: Splitter<boolean> = new Splitter();
    splitter.connectOutput(nand.connectA());
    splitter.connectOutput(nand.connectB());

    splitter.send(false);
    expect(receiver).toHaveBeenCalledWith(true);

    splitter.send(true);
    expect(receiver).toHaveBeenCalledWith(false);

    splitter.send(false);
    expect(receiver).toHaveBeenCalledWith(true);
});

describe('NOT', () => {
    let receiver = jest.fn();
    let not = new Not();
    not.connectOutput(receiver);

    not.sendIn(false);
    expect(receiver).toHaveBeenCalledWith(true);

    not.sendIn(true);
    expect(receiver).toHaveBeenCalledWith(false);

    not.sendIn(false);
    expect(receiver).toHaveBeenCalledWith(true);
})

describe('NAND - OR', () => {
    let receiver = jest.fn();

    // OR(A, B) = NAND(NOT(A), NOT(B));
    let nandNotA = new Nand();
    let splitterA: Splitter<boolean> = new Splitter([nandNotA.connectA(), nandNotA.connectB()]);

    let nandNotB = new Nand();
    let splitterB: Splitter<boolean> = new Splitter([nandNotB.connectA(), nandNotB.connectB()]);

    let nandNotANotB = new Nand();
    nandNotA.connectOutput(nandNotANotB.connectA());
    nandNotB.connectOutput(nandNotANotB.connectB());
    nandNotANotB.connectOutput(receiver);

    OR_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} OR ${b} = ${expected}`, () => {
            splitterA.send(a);
            splitterB.send(b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
})

describe('OR', () => {
    let receiver = jest.fn();
    let or = new Or();
    or.connectOutput(receiver);

    OR_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} OR ${b} = ${expected}`, () => {
            or.sendA(a);
            or.sendB(b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
})

describe('NAND - AND', () => {
    let receiver = jest.fn();

    // NOT(A) = NAND(A, A);
    // AND(A, B) = NOT(NAND(A, B))
    // AND(A, B) = NAND(NAND(A, B), NAND(A, B))
    let nandNot = new Nand();
    let splitterNandAB: Splitter<boolean> = new Splitter([nandNot.connectA(), nandNot.connectB()]);
    nandNot.connectOutput(receiver);

    let nand = new Nand();
    nand.connectOutput(splitterNandAB.connectInput());

    AND_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} AND ${b} = ${expected}`, () => {
            nand.sendA(a);
            nand.sendB(b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
});

describe('AND', () => {
    let receiver = jest.fn();
    let myAnd: And = new And();
    myAnd.connectOutput(receiver);

    AND_TEST_CASES.forEach(({ a, b, expected }) => {
        test(`${a} AND ${b} = ${expected}`, () => {
            myAnd.sendA(a);
            myAnd.sendB(b);
            expect(receiver).toHaveBeenLastCalledWith(expected);
        })
    });
})