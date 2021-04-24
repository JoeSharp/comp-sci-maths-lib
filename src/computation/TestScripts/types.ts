export interface TestOutputGeneric {
  heading: string;
  format: string;
  spacing: number[];
}

export interface TestOutputRam extends TestOutputGeneric {
  address: number;
}

export interface TestOutputVariable extends TestOutputGeneric {
  variable: string;
}

export type TestOutputFragment = TestOutputRam | TestOutputVariable;

export const isOutputRam = (
  testOutput: TestOutputFragment
): testOutput is TestOutputRam => {
  return (testOutput as TestOutputRam).address !== undefined;
};

export interface TestScript<INSTRUCTION> {
  load: string;
  outputFile: string;
  compareTo: string;
  outputList: TestOutputFragment[];
  testInstructions: INSTRUCTION[];
  rawTestInstructions: INSTRUCTION[];
}

export interface CodeLine {
  lineContent: string;
  lineNumber: number;
}

export type FileLoader = (filename: string) => string;
export type ScriptParser<T> = (filename: string) => T;
