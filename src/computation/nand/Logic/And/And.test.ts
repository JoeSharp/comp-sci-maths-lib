import And from "./And";

import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "../../types";
import NandTestRunner from "../../NandTestScript/NandTestRunner";
import { FileLoader } from "../../../TestScripts/types";
import { readFileSync } from "fs";
import { BinaryPin } from "../../BinaryPin";

const AND_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: false,
  },
  {
    a: false,
    b: true,
    expected: false,
  },
  {
    a: true,
    b: false,
    expected: false,
  },
  {
    a: true,
    b: true,
    expected: true,
  },
];

describe("AND", () => {
  const result = new BinaryPin();
  const myAnd = new And();
  myAnd.getPin(PIN_OUTPUT).connect(result);

  AND_TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${a} AND ${b} = ${expected}`, () => {
      myAnd.getPin(PIN_A).send(a);
      myAnd.getPin(PIN_B).send(b);
      expect(result.lastOutput).toBe(expected);
    });
  });

  // test("Test Script", () => {
  //   const fileLoader: FileLoader = (filename: string) =>
  //     readFileSync(`src/computation/nand/Logic/And/${filename}`, "utf-8");
  //   const testScriptRaw = fileLoader("And.tst");
  //   const myAnd = new And();
  //   const runner = new NandTestRunner(myAnd, fileLoader);
  //   runner.loadScript(testScriptRaw);
  //   runner.runToEnd();
  // });
});
