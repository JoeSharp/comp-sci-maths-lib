import { SortUtility } from "../../types";
import { emptyObserver, anyComparator } from "../common";

function mergeSort<T>(
  inputList: T[],
  utilities: SortUtility<T>,
  leftPointer?: number,
  rightPointer?: number
): T[] {
  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  if (leftPointer === undefined) {
    leftPointer = 0;
  }
  if (rightPointer === undefined) {
    rightPointer = inputList.length - 1;
  }

  if (leftPointer === rightPointer) {
    return [inputList[leftPointer]];
  }

  const { compare = anyComparator, observe = emptyObserver } = utilities;

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
    if (
      compare(firstHalf[firstPtr], secondHalf[secondPtr], {
        aIndex: firstPtr,
        bIndex: secondPtr,
      }) > 0
    ) {
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

export default mergeSort;
