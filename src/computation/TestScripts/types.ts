export interface TestOutputRam {
  address: number;
  format: string;
  spacing: number[];
}

export interface TestOutputVariable {
  variable: string;
  format: string;
  spacing: number[];
}

export type TestOutputFragment = TestOutputRam | TestOutputVariable;

export interface TestScript {
  load: string;
  outputFile: string;
  compareTo: string;
  outputList: TestOutputFragment[];
}

export interface CodeLine {
  lineContent: string;
  lineNumber: number;
}
