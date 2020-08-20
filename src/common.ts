import * as winston from "winston";
import { EqualityCheck, ToString, Comparator, IDataStructure } from "./types";
import { uniq } from "lodash";

export const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export const defaultEqualityCheck: EqualityCheck<any> = (a: any, b: any) =>
  a === b;
export const defaultToString: ToString<any> = (a) => `${a}`;

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

export function fisherYatesShuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

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

  let data: number[];
  if (unique) {
    data = Array(length)
      .fill(null)
      .map((i) => from + i);
    fisherYatesShuffle(data);
  } else {
    data = Array(length)
      .fill(null)
      .map((i) => from + Math.floor((to - from) * Math.random()));
  }

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

export class DataStructure implements IDataStructure {
  version: number;
  tickObserver: () => any;

  constructor() {
    this.version = 0;
    this.tickObserver = emptyObserver;
  }

  setTickObserver(tickObserver: () => any) {
    this.tickObserver = tickObserver;
  }

  tickVersion() {
    this.version += 1;
    this.tickObserver();
  }
}

export const generateRandomLetters = (
  length: number,
  opts?: GenerationOpts
): string[] => {
  const { sorted = false, unique = true } = { ...defaultGenOpts, ...opts };

  let data: string[] = [];

  if (unique) {
    data = Array(length)
      .fill(null)
      .map((_, i) => LETTERS[i]);
    fisherYatesShuffle(data);
  } else {
    data = Array(length).fill(null).map(generateRandomLetter);
  }
  if (sorted) {
    data.sort();
  }
  return data;
};
