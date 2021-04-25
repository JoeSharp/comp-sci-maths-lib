import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "../../types";

import Xor from ".";
import { BinaryPin } from "../../BinaryPin";

const XOR_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: false,
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
describe("XOR", () => {
  const receiver = new BinaryPin();
  const xor = new Xor();
  xor.getPin(PIN_OUTPUT).connect(receiver);

  XOR_TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${a} OR ${b} = ${expected}`, () => {
      xor.getPin(PIN_A).send(a);
      xor.getPin(PIN_B).send(b);
      expect(receiver.lastOutput).toBe(expected);
    });
  });
});
