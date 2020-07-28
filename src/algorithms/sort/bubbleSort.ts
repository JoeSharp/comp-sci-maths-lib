import { SortUtility } from "../../types";
import { simpleSwap, emptyObserver, anyComparator } from "../common";

export default <T>(
  inputList: T[],
  {
    comparator = anyComparator,
    observe = emptyObserver,
    swap = simpleSwap,
  }: SortUtility<T>
): T[] => {
  const outputList: T[] = [...inputList];

  for (let top: number = outputList.length - 1; top > 0; top--) {
    observe("Iterating Top Value", outputList, { top });
    let anySwapsMade = false;
    for (let current: number = 0; current < top; current++) {
      observe("Bubbling", outputList, { top, current });
      if (comparator(outputList[current], outputList[current + 1]) > 0) {
        swap(outputList, current, current + 1);
        anySwapsMade = true;
      }
    }

    if (!anySwapsMade) break;
  }

  return outputList;
};
