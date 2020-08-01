import { Comparator } from "../types";

export function simpleSwap<T>(arr: T[], from: number, to: number) {
  const swapItem: T = arr[from];
  arr[from] = arr[to];
  arr[to] = swapItem;
}

export function objToString(o?: object) {
  return !!o
    ? Object.entries(o)
        .map((k) => `${k[0]}=${k[1]}`)
        .join(" ")
    : "none";
}

export type StringReporter = (s: string) => void;

// tslint:disable-next-line: no-empty
export const emptyObserver = () => {};

export const anyComparator: Comparator<any> = (a: any, b: any) => a - b;

/**
 * Comparator function that uses simple arithmetic comparison.
 * based on https://www.w3schools.com/js/js_array_sort.asp
 * If the result is negative a is sorted before b.
 * If the result is positive b is sorted before a.
 * If the result is 0 no changes are done with the sort order of the two values.
 *
 * @param {number | string} a First item
 * @param {number | string} b Second item
 */
export const arithmeticComparator: Comparator<number> = (
  a: number,
  b: number
) => a - b;

export const stringComparator: Comparator<string> = (a: string, b: string) =>
  a.localeCompare(b);

interface GenerationOpts {
  sorted?: boolean;
  unique?: boolean;
}

const defaultGenOpts: GenerationOpts = {
  sorted: false,
  unique: false,
};

/**
 * Generate a list of random numbers in array of given length
 * @param {number} length
 * @return {array} the list of random numbers
 */
export function generateRandomNumbers(
  from: number,
  to: number,
  length: number,
  opts?: GenerationOpts
): number[] {
  const { sorted = false, unique = true } = { ...defaultGenOpts, ...opts };

  const data = Array(length)
    .fill(null)
    .map((i) => from + Math.floor((to - from) * Math.random()));

  if (sorted) {
    data.sort();
  }

  return data;
}

const LETTERS: string[] = [];
for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
  LETTERS.push(String.fromCharCode(i));
}

export const generateRandomLetter = () =>
  LETTERS[Math.floor(Math.random() * LETTERS.length)];

export const generateRandomLetters = (
  length: number,
  opts?: GenerationOpts
) => {
  const { sorted = false, unique = true } = { ...defaultGenOpts, ...opts };

  const data = Array(length).fill(null).map(generateRandomLetter);
  if (sorted) {
    data.sort();
  }
  return data;
};
