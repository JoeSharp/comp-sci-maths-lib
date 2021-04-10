export interface HdlParameter {
    inputName: string;
    outputName: string;
}

export type DIRECTION = "IN" | "OUT";

export interface HdlIOLine {
    direction: DIRECTION,
    pins: string[];
}

export interface HdlCodeLine {
    chipName: string;
    parameters: HdlParameter[]
}

export const parameterToString = ({inputName, outputName}: HdlParameter): string => `${inputName}=${outputName}`
export const codeLineToString = ({chipName, parameters}: HdlCodeLine): string => `${chipName}: ${parameters.map(p => parameterToString(p)).join(', ')}`

export interface HdlChip {
    name: string;
    inputSpec: HdlIOLine;
    outputSpec: HdlIOLine;
    codeLines: HdlCodeLine[];
}