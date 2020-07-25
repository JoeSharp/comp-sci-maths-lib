import { Comparator, SortObserver } from "../../types";
import { EMPTY_OBSERVER } from "../../common";

function mergeSortRecurse<T>(
  inputList: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T>,
  leftPointer: number,
  rightPointer: number
): T[] {
  observe("Recursing", inputList, { leftPointer, rightPointer });

  if (leftPointer === rightPointer) {
    return [inputList[leftPointer]];
  }

  // Calculate the mid point
  const middle = Math.floor((leftPointer + rightPointer) / 2);

  // Recurse sort both halves to yield the two lists to merge
  const firstHalf = mergeSortRecurse(
    inputList,
    comparator,
    observe,
    leftPointer,
    middle
  );
  const secondHalf = mergeSortRecurse(
    inputList,
    comparator,
    observe,
    middle + 1,
    rightPointer
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

const mergeSort = <T>(
  inputList: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T> = EMPTY_OBSERVER
): T[] => {
  if (inputList.length < 2) {
    return inputList;
  }

  return mergeSortRecurse(
    inputList,
    comparator,
    observe,
    0,
    inputList.length - 1
  );
};

export default mergeSort;