import { readFileSync } from "fs";
import { toSymbolicAsm } from "./hackAsm";
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

  const runToEnd = (cpu: HackCpu, endLabel: string, tickLimit: number) => {
    const end = cpu.namedRegisters[endLabel];
    expect(end).toBeGreaterThan(0);
    let ticks = 0;
    while (cpu.programCounter !== end) {
      cpu.tick();
      ticks++;

      if (ticks > tickLimit) throw new Error("Took far too long to get to END");
    }
  };

  test("ASM Code File (Max)", () => {
    const data = readFileSync(
      "src/computation/assemblyLanguage/testData/Max.asm",
      "utf8"
    );

    const cpu = new HackCpu();
    cpu.loadProgram(data);
    cpu.setMemory(0, [56, 73]);

    runToEnd(cpu, "INFINITE_LOOP", 10000);

    expect(cpu.getMemory(2)).toBe(73);
  });

  test("ASM Code File (Mult)", () => {
    const data = readFileSync(
      "src/computation/assemblyLanguage/testData/mult/Mult.asm",
      "utf8"
    );

    const cpu = new HackCpu();
    cpu.loadProgram(data);
    cpu.setMemory(0, [6, 8, -1]);

    runToEnd(cpu, "END", 10000);

    expect(cpu.getMemory(2)).toBe(48);
  });
});
