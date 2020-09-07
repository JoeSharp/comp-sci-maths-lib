import { NO_MATCH } from "../common";

/**
 * perform a linear search on an array
 *
 * @param {array} data The array
 * @param {function} match Accepts each item and
 *  returns 0 if its a match,
 * -ve if the item is 'less than'
 * +ve if item is 'greater than'
 * @return {object} The matching item in the array
 */
function linearSearch(data, match) {
  for (let i = 0; i < data.length; i++) {
    if (match(data[i]) === 0) {
      return i;
    }
  }

  return NO_MATCH;
}

export default linearSearch;
