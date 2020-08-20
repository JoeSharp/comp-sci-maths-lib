/*
    This code was lifted from
    https://www.geeksforgeeks.org/quick-sort/

    And converted from pseudo code to JavaScript.
*/
import { SortUtility } from "../../../types";
import { simpleSwap, emptyObserver, anyComparator } from "../../../common";

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition<T>(
  arr: T[],
  utilities: SortUtility<T>,
  low: number,
  high: number
) {
  const {
    compare = anyComparator,
    observe = emptyObserver,
    swap = simpleSwap,
  } = utilities;

  // pivot (Element to be placed at right position)
  const pivot: T = arr[high];

  let i = low - 1; // Index of smaller element

  for (let j = low; j <= high - 1; j++) {
    observe("Partioning", arr, { pivot: high, low, high, i, j });

    // If current element is smaller than the pivot
    if (compare(arr[j], pivot, { aIndex: j, bIndex: high }) < 0) {
      i++; // increment index of smaller element
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, high);
  return i + 1;
}

function quickSort<T>(
  arr: T[],
  utilities: SortUtility<T>,
  low: number,
  high: number
) {
  const { observe = emptyObserver } = utilities;

  observe("Recursing", arr, { low, high });

  if (low < high) {
    /* pi is partitioning index, arr[pi] is now
           at right place */
    const pi: number = partition(arr, utilities, low, high);

    quickSort(arr, utilities, low, pi - 1); // Before pi
    quickSort(arr, utilities, pi + 1, high); // After pi
  }
}

export default <T>(inputList: T[], utilities: SortUtility<T>): T[] => {
  if (inputList.length < 2) {
    return inputList;
  }

  // Make a copy, don't change input list
  const outputList = [...inputList];

  // This function recursively operates on the data in place
  quickSort(outputList, utilities, 0, inputList.length - 1);

  return outputList;
};
