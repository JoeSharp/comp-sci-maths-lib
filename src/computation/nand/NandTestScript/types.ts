import { CodeLine, TestScript } from "../../TestScripts/types";

export enum NandTestInstructionType {
  setPin,
  setBus,
  eval,
  output,
}

export interface AbstractNandTestInstruction extends CodeLine {
  type: NandTestInstructionType;
}

export interface NandTestSetPin extends AbstractNandTestInstruction {
  type: NandTestInstructionType.setPin;
  pin: string;
  value: boolean;
}

export interface NandTestSetBus extends AbstractNandTestInstruction {
  type: NandTestInstructionType.setBus;
  bus: string;
  values: boolean[];
}

export interface NandTestOutput extends AbstractNandTestInstruction {
  type: NandTestInstructionType.output;
}

export interface NandTestEval extends AbstractNandTestInstruction {
  type: NandTestInstructionType.eval;
}

export type NandTestInstruction =
  | NandTestSetPin
  | NandTestSetBus
  | NandTestOutput
  | NandTestEval;

export interface NandTestScript extends TestScript<NandTestInstruction> {}
