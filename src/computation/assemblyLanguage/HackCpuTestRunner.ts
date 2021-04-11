import {
  parseTestScript,
  formatNumber,
  formatString,
} from "./hackAsmTestScript";
import HackCpu from "./HackCpu";
import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestRepeat,
  CpuTestScript,
  CpuTestSetPC,
  CpuTestSetRAM,
  FileLoader,
} from "./types";
import Stack from "../../dataStructures/stack/Stack";

export default class HackCpuTestRunner {
  fileLoader: FileLoader;
  cpu: HackCpu;
  testScript: CpuTestScript;
  commandStack: Stack<CpuTestInstruction[]>;
  compareTo: string[];
  testOutput: string[];

  constructor(fileLoader: FileLoader) {
    this.fileLoader = fileLoader;
  }

  loadScript(data: string) {
    this.cpu = new HackCpu();

    this.testOutput = [];
    this.testScript = parseTestScript(data);
    this.commandStack = new Stack();
    this.commandStack.push([...this.testScript.testInstructions]);
    this.compareTo = this.fileLoader(this.testScript.compareTo)
      .split("\n")
      .map((s) => s.trim());

    const program = this.fileLoader(this.testScript.load);
    this.cpu.loadProgram(program);

    const log = this.testScript.outputList
      .map(({ address, spacing }) => formatString(`RAM[${address}]`, spacing))
      .join("|");
    this.addToLog(`|${log}|`);
  }

  addToLog(log: string) {
    if (this.testOutput.length >= this.compareTo.length) {
      throw new Error(
        `Too many log lines output from test, expecting ${this.compareTo.length}`
      );
    }

    // Check against compareTo
    const nextCompareLine = this.compareTo[this.testOutput.length];
    if (nextCompareLine !== log) {
      throw new Error(
        `Comparing Failure on Line ${this.testOutput.length}\n\tExpected: ${nextCompareLine}\n\tReceived: ${log}`
      );
    }

    // Assume all is good
    this.testOutput.push(log);
  }

  step(toEnd: boolean = false) {
    while (!this.commandStack.isEmpty()) {
      while (this.commandStack.peek().length > 0) {
        const instruction = this.commandStack.peek().shift();
        this.runInstruction(instruction);
        if (!toEnd) return; // Just run one command
      }

      this.commandStack.pop();
    }
  }

  runToEnd() {
    this.step(true);
  }

  runInstruction(instruction: CpuTestInstruction) {
    switch (instruction.type) {
      case CpuTestInstructionType.output:
        return this.handleOutputInstruction();
      case CpuTestInstructionType.ticktock:
        return this.handleTickTockInstruction();
      case CpuTestInstructionType.repeat:
        return this.handleRepeatInstruction(instruction);
      case CpuTestInstructionType.setRam:
        return this.handleSetRamInstruction(instruction);
      case CpuTestInstructionType.setPC:
        return this.handleSetPCInstruction(instruction);
    }
  }

  handleOutputInstruction() {
    const log = this.testScript.outputList
      .map(({ address, format, spacing }) =>
        formatNumber(this.cpu.memory[address], format, spacing)
      )
      .join("|");
    this.addToLog(`|${log}|`);
  }

  handleTickTockInstruction() {
    this.cpu.tick();
  }

  handleRepeatInstruction({ count, instructions }: CpuTestRepeat) {
    const newNestedInstructions: CpuTestInstruction[] = [];
    for (let x = 0; x < count; x++) {
      instructions.forEach((i) => newNestedInstructions.push(i));
    }
    this.commandStack.push(newNestedInstructions);
  }

  handleSetRamInstruction({ address, value }: CpuTestSetRAM) {
    this.cpu.setMemory(address, [value]);
  }

  handleSetPCInstruction({ value }: CpuTestSetPC) {
    this.cpu.setPC(value);
  }
}
