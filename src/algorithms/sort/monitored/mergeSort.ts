import { SortUtility, SplitList } from "../../../types";
import {
  emptyObserver,
  anyComparator,
  ROOT_RECURSION_KEY,
} from "../../../common";

function mergeSort<T>(
  inputList: T[],
  utilities: SortUtility<T>,
  leftPointer?: number,
  rightPointer?: number,
  recurseKey: string = ROOT_RECURSION_KEY
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

  const {
    compare = anyComparator,
    observe = emptyObserver,
    split = emptyObserver,
    join = emptyObserver,
  } = utilities;

  // Calculate the mid point
  const middle = Math.floor((leftPointer + rightPointer) / 2);

  const listA: SplitList<T> = {
    key: recurseKey + "-a",
    data: inputList.slice(leftPointer, middle),
  };
  const listB: SplitList<T> = {
    key: recurseKey + "-b",
    data: inputList.slice(middle, rightPointer + 1),
  };
  observe("Recursing", inputList, { leftPointer, rightPointer, middle });
  split(recurseKey, listA, listB);

  // Recurse sort both halves to yield the two lists to merge
  const firstHalf = mergeSort(
    inputList,
    utilities,
    leftPointer,
    middle,
    listA.key
  );
  const secondHalf = mergeSort(
    inputList,
    utilities,
    middle + 1,
    rightPointer,
    listB.key
  );

  // Merge the two halves into a single sorted list
  const outputList = [];
  let firstPtr = 0;
  let secondPtr = 0;
  while (firstPtr < firstHalf.length && secondPtr < secondHalf.length) {
    // Comparator returns +ve if the second item is larger than first
    if (
      compare(firstHalf[firstPtr], secondHalf[secondPtr], {
        aIndex: leftPointer + firstPtr,
        bIndex: middle + secondPtr,
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
  join(recurseKey, listA.key, listB.key, outputList);

  return outputList;
}

export default mergeSort;
