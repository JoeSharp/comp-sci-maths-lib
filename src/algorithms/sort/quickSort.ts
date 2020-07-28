/*
    This code was lifted from
    https://www.geeksforgeeks.org/quick-sort/

    And converted from pseudo code to JavaScript.
*/
import { Comparator, SortObserver } from "../../types";
import { swap } from "../common";
import { EMPTY_OBSERVER } from "../../common";
import { FINISHED, STARTING, RECURSING, MAKING_SWAP } from "./common";

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition<T>(
  arr: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T>,
  low: number,
  high: number
) {
  // pivot (Element to be placed at right position)
  const pivot: T = arr[high];

  let i = low - 1; // Index of smaller element

  for (let j = low; j <= high - 1; j++) {
    observe("Partioning", arr, { pivot: high, low, high, i, j }, {});

    // If current element is smaller than the pivot
    if (comparator(arr[j], pivot) < 0) {
      i++; // increment index of smaller element
      observe(MAKING_SWAP, arr, { low, high, i, j }, {});
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

function quickSortRecurse<T>(
  arr: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T>,
  low: number,
  high: number
) {
  observe(RECURSING, arr, { low, high }, {});

  if (low < high) {
    /* pi is partitioning index, arr[pi] is now
           at right place */
    const pi: number = partition(arr, comparator, observe, low, high);

    quickSortRecurse(arr, comparator, observe, low, pi - 1); // Before pi
    quickSortRecurse(arr, comparator, observe, pi + 1, high); // After pi
  }
}

const quickSort = <T>(
  inputList: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T> = EMPTY_OBSERVER
): T[] => {
  observe(STARTING, inputList, {}, {});

  if (inputList.length < 2) {
    return inputList;
  }

  // Make a copy, don't change input list
  const outputList = [...inputList];

  // This function recursively operates on the data in place
  quickSortRecurse(outputList, comparator, observe, 0, inputList.length - 1);

  observe(FINISHED, outputList, {}, {});

  return outputList;
};

export default quickSort;
