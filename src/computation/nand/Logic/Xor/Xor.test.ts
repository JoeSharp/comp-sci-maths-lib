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
  xor.connectToOutputPin(PIN_OUTPUT, receiver);

  XOR_TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${a} OR ${b} = ${expected}`, () => {
      xor.sendToInputPin(PIN_A, a);
      xor.sendToInputPin(PIN_B, b);
      expect(receiver.lastOutput).toBe(expected);
    });
  });
});
