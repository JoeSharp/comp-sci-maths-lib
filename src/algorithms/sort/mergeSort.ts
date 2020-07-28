import { SortUtility } from "../../types";
import { simpleSwap, emptyObserver, anyComparator } from "../common";

function mergeSort<T>(
  inputList: T[],
  utilities: SortUtility<T>,
  leftPointer: number,
  rightPointer: number
): T[] {
  if (leftPointer === rightPointer) {
    return [inputList[leftPointer]];
  }

  const {
    comparator = anyComparator,
    observe = emptyObserver,
    swap = simpleSwap,
  } = utilities;

  // Calculate the mid point
  const middle = Math.floor((leftPointer + rightPointer) / 2);

  // Recurse sort both halves to yield the two lists to merge
  const firstHalf = mergeSort(inputList, utilities, leftPointer, middle);
  const secondHalf = mergeSort(
    [
      // The observer needs to see how the list is shaping up, so pass in the sorted first half
      ...inputList.slice(0, leftPointer),
      ...firstHalf,
      ...inputList.slice(middle + 1),
    ],
    utilities,
    middle + 1,
    rightPointer
  );
  observe(
    "Recursing",
    [
      // The observer needs to see how the list is shaping up
      ...inputList.slice(0, leftPointer),
      ...firstHalf,
      ...secondHalf,
      ...inputList.slice(rightPointer + 1),
    ],
    { leftPointer, rightPointer, middle }
  );

  // Merge the two halves into a single sorted list
  const outputList = [];
  let firstPtr = 0;
  let secondPtr = 0;
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

export default <T>(inputList: T[], utilities: SortUtility<T>): T[] => {
  if (inputList.length < 2) {
    return inputList;
  }

  const outputList: T[] = mergeSort(
    inputList,
    utilities,
    0,
    inputList.length - 1
  );

  return outputList;
};
