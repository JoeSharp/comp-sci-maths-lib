import { Optional } from "../../../../types";
import { isComment, parseRequiredFile, parseOutputFormat } from "../../../TestScripts/parseTestScripts";
import { TestOutputFragment } from "../../../TestScripts/types";
import { NandTestScript, NandTestInstruction, NandTestInstructionType, NandTestSetBus, NandTestSetPin } from "./types";

const EVAL_REGEX = /^\s*(eval(,|;))\s*$/;
const SET_PIN_REGEX = /^(set\s(?<pin>[A-Za-z0-9]+)\s)(?<value>[0|1])(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const SET_BUS_REGEX = /^(set\s(?<bus>[A-Za-z0-9]+)\s)(?<value>[0|1]+)(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;

export const parseEvalInstruction = (input: string): boolean =>
  input.match(EVAL_REGEX) !== null;

export const parseSetPin = (
  input: string,
  lineNumber: number
): Optional<NandTestSetPin> => {
  const match = input.match(SET_PIN_REGEX);
  if (!!match) {
    return {
      type: NandTestInstructionType.setPin,
      lineContent: input,
      lineNumber,
      pin: match.groups.pin,
      value: match.groups.value === '1',
    };
  }

  return;
};

export const parseSetBus = (
  input: string,
  lineNumber: number
): Optional<NandTestSetBus> => {
  const match = input.match(SET_BUS_REGEX);
  if (!!match) {
    return {
      type: NandTestInstructionType.setBus,
      lineContent: input,
      lineNumber,
      bus: match.groups.bus,
      values: match.groups.value.split('').map(s => s === '1'),
    };
  }

  return;
};
export const parseNandTestScript = (input: string): NandTestScript => {
  let outputFile: string;
  let compareTo: string;
  let load: string;
  const outputList: TestOutputFragment[] = [];
  const testInstructions: NandTestInstruction[] = [];

  input
    .split("\n")
    .map((s) => s.trim()) // Trim any indentation
    .map((s, i) => ({ lineContent: s, lineNumber: i }))
    .filter(({ lineContent }) => lineContent.length > 0) // Get rid of empty lines
    .filter(({ lineContent }) => !(isComment(lineContent))) // Get rid of comments
    .forEach(({ lineContent, lineNumber }) => {
      // Check for load file (if not already seen)
      if (!load) {
        load = parseRequiredFile(lineContent, "load");
        if (!!load) return;
      }

      // Check for output file (if not already seen)
      if (!outputFile) {
        outputFile = parseRequiredFile(lineContent, "outputFile");
        if (!!outputFile) return;
      }

      // Check for output file (if not already seen)
      if (!compareTo) {
        compareTo = parseRequiredFile(lineContent, "compareTo");
        if (!!compareTo) return;
      }

      if (outputList.length === 0) {
        parseOutputFormat(lineContent, outputList);
        if (outputList.length > 0) return;
      }

      if (parseEvalInstruction(lineContent)) {
        testInstructions.push({
          type: NandTestInstructionType.eval,
          lineContent,
          lineNumber,
        });
        return;
      }

      // Check for set pin
      const setPin = parseSetPin(lineContent, lineNumber);
      if (!!setPin) {
        testInstructions.push(setPin);
        return;
      }

      // Check for set bus
      const setBus = parseSetBus(lineContent, lineNumber);
      if (!!setBus) {
        testInstructions.push(setBus);
        return;
      }

    });

  return {
    outputFile,
    compareTo,
    load,
    outputList,
    testInstructions
  }
}

export default parseNandTestScript;