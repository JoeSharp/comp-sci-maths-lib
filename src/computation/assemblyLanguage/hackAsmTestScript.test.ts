import { readFileSync } from "fs";
import { Optional } from "../../types";

import {
  parseOutputFormat,
  parseRequiredFile,
  parseSetRam,
  NamedRegExps,
  parseTestScript,
  parseTickTock,
  parseRepeatStart,
  parseRepeatEnd,
} from "./hackAsmTestScript";
import {
  CpuTestInstructionType,
  CpuTestOutputFragment,
  CpuTestRepeat,
  CpuTestSetRAM,
} from "./types";

interface SetRamTestCase {
  input: string;
  expected: CpuTestSetRAM;
}

interface RequiredFileTestCase {
  input: string;
  name: keyof NamedRegExps;
  expected: string;
}

interface RepeatTestCase {
  input: string;
  expectedCount: Optional<number>;
}

describe("Hack ASM Test Scripts", () => {
  test("Tick Tock", () => {
    expect(parseTickTock("   ticktock;")).toBeTruthy();
    expect(parseTickTock("ticktock;")).toBeTruthy();
    expect(parseTickTock(" flicktock")).toBeFalsy();
    expect(parseTickTock("sticktock   ")).toBeFalsy();
  });

  const repeatTestCases: RepeatTestCase[] = [
    {
      input: "repeat 70 {",
      expectedCount: 70,
    },
    {
      input: "repeat 35 { // This likes to work a lot",
      expectedCount: 35,
    },
    {
      input: "loop 70 {",
      expectedCount: undefined,
    },
  ];

  repeatTestCases.forEach(({ input, expectedCount }) => {
    test(`Repeat Start - ${input}`, () => {
      const result = parseRepeatStart(input);
      if (!!expectedCount) {
        expect(result).toBeDefined();
        expect(result.count).toBe(expectedCount);
      } else {
        expect(result).toBeUndefined();
      }
    });
  });

  test("Repeat End", () => {
    expect(parseRepeatEnd("   }  ")).toBeTruthy();
    expect(parseRepeatEnd("}")).toBeTruthy();
    expect(parseRepeatEnd("{")).toBeFalsy();
    expect(parseRepeatEnd(" {} ")).toBeFalsy();
  });

  const requiredFileTestCases: RequiredFileTestCase[] = [
    {
      input: "load Mult.asm,",
      name: "load",
      expected: "Mult.asm",
    },
    {
      input: "output-file Mult.out,",
      name: "outputFile",
      expected: "Mult.out",
    },
    {
      input: "compare-to Mult.cmp,",
      name: "compareTo",
      expected: "Mult.cmp",
    },
  ];

  requiredFileTestCases.forEach(({ input, name, expected }) => {
    test(`Required File - ${input}`, () =>
      expect(parseRequiredFile(input, name)).toBe(expected));
  });

  const setRamTestCases: SetRamTestCase[] = [
    {
      input: "set RAM[0] 4,   // Set test arguments",
      expected: {
        type: CpuTestInstructionType.setRam,
        address: 0,
        value: 4,
      },
    },
    {
      input: "set RAM[1] 78,",
      expected: {
        type: CpuTestInstructionType.setRam,
        address: 1,
        value: 78,
      },
    },
    {
      input: "set RAM[2] -1;  // Test that program initialized product to 0",
      expected: {
        type: CpuTestInstructionType.setRam,
        address: 2,
        value: -1,
      },
    },
  ];
  setRamTestCases.forEach(({ input, expected }) => {
    test(`Set RAM - ${input}`, () => {
      const result = parseSetRam(input);
      expect(result).toBeDefined();
      expect(result.address).toBe(expected.address);
      expect(result.value).toBe(expected.value);
    });
  });

  test("Output Format", () => {
    const results: CpuTestOutputFragment[] = [];
    parseOutputFormat(
      "output-list RAM[0]%D2.6.2 RAM[1]%D2.6.2 RAM[2]%D2.6.2;",
      results
    );

    expect(results.length).toBe(3);
    expect(results[0].address).toBe(0);
    expect(results[0].format).toBe("D");
    expect(results[0].spacing).toEqual([2, 6, 2]);

    expect(results[1].address).toBe(1);
    expect(results[1].format).toBe("D");
    expect(results[2].spacing).toEqual([2, 6, 2]);

    expect(results[2].address).toBe(2);
    expect(results[2].format).toBe("D");
    expect(results[2].spacing).toEqual([2, 6, 2]);
  });

  test("ASM Test Script (Mult)", () => {
    const data = readFileSync(
      "src/computation/assemblyLanguage/testData/mult/Mult.tst",
      "utf-8"
    );

    const testScript = parseTestScript(data);

    // Check required files
    expect(testScript.load).toBe("Mult.asm");
    expect(testScript.outputFile).toBe("Mult.out");
    expect(testScript.compareTo).toBe("Mult.cmp");

    // Check output format
    expect(testScript.outputList.length).toBe(3);
    expect(testScript.outputList[0].address).toBe(0);
    expect(testScript.outputList[0].format).toBe("D");
    expect(testScript.outputList[0].spacing).toEqual([2, 6, 2]);

    expect(testScript.outputList[1].address).toBe(1);
    expect(testScript.outputList[1].format).toBe("D");
    expect(testScript.outputList[2].spacing).toEqual([2, 6, 2]);

    expect(testScript.outputList[2].address).toBe(2);
    expect(testScript.outputList[2].format).toBe("D");
    expect(testScript.outputList[2].spacing).toEqual([2, 6, 2]);
  });
});
