/*
    This code was lifted from
    https://www.geeksforgeeks.org/quick-sort/

    And converted from pseudo code to JavaScript.
*/
import { Comparator, SortObserver, EMPTY_OBSERVER } from "../../types";
import { swap } from "../common";

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition<T>(
  arr: T[],
  comparator: Comparator<T>,
  low: number,
  high: number
) {
  // pivot (Element to be placed at right position)
  const pivot: T = arr[high];

  let i = low - 1; // Index of smaller element

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (comparator(arr[j], pivot) < 0) {
      i++; // increment index of smaller element
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
  if (low < high) {
    /* pi is partitioning index, arr[pi] is now
           at right place */
    const pi: number = partition(arr, comparator, low, high);

    quickSortRecurse(arr, comparator, observe, low, pi - 1); // Before pi
    quickSortRecurse(arr, comparator, observe, pi + 1, high); // After pi
  }
}

const quickSort = <T>(
  inputList: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T> = EMPTY_OBSERVER
): T[] => {
  if (inputList.length < 2) {
    return inputList;
  }

  const outputList = [...inputList];

  quickSortRecurse(outputList, comparator, observe, 0, inputList.length - 1);

  return outputList;
};

export default quickSort;
