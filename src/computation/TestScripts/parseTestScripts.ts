import { Optional } from "../../types";
import { TestOutputFragment } from "./types";

const LOAD_REGEX = /^(?:load)\s(?<load>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const OUTPUT_FILE_REGEX = /^(?:output\-file)\s(?<outputFile>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;
const COMPARE_TO_REGEX = /^(?:compare\-to)\s(?<compareTo>.+)(?:,|;)\s*(?:\/\/(?<comment>.*)){0,1}$/;

const OUTPUT_FORMAT_REGEX = /^(?:output-list)(?<parts>(?:\s(?:[^\%]+)(?:\%(D|B))(?:[0-9]\.)*(?:[0-9]+))+)(?:;)+$/;
const OUTPUT_RAM_FRAGMENT_REGEX = /^(?:RAM\[)(?<address>[0-9]+)(?:\]\%(?<format>[A-Z]))(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const OUTPUT_VAR_FRAGMENT_REGEX = /^(?<variable>[^\%\%\[\]]+)\%(?<format>[A-Z])(?<spacing>(?:[0-9]\.)*(?:[0-9]+))$/;
const OUTPUT_REGEX = /^\s*(output;)$/;
const COMMENT_REGEX = /^(\s)*(\/\/|[\/*]|[*])/;

export const isComment = (input: string) => input.match(COMMENT_REGEX) !== null;

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
  results: TestOutputFragment[]
) => {
  const matches = input.match(OUTPUT_FORMAT_REGEX);
  if (!!matches) {
    const parts = matches.groups.parts
      .trim()
      .split(" ")
      .map((t) => t.trim());
    parts
      .map((p) => p.match(OUTPUT_RAM_FRAGMENT_REGEX))
      .filter((m) => m !== null)
      .map((m) => ({
        heading: `RAM[${m.groups.address}]`,
        address: parseInt(m.groups.address, 10),
        format: m.groups.format,
        spacing: m.groups.spacing.split(".").map((s) => parseInt(s, 10)),
      }))
      .forEach((of) => results.push(of));
    parts
      .map((p) => p.match(OUTPUT_VAR_FRAGMENT_REGEX))
      .filter((m) => m !== null)
      .map((m) => ({
        heading: m.groups.variable,
        variable: m.groups.variable,
        format: m.groups.format,
        spacing: m.groups.spacing.split(".").map((s) => parseInt(s, 10)),
      }))
      .forEach((of) => results.push(of));
  }
};

export const parseOutputInstruction = (input: string): boolean =>
  input.match(OUTPUT_REGEX) !== null;

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
  const spacingFiddleFactor = Math.floor((value.length - 1) / 2);
  if (spacing.length === 3) {
    return `${spacePad("", spacing[0] - spacingFiddleFactor)}${spacePad(
      value,
      spacing[1]
    )}${spacePad("", spacing[2] - spacingFiddleFactor)}`;
  }

  // Not sure, just dump out the value
  return value.toString();
};

export const formatNumber = (
  value: number,
  format: string,
  spacing: number[]
): string => formatString(value.toString(RADIX_BY_CODE[format]), spacing);
