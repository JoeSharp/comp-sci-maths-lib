import { NO_MATCH } from "./common";
import { SearchUtilities } from "../../../types";
import { emptyObserver } from "../../../common";

/**
 * Executes a binary search
 *
 * Based on pseudocode from
 * https://www.geeksforgeeks.org/binary-search/
 *
 * @param data The data to search through
 * @param match A function that can be used to compare any item with our criteria
 * @param left The left pointer, bounds this segment (part of the recursion)
 * @param right The right pointer, bounds this segment (part of the recursion)
 */
function binarySearch<T>(
  data: T[],
  utilities: SearchUtilities<T>,
  left?: number,
  right?: number
): number {
  if (left === undefined) {
    left = 0;
  }
  if (right === undefined) {
    right = data.length - 1;
  }

  const { observe = emptyObserver, match } = utilities;

  if (right >= left) {
    const mid = Math.floor(left + (right - left) / 2);
    observe("Recursing", { left, right, mid });

    const compareMid: number = match(data[mid], mid);

    // If the element is present in the middle itself
    if (compareMid === 0) {
      return mid;
    } else if (compareMid < 0) {
      // If element is smaller than mid, then
      // it can only be present in left subarray
      return binarySearch(data, utilities, left, mid - 1);
    } else {
      // Else the element can only be present
      // in right subarray
      return binarySearch(data, utilities, mid + 1, right);
    }
  }

  return NO_MATCH;
}

export default binarySearch;
