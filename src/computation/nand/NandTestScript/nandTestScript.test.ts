import { readFileSync } from "fs";
import parseNandTestScript from "./nandChipTestScript";
import {
  NandTestInstruction,
  NandTestInstructionType,
  NandTestScript,
  NandTestSetBus,
  NandTestSetPin,
} from "./types";

describe("NAND Test Script", () => {
  test("AND.tst", () => {
    const data = readFileSync(
      "src/computation/nand/Logic/And/And.tst",
      "utf-8"
    );
    const testScript: NandTestScript = parseNandTestScript(data);

    expect(testScript.compareTo).toBe("And.cmp");
    expect(testScript.load).toBe("And.hdl");
    expect(testScript.outputFile).toBe("And.out");
    expect(testScript.outputList.length).toBe(3);

    const instructions = testScript.testInstructions;
    expect(instructions.length).toBe(16);
    const expectedInstructions: NandTestInstruction[] = [
      {
        type: NandTestInstructionType.setPin,
        pin: "a",
        value: false,
        lineContent: "",
        lineNumber: 0,
      },
      {
        type: NandTestInstructionType.setPin,
        pin: "b",
        value: false,
        lineContent: "",
        lineNumber: 0,
      },
      {
        type: NandTestInstructionType.eval,
        lineContent: "",
        lineNumber: 0,
      },
      {
        type: NandTestInstructionType.output,
        lineContent: "",
        lineNumber: 0,
      },
    ];
    expectedInstructions.forEach((instruction, i) => {
      expect(instructions[i].type).toBe(instruction.type);
      switch (instruction.type) {
        case NandTestInstructionType.setPin:
          expect((instructions[i] as NandTestSetPin).pin).toBe(instruction.pin);
          expect((instructions[i] as NandTestSetPin).value).toBe(
            instruction.value
          );
          break;
        case NandTestInstructionType.setBus:
          expect((instructions[i] as NandTestSetBus).bus).toBe(instruction.bus);
          expect((instructions[i] as NandTestSetBus).values).toEqual(
            instruction.values
          );
          break;
      }
    });

    // expect(testScript.testInstructions.length).toBe(16);
  });
});

// load And.hdl,
// output-file And.out,
// compare-to And.cmp,
// output-list a%B3.1.3 b%B3.1.3 out%B3.1.3;

// set a 0,
// set b 0,
// eval,
// output;

// set a 0,
// set b 1,
// eval,
// output;

// set a 1,
// set b 0,
// eval,
// output;

// set a 1,
// set b 1,
// eval,
// output;
