import Not16 from "./Not16";
import {
  binaryToBoolArray,
  booleanToBinArray,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { PIN_OUTPUT, PIN_INPUT } from "../../types";
import BinaryBus from "../../BinaryBus";

interface TestCase {
  input: boolean[];
  expected: boolean[];
}

const TEST_CASES: TestCase[] = [
  {
    input: binaryToBoolArray("0000000000000000"),
    expected: binaryToBoolArray("1111111111111111"),
  },
  {
    input: binaryToBoolArray("1111111111111111"),
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    input: binaryToBoolArray("1010101010101010"),
    expected: binaryToBoolArray("0101010101010101"),
  },
  {
    input: binaryToBoolArray("0011110011000011"),
    expected: binaryToBoolArray("1100001100111100"),
  },
  {
    input: binaryToBoolArray("0001001000110100"),
    expected: binaryToBoolArray("1110110111001011"),
  },
];

describe("NOT 16", () => {
  const not16 = new Not16();
  const receivers = new BinaryBus();
  not16.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ input, expected }) => {
    test(`NOT ${booleanToBinArray(input)} = ${booleanToBinArray(
      expected
    )}`, () => {
      not16.getBus(PIN_INPUT).send(input);

      expected.forEach((e, i) =>
        expect(receivers.pins[i].lastOutput).toBe(e)
      );
    });
  });
});
