import { isComment } from "../TestScripts/parseTestScripts";
import { DIRECTION, HdlChip, HdlCodeLine, HdlIOLine } from "./types";

export const parseHdlFile = (input: string): HdlChip => {
  // Remove any comments, and empty lines, strip each line.
  const lines = input
    .split("\n")
    .map((s) => s.trim())
    .filter((l) => l.length > 0)
    .filter((l) => !isComment(l));

  // Open, INPUT, OUTPUT, PARTS, .... CLOSE
  if (lines.length < 5) throw new Error("Not enough lines for chip definition");

  const name = parseOpeningLine(lines[0]);
  const inputSpec = parseIOLine(lines[1]);
  const outputSpec = parseIOLine(lines[2]);
  const codeLines = lines
    .filter((_, i) => i > 3 && i < lines.length - 1)
    .map((l) => parseCodeLine(l));

  return {
    name,
    inputSpec,
    outputSpec,
    codeLines,
  };
};

const OPEN_LINE_REGEX = /(CHIP)\s+(?<chipName>[A-Za-z]+)\s({)/;
export const parseOpeningLine = (input: string): string => {
  const openLineMatch = input.trim().match(OPEN_LINE_REGEX);
  if (openLineMatch === null) throw new Error("HDL Opening Line Invalid");
  return openLineMatch.groups.chipName;
};

const IO_LINE_REGEX = /(?<direction>IN|OUT)\s(?<pins>([a-zA-Z]+(,\s){0,1})*);{1}/;
export const parseIOLine = (input: string): HdlIOLine => {
  const ioLineMatch = input.trim().match(IO_LINE_REGEX);

  if (ioLineMatch === null) throw new Error("Invalid IO Line");

  const direction = ioLineMatch.groups.direction as DIRECTION;
  const pins = ioLineMatch.groups.pins.split(",").map((l) => l.trim());

  return {
    direction,
    pins,
  };
};

const codeLineRegex = /(?<chipName>[A-Za-z]+)\((?<parameters>([a-zA-Z]+=[a-zA-Z]+(?:,\s){0,1})+)\);/;
export const parseCodeLine = (input: string): HdlCodeLine => {
  const codeLineMatch = input.trim().match(codeLineRegex);

  if (codeLineMatch === null) throw new Error("Invalid code line");

  const chipName = codeLineMatch.groups.chipName;
  const parameterStr = codeLineMatch.groups.parameters;
  const parameters = parameterStr
    .split(",")
    .map((l) => l.trim())
    .map((l) => l.split("="))
    .map(([inputName, outputName]) => ({ inputName, outputName }));

  return {
    chipName,
    parameters,
  };
};
