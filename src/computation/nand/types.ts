export interface TwoInOneOutTestCase {
  a: boolean;
  b: boolean;
  expected: boolean;
}

export const WORD_LENGTH = 16;
export const ZERO_WORD = Array(WORD_LENGTH).fill(false);

// Arrays need reversing, binary numbers are read right to left
export const getTestName = (parameters: object) =>
  Object.entries(parameters)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
export const generateRandomWord = () =>
  Array(WORD_LENGTH)
    .fill(null)
    .map(() => Math.random() > 0.5);

export const PIN_A = "a";
export const PIN_B = "b";
export const PIN_INPUT = "input";
export const PIN_OUTPUT = "output";
export const PIN_SELECTOR = "sel";
export const PIN_LOAD = "load";
export const PIN_ADDRESS = "address";
