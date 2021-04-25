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
  or.getPin(PIN_OUTPUT).connect(receiver);

  OR_TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${a} OR ${b} = ${expected}`, () => {
      or.getPin(PIN_A).send(a);
      or.getPin(PIN_B).send(b);
      expect(receiver.lastOutput).toBe(expected);
    });
  });
});
