import { NO_MATCH } from "./common";
import { MatchComparator, SearchFunction, SearchObserver } from "../../types";
import { EMPTY_OBSERVER } from "../../common";

// https://www.geeksforgeeks.org/binary-search/
function binarySearchRecurse<T>(
  data: T[],
  compare: MatchComparator<T>,
  observe: SearchObserver<T>,
  left: number,
  right: number
): number {
  if (right >= left) {
    const mid = Math.floor(left + (right - left) / 2);
    observe(mid, data[mid], { left, right, mid });

    const compareMid = compare(data[mid]);

    // If the element is present in the middle itself
    if (compareMid === 0) {
      return mid;
    } else if (compareMid < 0) {
      // If element is smaller than mid, then
      // it can only be present in left subarray
      return binarySearchRecurse(data, compare, observe, left, mid - 1);
    } else {
      // Else the element can only be present
      // in right subarray
      return binarySearchRecurse(data, compare, observe, mid + 1, right);
    }
  }

  return NO_MATCH;
}

/**
 * perform a binary search on an array
 *
 * @param {array} data The array
 * @param {function} compare Accepts each item and
 *  returns 0 if its a match,
 * -ve if the item is 'less than'
 * +ve if item is 'greater than'
 * @return {object} The index of the matching item
 */
const binarySearch: SearchFunction = <T>(
  data: T[],
  compare: MatchComparator<T>,
  observe: SearchObserver<T> = EMPTY_OBSERVER
) => binarySearchRecurse(data, compare, observe, 0, data.length - 1);

export default binarySearch;
