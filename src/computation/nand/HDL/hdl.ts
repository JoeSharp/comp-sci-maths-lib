import { isComment } from "../../TestScripts/parseTestScripts";
import { DIRECTION, HdlBus, HdlChip, HdlCodeLine, HdlIOLine } from "./types";

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

const IO_LINE_REGEX = /(?<direction>IN|OUT)\s(?<pins>(?:[a-zA-Z]+(?:\[[0-9]*\])?(?:,\s){0,1})*);{1}/;
const BUS_NAME_WIDTH_REGEX = /(?<name>[a-zA-Z])+(?:\[(?<width>[0-9]*)\])/
export const parseIOLine = (input: string): HdlIOLine => {
  const ioLineMatch = input.trim().match(IO_LINE_REGEX);

  if (ioLineMatch === null) throw new Error(`Invalid IO Line: ${input}`);

  const direction = ioLineMatch.groups.direction as DIRECTION;
  const allInputs = ioLineMatch.groups.pins.split(",").map((l) => l.trim());
  const pins = allInputs.filter(x => !x.match(BUS_NAME_WIDTH_REGEX));
  const buses: HdlBus[] = allInputs
    .map(x => x.match(BUS_NAME_WIDTH_REGEX))
    .filter(x => x !== null)
    .map((m) => ({
      name: m.groups.name,
      width: parseInt(m.groups.width)
    }));

  return {
    direction,
    pins,
    buses
  };
};

const codeLineRegex = /(?<chipName>[A-Za-z0-9]+)\s?\((?<parameters>(?:[a-zA-Z]+=[a-zA-Z]+(?:\[[0-9]+(?:..[0-9]+)?\])?(?:,\s)?)+)\);/;
const BUS_SINGLE_INDEX_REGEX = /(?<name>[a-zA-Z]+)(?:\[(?<index>[0-9])+)\]/
const BUS_RANGE_REGEX = /(?<name>[a-zA-Z]+)(?:\[(?<from>[0-9])+..(?<to>[0-9]+)\])/
export const parseCodeLine = (input: string): HdlCodeLine => {
  const codeLineMatch = input.trim().match(codeLineRegex);

  if (codeLineMatch === null) throw new Error(`Invalid code line : ${input}`);

  const chipName = codeLineMatch.groups.chipName;
  const parameterStr = codeLineMatch.groups.parameters;
  const parameters = parameterStr
    .split(",")
    .map((l) => l.trim())
    .map((l) => l.split("="))
    .map(([inputName, outputSpec]) => {
      let singleIndexMatch = outputSpec.match(BUS_SINGLE_INDEX_REGEX);
      if (!!singleIndexMatch) {
        return {
          inputName,
          outputName: singleIndexMatch.groups.name,
          outputFrom: parseInt(singleIndexMatch.groups.index)
        }
      }

      let rangeMatch = outputSpec.match(BUS_RANGE_REGEX);
      if (!!rangeMatch) {
        return {
          inputName,
          outputName: rangeMatch.groups.name,
          outputFrom: parseInt(rangeMatch.groups.from),
          outputTo: parseInt(rangeMatch.groups.to)
        }
      }
      
      return { inputName, outputName: outputSpec }
    });

  return {
    chipName,
    parameters,
  };
};
