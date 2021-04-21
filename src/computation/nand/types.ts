export interface TwoInOneOutTestCase {
    a: boolean;
    b: boolean;
    expected: boolean;
}

export const WORD_LENGTH = 16;

// Arrays need reversing, binary numbers are read right to left
export const binaryToBoolArray = (input: string): boolean[] => input.split('').map(binToBool).reverse();
export const booleanToBinArray = (input: boolean[]): string => input.map(boolToBin).reverse().join('');
export const boolToBin = (v: boolean) => v ? '1' : '0';
export const binToBool = (v: string) => v === '1';
export const getTestName = (parameters: object) => Object.entries(parameters).map(([k, v]) => `${k}=${v}`).join(', ');

export const PIN_A = 'a';
export const PIN_B = 'b';
export const PIN_INPUT = 'input';
export const PIN_OUTPUT = 'output';
export const PIN_SELECTOR = 'sel';
export const PIN_LOAD = 'load';