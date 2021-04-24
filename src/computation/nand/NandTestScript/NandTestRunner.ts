import { FileLoader, isOutputRam } from "../../TestScripts/types";
import TestRunner from "../../TestScripts/TestRunner";
import Chip from "../Chip";
import parseNandTestScript from "./nandChipTestScript";
import {
  NandTestInstruction,
  NandTestInstructionType,
  NandTestScript,
  NandTestSetBus,
  NandTestSetPin,
} from "./types";
import { formatNumber } from "../../TestScripts/parseTestScripts";

class NandTestRunner extends TestRunner<
  Chip,
  NandTestInstruction,
  NandTestScript
> {
  fileLoader: FileLoader;
  testScript: NandTestScript;
  chip: Chip;

  constructor(chip: Chip, fileLoader: FileLoader) {
    super(chip, fileLoader, parseNandTestScript);
    this.fileLoader = fileLoader;
    this.chip = chip;
  }

  loadProgram(program: string): void {
    // LOAD HDL INTO GENERIC CHIP
    //throw new Error("Method not implemented.");
  }
  runInstruction(instruction: NandTestInstruction): void {
    switch (instruction.type) {
      case NandTestInstructionType.eval:
        break;
      case NandTestInstructionType.output:
        this.handleOutputInstruction();
        break;
      case NandTestInstructionType.setPin:
        this.handleSetPin(instruction);
        break;
      case NandTestInstructionType.setBus:
        this.handleSetBus(instruction);
        break;
    }
  }

  handleSetPin({ pin, value }: NandTestSetPin) {
    this.objectUnderTest.sendToInputPin(pin, value);
  }

  handleSetBus({ bus, values }: NandTestSetBus) {
    this.objectUnderTest.sendToInputBus(bus, values);
  }

  handleOutputInstruction() {
    const log = this.testScript.outputList
      .map((output) => {
        if (isOutputRam(output)) {
          throw new Error("Unsupported method, outputting RAM from Chip");
        } else {
          const { format, spacing, variable } = output;
          return formatNumber(
            999, //this.objectUnderTest.getInputPin(variable),
            format,
            spacing
          );
        }
      })
      .join("|");
    this.addToLog(`|${log}|`);
  }
}

export default NandTestRunner;
