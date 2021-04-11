import { readFileSync } from "fs";
import HackCpu from "./HackCpu";

describe("Hack CPU", () => {
  test("ASM Code File (Add)", () => {
    const data = readFileSync(
      "src/computation/assemblyLanguage/testData/Add.asm",
      "utf8"
    );

    const cpu = new HackCpu();
    cpu.loadProgram(data);

    for (let x = 0; x < 10; x++) {
      cpu.tick();
    }

    expect(cpu.getMemory(0)).toBe(5);
  });

  test("ASM Code File (Max)", () => {
    const data = readFileSync(
      "src/computation/assemblyLanguage/testData/Max.asm",
      "utf8"
    );

    const cpu = new HackCpu();
    cpu.loadProgram(data);
    cpu.setMemory(0, [56, 73]);

    for (let x = 0; x < 26; x++) {
      cpu.tick();
    }

    expect(cpu.getMemory(2)).toBe(73);
  });
});
