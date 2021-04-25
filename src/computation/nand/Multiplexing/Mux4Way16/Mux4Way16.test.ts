import { PIN_C, PIN_D } from "../Dmux4Way/Dmux4Way";
import { binaryToBoolArray } from "../../../../dataRepresentation/numberBases/simpleBinary";
import {
  PIN_A,
  PIN_B,
  PIN_OUTPUT,
  PIN_SELECTOR,
  WORD_LENGTH,
} from "../../types";
import Mux4Way16 from "./Mux4Way16";

interface TestCase {
  a: string;
  b: string;
  c: string;
  d: string;
  sel: string;
  expected: string;
}

const TEST_CASES: TestCase[] = [
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "00",
    expected: "0000000000000000",
  },
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "01",
    expected: "0000000000000000",
  },
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "10",
    expected: "0000000000000000",
  },
  {
    a: "0000000000000000",
    b: "0000000000000000",
    c: "0000000000000000",
    d: "0000000000000000",
    sel: "11",
    expected: "0000000000000000",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "00",
    expected: "0001001000110100",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "01",
    expected: "1001100001110110",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "10",
    expected: "1010101010101010",
  },
  {
    a: "0001001000110100",
    b: "1001100001110110",
    c: "1010101010101010",
    d: "0101010101010101",
    sel: "11",
    expected: "0101010101010101",
  },
];

describe("Mux 4 way 16", () => {
  const mux = new Mux4Way16();
  const output: boolean[] = [];
  const receivers = Array(WORD_LENGTH)
    .fill(null)
    .map(() => jest.fn());
  mux.connectToBus(PIN_OUTPUT, receivers);

  TEST_CASES.forEach(({ a, b, c, d, sel, expected }) => {
    const inputStr = Object.entries({ a, b, c, d })
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    const testName = `${inputStr}, sel: ${sel}, expected: ${expected}`;
    test(testName, () => {
      mux.sendToBus(PIN_A, binaryToBoolArray(a));
      mux.sendToBus(PIN_B, binaryToBoolArray(b));
      mux.sendToBus(PIN_C, binaryToBoolArray(c));
      mux.sendToBus(PIN_D, binaryToBoolArray(d));
      mux.sendToBus(PIN_SELECTOR, binaryToBoolArray(sel));
      const expectedArr = binaryToBoolArray(expected);
      receivers.forEach((r, i) =>
        expect(r).toHaveBeenLastCalledWith(expectedArr[i])
      );
    });
  });
});
