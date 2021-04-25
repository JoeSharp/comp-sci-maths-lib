import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "../../types";

import Or from ".";
import { BinaryPin } from "../../BinaryPin";

const OR_TEST_CASES: TwoInOneOutTestCase[] = [
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
    expected: true,
  },
];
describe("OR", () => {
  const receiver = new BinaryPin();
  const or = new Or();
  or.connectToOutputPin(PIN_OUTPUT, receiver);

  OR_TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${a} OR ${b} = ${expected}`, () => {
      or.sendToInputPin(PIN_A, a);
      or.sendToInputPin(PIN_B, b);
      expect(receiver.lastOutput).toBe(expected);
    });
  });
});
