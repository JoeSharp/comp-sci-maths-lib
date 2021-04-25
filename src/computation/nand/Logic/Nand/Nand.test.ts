import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "../../types";

import Nand from ".";
import { BinaryPin } from "../../BinaryPin";

const NAND_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: true,
  },
  {
    a: false,
    b: true,
    expected: true,
  },
  {
    a: true,
    b: false,
    expected: true,
  },
  {
    a: true,
    b: true,
    expected: false,
  },
];

describe("NAND", () => {
  const receiver: BinaryPin = new BinaryPin();
  const nand = new Nand();
  nand.getPin(PIN_OUTPUT).connect(receiver);

  NAND_TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${a} NAND ${b} = ${expected}`, () => {
      nand.getPin(PIN_A).send(a);
      nand.getPin(PIN_B).send(b);
      expect(receiver.lastOutput).toBe(expected);
    });
  });
});
