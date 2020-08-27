/*
    This code was lifted from
    https://www.geeksforgeeks.org/quick-sort/

    And converted from pseudo code to JavaScript.
*/

import { Comparator } from "../../../types";
import { anyComparator } from "../../../common";

/**
 * Partitions a list around a pivot.
 *
 * @param arr The data to sort
 * @param low The lower bound of the sorting
 * @param high The upper bound of the sorting
 * @return The position that the list ended up pivoted around
 */
function partition<T>(arr: T[], comparator: Comparator<T>, low: number, high: number) {
  // pivot (Element to be placed at right position)
  const pivot: T = arr[high];

  let i = low - 1; // Index of smaller element

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (comparator(arr[j], pivot) < 0) {
      i++; // increment index of smaller element
      const swap = arr[i];
      arr[i] = arr[j];
      arr[j] = swap;
    }
  }

  // Swap the pivot to get it into the right place
  const swapPivot = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = swapPivot;

  return i + 1;
}

/**
 * Recursive form of the quick sort, this expects the various quick sort parameters to be setup.
 * It then calls itself until it is dealing with a one item list.
 * 
 * @param arr The input array to sort, this function DOES modify the array
 * @param comparator THe function that can compare the items in this list
 * @param low Pointer to low point of this division of the list
 * @param high Pointer to high point of this division of the list
 */
function quickSortR<T>(arr: T[], comparator: Comparator<T>, low: number, high: number) {
  if (low < high) {
    /* pi is partitioning index, arr[pi] is now
           at right place */
    const pi: number = partition(arr, comparator, low, high);

    quickSortR(arr, comparator, low, pi - 1); // Before pi
    quickSortR(arr, comparator, pi + 1, high); // After pi
  }
}

/**
 * The entry point for the quick sort algorithm.
 * 
 * @param inputList The list to sort, this function does not modify this list
 * @param utilities The various comparison/swapping uility functions required by observers.
 */
function quickSort<T>(inputList: T[], comparator: Comparator<T> = anyComparator): T[] {
  // Make a copy, don't change input list
  const outputList = [...inputList];

  // This function recursively operates on the data in place
  quickSortR(outputList, comparator, 0, inputList.length - 1);

  return outputList;
};


export default quickSort;