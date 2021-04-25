import And16 from "./And16";
import {
  binaryToBoolArray,
  booleanToBinArray,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { PIN_OUTPUT, PIN_A, PIN_B } from "../../types";
import BinaryBus from "../../BinaryBus";

interface TestCase {
  a: boolean[];
  b: boolean[];
  expected: boolean[];
}

const TEST_CASES: TestCase[] = [
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("0000000000000000"),
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("0000000000000000"),
    b: binaryToBoolArray("1111111111111111"),
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("1111111111111111"),
    b: binaryToBoolArray("1111111111111111"),
    expected: binaryToBoolArray("1111111111111111"),
  },
  {
    a: binaryToBoolArray("1010101010101010"),
    b: binaryToBoolArray("0101010101010101"),
    expected: binaryToBoolArray("0000000000000000"),
  },
  {
    a: binaryToBoolArray("0011110011000011"),
    b: binaryToBoolArray("0000111111110000"),
    expected: binaryToBoolArray("0000110011000000"),
  },
  {
    a: binaryToBoolArray("0001001000110100"),
    b: binaryToBoolArray("1001100001110110"),
    expected: binaryToBoolArray("0001000000110100"),
  },
];

describe("AND 16", () => {
  const and16 = new And16();
  const receivers = new BinaryBus();
  and16.getBus(PIN_OUTPUT).connect(receivers);

  TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${booleanToBinArray(a)} AND ${booleanToBinArray(
      b
    )} = ${booleanToBinArray(expected)}`, () => {
      and16.getBus(PIN_A).send(a);
      and16.getBus(PIN_B).send(b);

      expected.forEach((e, i) =>
        expect(receivers.inputBus[i].lastOutput).toBe(e)
      );
    });
  });
});
