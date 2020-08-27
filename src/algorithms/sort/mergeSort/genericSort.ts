import { Comparator } from "../../../types";
import { anyComparator } from "../../../common";

function mergeSortR<T>(
  inputList: T[],
  comparator: Comparator<T> = anyComparator, // fall back to the default if no comparison specified
  leftPointer?: number,
  rightPointer?: number,
): T[] {

  // Have we reached the bottom of our recursion? This is the exit condition!
  if (leftPointer === rightPointer) {
    return [inputList[leftPointer]];
  }

  // Calculate the mid point
  const middle: number = Math.floor((leftPointer + rightPointer) / 2);

  // Recurse sort both halves to yield the two lists to merge
  const firstHalf: T[] = mergeSortR(inputList, comparator, leftPointer, middle);
  const secondHalf: T[] = mergeSortR(inputList, comparator, middle + 1, rightPointer);

  // Merge the two halves into a single sorted list
  const outputList: T[] = [];
  let firstPtr: number = 0;
  let secondPtr: number = 0;
  while (firstPtr < firstHalf.length && secondPtr < secondHalf.length) {
    // Comparator returns +ve if the second item is larger than first
    if (comparator(firstHalf[firstPtr], secondHalf[secondPtr]) > 0) {
      outputList.push(secondHalf[secondPtr]);
      secondPtr += 1;
    } else {
      outputList.push(firstHalf[firstPtr]);
      firstPtr += 1;
    }
  }

  // Push any stragglers from whichever list has items remaining
  firstHalf.filter((_, i) => i >= firstPtr).forEach((i) => outputList.push(i));
  secondHalf
    .filter((_, i) => i >= secondPtr)
    .forEach((i) => outputList.push(i));

  return outputList;
}

function mergeSort<T>(inputList: T[], comparator: Comparator<T>): T[] {

  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  return mergeSortR(inputList, comparator, 0, inputList.length - 1)
}

export default mergeSort;
