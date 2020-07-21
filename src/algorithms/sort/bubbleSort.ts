import { SortFunction } from "../types";
import { swap } from "../common";

const bubbleSort: SortFunction = <T>(
  inputList: T[],
  comparator: (a: T, b: T) => number
): T[] => {
  const outputList: T[] = [...inputList];

  for (let top: number = outputList.length - 1; top > 0; top--) {
    let anySwapsMade = false;
    for (let current: number = 0; current < top; current++) {
      if (comparator(outputList[current], outputList[current + 1]) > 0) {
        swap(outputList, current, current + 1);
        anySwapsMade = true;
      }
    }

    if (!anySwapsMade) break;
  }

  return outputList;
};

export default bubbleSort;
