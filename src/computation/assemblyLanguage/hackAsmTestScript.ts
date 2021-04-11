import {
  CpuTestInstruction,
  CpuTestInstructionType,
  CpuTestOutputFragment,
  CpuTestRepeat,
  CpuTestScript,
  CpuTestSetRAM,
} from "./types";
import { COMMENT_REGEX } from "./hackAsm";
import { Optional } from "../../types";
import { map } from "lodash";

const LOAD_REGEX = /^(?:load)\s(?<load>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const OUTPUT_FILE_REGEX = /^(?:output\-file)\s(?<outputFile>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const COMPARE_TO_REGEX = /^(?:compare\-to)\s(?<compareTo>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const OUTPUT_FORMAT_REGEX = /^(?:output-list)(?<parts>(?:(?:\sRAM\[)(?:[0-9]+)(?:\]\%D)(?:[0-9]\.)*(?:[0-9]+))+)(?:;)+$/;
const OUTPUT_FRAGMENT_REGEX = /^(?:RAM\[)(?<address>[0-9]+)(?:\]\%(?<format>D))(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const SET_RAM_REGEX = /^(set\sRAM\[)(?<address>[0-9])+(\]\s)(?<value>[\-0-9]+)(,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const TICKTOCK_REGEX = /^\s*(ticktock;)$/;
const REPEAT_START_REGEX = /^\s*(?:repeat)\s*(?<count>[0-9]+)\s*(?:{)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const REPEAT_END_REGEX = /^\s*(})\s*$/;

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
    const parts = matches.groups["parts"]
      .trim()
      .split(" ")
      .map((t) => t.trim());
    parts
      .map((p) => p.match(OUTPUT_FRAGMENT_REGEX))
      .map((m) => ({
        address: parseInt(m.groups["address"]),
        format: m.groups["format"],
        spacing: m.groups["spacing"].split(".").map((s) => parseInt(s, 10)),
      }))
      .forEach((of) => results.push(of));
  }
};

export const parseSetRam = (input: string): Optional<CpuTestSetRAM> => {
  const match = input.match(SET_RAM_REGEX);
  if (!!match) {
    return {
      type: CpuTestInstructionType.setRam,
      address: parseInt(match.groups["address"], 10),
      value: parseInt(match.groups["value"], 10),
    };
  }

  return;
};

export const parseTickTock = (input: string): boolean =>
  input.match(TICKTOCK_REGEX) !== null;

export const parseRepeatStart = (input: string): Optional<CpuTestRepeat> => {
  const match = input.match(REPEAT_START_REGEX);

  if (!!match) {
    return {
      type: CpuTestInstructionType.repeat,
      count: parseInt(match.groups["count"], 10),
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

  input
    .split("\n")
    .map((s) => s.trim()) // Trim any indentation
    .filter((s) => s.length > 0) // Get rid of empty lines
    .filter((s) => s.match(COMMENT_REGEX) === null) // Get rid of comments
    .forEach((s) => {
      // Check for load file (if not already seen)
      if (!load) {
        load = parseRequiredFile(s, "load");
        if (!!load) return;
      }

      // Check for output file (if not already seen)
      if (!outputFile) {
        outputFile = parseRequiredFile(s, "outputFile");
        if (!!outputFile) return;
      }

      // Check for output file (if not already seen)
      if (!compareTo) {
        compareTo = parseRequiredFile(s, "compareTo");
        if (!!compareTo) return;
      }

      if (outputList.length === 0) {
        parseOutputFormat(s, outputList);
        if (outputList.length > 0) return;
      }

      // Now we are into commands
      if (parseTickTock(s)) {
        testInstructions.push({
          type: CpuTestInstructionType.ticktock,
        });
      }

      // Check for Set RAM
      const setRamMatch = s.match(SET_RAM_REGEX);
      if (!!setRamMatch) {
        testInstructions.push({
          type: CpuTestInstructionType.setRam,
          address: parseInt(setRamMatch.groups["address"], 10),
          value: parseInt(setRamMatch.groups["value"], 10),
        });
      }
    });

  return {
    outputFile,
    compareTo,
    load,
    outputList,
    testInstructions,
  };
};
