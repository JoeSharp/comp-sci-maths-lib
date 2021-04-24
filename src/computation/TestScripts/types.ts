export interface TestOutputFragment {
    address: number;
    format: string;
    spacing: number[];
}

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