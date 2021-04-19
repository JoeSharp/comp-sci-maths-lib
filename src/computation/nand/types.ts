export interface TwoInOneOutTestCase {
    a: boolean;
    b: boolean;
    expected: boolean;
}

export const WORD_LENGTH = 16;

export const binaryToBoolArray = (input: string): boolean[] => input.split('').map(binToBool);
export const booleanToBinArray = (input: boolean[]): string => input.map(boolToBin).join('');
export const boolToBin = (v: boolean) => v ? '1' : '0';
export const binToBool = (v: string) => v === '1';