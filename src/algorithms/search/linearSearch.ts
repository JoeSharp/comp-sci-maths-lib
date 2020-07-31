import { NO_MATCH } from "./common";
import { SearchFunction, SearchUtilities } from "../../types";
import { emptyObserver } from "../common";

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
export default <T>(
  data: T[],
  { match, observe = emptyObserver }: SearchUtilities<T>
): number => {
  for (let i = 0; i < data.length; i++) {
    observe("Looking", { i });
    if (match(data[i], i) === 0) {
      return i;
    }
  }

  return NO_MATCH;
};
