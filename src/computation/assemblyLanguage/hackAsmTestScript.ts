import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestOutputFragment,
  CpuTestOutputInstruction,
  CpuTestRepeat,
  CpuTestScript,
  CpuTestSetPC,
  CpuTestSetRAM,
  CpuTestTickTockInstruction,
} from "./types";
import { COMMENT_REGEX } from "./hackAsm";
import { Optional } from "../../types";
import Stack from "../../dataStructures/stack/Stack";

const LOAD_REGEX = /^(?:load)\s(?<load>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const OUTPUT_FILE_REGEX = /^(?:output\-file)\s(?<outputFile>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const COMPARE_TO_REGEX = /^(?:compare\-to)\s(?<compareTo>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const OUTPUT_FORMAT_REGEX = /^(?:output-list)(?<parts>(?:(?:\sRAM\[)(?:[0-9]+)(?:\]\%D)(?:[0-9]\.)*(?:[0-9]+))+)(?:;)+$/;
const OUTPUT_FRAGMENT_REGEX = /^(?:RAM\[)(?<address>[0-9]+)(?:\]\%(?<format>D))(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const SET_RAM_REGEX = /^(set\sRAM\[)(?<address>[0-9])+(\]\s)(?<value>[\-0-9]+)(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const SET_PC_REGEX = /^(set\sPC\s)(?<value>[0-9]+)(,|;)$/;
const TICKTOCK_REGEX = /^\s*(ticktock;)$/;
const REPEAT_START_REGEX = /^\s*(?:repeat)\s*(?<count>[0-9]+)\s*(?:{)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const REPEAT_END_REGEX = /^\s*(})\s*$/;
const OUTPUT_REGEX = /^\s*(output;)$/;

export interface NamedRegExps {
  load: RegExp;
  outputFile: RegExp;
  compareTo: RegExp;
}

const REQUIRED_FILE_REGEXES: NamedRegExps = {
  load: LOAD_REGEX,
  outputFile: OUTPUT_FILE_REGEX,
  compareTo: COMPARE_TO_REGEX,
};

export const parseRequiredFile = (
  input: string,
  name: keyof NamedRegExps
): Optional<string> => {
  const match = input.match(REQUIRED_FILE_REGEXES[name]);
  if (!!match) {
    return match.groups[name];
  }
};

export const parseOutputFormat = (
  input: string,
  results: CpuTestOutputFragment[]
) => {
  const matches = input.match(OUTPUT_FORMAT_REGEX);
  if (!!matches) {
    const parts = matches.groups.parts
      .trim()
      .split(" ")
      .map((t) => t.trim());
    parts
      .map((p) => p.match(OUTPUT_FRAGMENT_REGEX))
      .map((m) => ({
        address: parseInt(m.groups.address, 10),
        format: m.groups.format,
        spacing: m.groups.spacing.split(".").map((s) => parseInt(s, 10)),
      }))
      .forEach((of) => results.push(of));
  }
};

export const parseSetRam = (
  input: string,
  lineNumber: number
): Optional<CpuTestSetRAM> => {
  const match = input.match(SET_RAM_REGEX);
  if (!!match) {
    return {
      type: CpuTestInstructionType.setRam,
      lineContent: input,
      lineNumber,
      address: parseInt(match.groups.address, 10),
      value: parseInt(match.groups.value, 10),
    };
  }

  return;
};

export const parseSetPC = (
  input: string,
  lineNumber: number
): Optional<CpuTestSetPC> => {
  const match = input.match(SET_PC_REGEX);
  if (!!match) {
    return {
      type: CpuTestInstructionType.setPC,
      lineContent: input,
      lineNumber,
      value: parseInt(match.groups.value, 10),
    };
  }

  return;
};

export const spacePad = (value: string, width: number) => {
  while (value.length < width) {
    value = ` ${value}`;
  }
  return value;
};

interface RadixByCode {
  [code: string]: number;
}

const RADIX_BY_CODE: RadixByCode = {
  D: 10,
};

export const formatString = (value: string, spacing: number[]): string => {
  if (spacing.length === 3) {
    return `${spacePad("", spacing[0])}${spacePad(value, spacing[1])}${spacePad(
      "",
      spacing[2]
    )}`;
  }

  // Not sure, just dump out the value
  return value.toString();
};

export const formatNumber = (
  value: number,
  format: string,
  spacing: number[]
): string => formatString(value.toString(RADIX_BY_CODE[format]), spacing);

export const parseTickTockInstruction = (input: string): boolean =>
  input.match(TICKTOCK_REGEX) !== null;

export const parseOutputInstruction = (input: string): boolean =>
  input.match(OUTPUT_REGEX) !== null;

export const parseRepeatStart = (
  input: string,
  lineNumber: number
): Optional<CpuTestRepeat> => {
  const match = input.match(REPEAT_START_REGEX);

  if (!!match) {
    return {
      type: CpuTestInstructionType.repeat,
      lineNumber,
      lineContent: input,
      count: parseInt(match.groups.count, 10),
      instructions: [],
    };
  }

  return;
};

export const parseRepeatEnd = (input: string): boolean =>
  input.match(REPEAT_END_REGEX) !== null;

export const parseTestScript = (input: string): CpuTestScript => {
  let outputFile: string;
  let compareTo: string;
  let load: string;
  const outputList: CpuTestOutputFragment[] = [];
  const testInstructions: CpuTestInstruction[] = [];
  const rawTestInstructions: CpuTestInstruction[] = [];

  const stackInstructions: Stack<CpuTestInstruction[]> = new Stack();
  stackInstructions.push(testInstructions);

  input
    .split("\n")
    .map((s) => s.trim()) // Trim any indentation
    .map((s, i) => ({ lineContent: s, lineNumber: i }))
    .filter(({ lineContent }) => lineContent.length > 0) // Get rid of empty lines
    .filter(({ lineContent }) => lineContent.match(COMMENT_REGEX) === null) // Get rid of comments
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

      // Now we are into commands
      // Repeat Start
      const repeatCommand = parseRepeatStart(lineContent, lineNumber);
      if (!!repeatCommand) {
        stackInstructions.peek().push(repeatCommand);
        stackInstructions.push(repeatCommand.instructions);
        rawTestInstructions.push(repeatCommand);
        repeatCommand.instructions.forEach((c) => rawTestInstructions.push(c));
        return;
      }

      // Repeat End
      if (parseRepeatEnd(lineContent)) {
        stackInstructions.pop();
        rawTestInstructions.push({
          type: CpuTestInstructionType.repeatEnd,
          lineContent,
          lineNumber,
        });
        return;
      }

      // Tick Tock
      if (parseTickTockInstruction(lineContent)) {
        const tickTock: CpuTestTickTockInstruction = {
          type: CpuTestInstructionType.ticktock,
          lineContent,
          lineNumber,
        };
        stackInstructions.peek().push(tickTock);
        rawTestInstructions.push(tickTock);
        return;
      }

      // Output
      if (parseOutputInstruction(lineContent)) {
        const output: CpuTestOutputInstruction = {
          type: CpuTestInstructionType.output,
          lineContent,
          lineNumber,
        };
        stackInstructions.peek().push(output);
        rawTestInstructions.push(output);
        return;
      }

      // Check for Set RAM
      const setRam = parseSetRam(lineContent, lineNumber);
      if (!!setRam) {
        stackInstructions.peek().push(setRam);
        rawTestInstructions.push(setRam);
        return;
      }

      // Check for Set PC
      const setPC = parseSetPC(lineContent, lineNumber);
      if (!!setPC) {
        stackInstructions.peek().push(setPC);
        rawTestInstructions.push(setPC);
        return;
      }

      // Not recognised in any way...throw error
      throw new Error(
        `Invalid test script line: ${lineContent} on line ${lineNumber}`
      );
    });

  return {
    outputFile,
    compareTo,
    load,
    outputList,
    testInstructions,
    rawTestInstructions,
  };
};
