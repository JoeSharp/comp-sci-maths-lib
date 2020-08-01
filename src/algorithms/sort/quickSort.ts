/*
    This code was lifted from
    https://www.geeksforgeeks.org/quick-sort/

    And converted from pseudo code to JavaScript.
*/

/**
 * Partitions a list around a pivot.
 *
 * @param arr The data to sort
 * @param low The lower bound of the sorting
 * @param high The upper bound of the sorting
 * @return The position that the list ended up pivoted around
 */
function partition<T>(arr: T[], low: number, high: number) {
  // pivot (Element to be placed at right position)
  const pivot: T = arr[high];

  let i = low - 1; // Index of smaller element

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
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

function quickSort<T>(arr: T[], low: number, high: number) {
  if (low < high) {
    /* pi is partitioning index, arr[pi] is now
           at right place */
    const pi: number = partition(arr, low, high);

    quickSort(arr, low, pi - 1); // Before pi
    quickSort(arr, pi + 1, high); // After pi
  }
}

export default <T>(inputList: T[]): T[] => {
  // Make a copy, don't change input list
  const outputList = [...inputList];

  // This function recursively operates on the data in place
  quickSort(outputList, 0, inputList.length - 1);

  return outputList;
};
