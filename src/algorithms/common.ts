import { Comparator } from "./types";

function swap<T>(arr: T[], from: number, to: number) {
  const swapItem: T = arr[from];
  arr[from] = arr[to];
  arr[to] = swapItem;
}

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
const arithmeticComparator: Comparator<number> = (a: number, b: number) =>
  a - b;

const stringComparator: Comparator<string> = (a: string, b: string) =>
  a.localeCompare(b);

/**
 * Generate a list of random numbers in array of given length
 * @param {number} length
 * @return {array} the list of random numbers
 */
function generateRandomNumbers(
  from: number,
  to: number,
  length: number
): number[] {
  return Array(length)
    .fill(null)
    .map((i) => from + Math.floor((to - from) * Math.random()));
}

export { swap, arithmeticComparator, stringComparator, generateRandomNumbers };
