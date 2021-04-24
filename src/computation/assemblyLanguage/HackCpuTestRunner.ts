import { parseTestScript } from "./hackAsmTestScript";
import HackCpu from "./HackCpu";
import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestRepeat,
  CpuTestScript,
  CpuTestSetPC,
  CpuTestSetRAM,
} from "./types";
import Stack from "../../dataStructures/stack/Stack";
import { formatNumber, formatString } from "../TestScripts/parseTestScripts";
import TestRunner from "../TestScripts/TestRunner";
import { FileLoader, isOutputRam } from "../TestScripts/types";

export default class HackCpuTestRunner extends TestRunner<
  HackCpu,
  CpuTestInstruction,
  CpuTestScript
> {
  constructor(cpu: HackCpu, fileLoader: FileLoader) {
    super(cpu, fileLoader, parseTestScript);
  }

  loadProgram(program: string) {
    this.objectUnderTest.loadProgram(program);
  }

  runInstruction(instruction: CpuTestInstruction) {
    this.lastInstruction = instruction;

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

  handleTickTockInstruction() {
    this.objectUnderTest.tick();
  }

  handleRepeatInstruction({ count, instructions }: CpuTestRepeat) {
    const newNestedInstructions: CpuTestInstruction[] = [];
    for (let x = 0; x < count; x++) {
      instructions.forEach((i) => newNestedInstructions.push(i));
    }
    this.commandStack.push(newNestedInstructions);
  }

  handleSetRamInstruction({ address, value }: CpuTestSetRAM) {
    this.objectUnderTest.setMemory(address, [value]);
  }

  handleSetPCInstruction({ value }: CpuTestSetPC) {
    this.objectUnderTest.setPC(value);
  }

  handleOutputInstruction() {
    const log = this.testScript.outputList
      .map((output) => {
        if (isOutputRam(output)) {
          const { address, format, spacing } = output;
          return formatNumber(
            this.objectUnderTest.memory[address],
            format,
            spacing
          );
        } else {
          throw new Error(
            "Unsupported method, outputting variables from Hack CPU"
          );
        }
      })
      .join("|");
    this.addToLog(`|${log}|`);
  }
}
