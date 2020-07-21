import { NO_MATCH } from "./common";
import { MatchComparator, SearchFunction } from "../types";

/**
 * perform a linear search on an array
 *
 * @param {array} data The array
 * @param {function} compare Accepts each item and
 *  returns 0 if its a match,
 * -ve if the item is 'less than'
 * +ve if item is 'greater than'
 * @return {object} The matching item in the array
 */
const linearSearch: SearchFunction = <T>(
  data: T[],
  compare: MatchComparator<T>
): number => {
  for (let i = 0; i < data.length; i++) {
    if (compare(data[i]) === 0) {
      return i;
    }
  }

  return NO_MATCH;
};

export default linearSearch;
