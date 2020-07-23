import { NO_MATCH } from "./common";
import {
  MatchComparator,
  SearchFunction,
  SearchObserver,
  EMPTY_OBSERVER,
} from "../../types";

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
  compare: MatchComparator<T>,
  observe: SearchObserver<T> = EMPTY_OBSERVER
): number => {
  for (let i = 0; i < data.length; i++) {
    observe(i, data[i]);
    if (compare(data[i]) === 0) {
      return i;
    }
  }

  return NO_MATCH;
};

export default linearSearch;
