import { Comparator, SortObserver, EMPTY_OBSERVER } from "../../types";
import { swap } from "../common";

const bubbleSort = <T>(
  inputList: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T> = EMPTY_OBSERVER
): T[] => {
  const outputList: T[] = [...inputList];

  for (let top: number = outputList.length - 1; top > 0; top--) {
    observe("New Iteration", outputList, { top });
    let anySwapsMade = false;
    for (let current: number = 0; current < top; current++) {
      observe("Inner Loop", outputList, { top, current });
      if (comparator(outputList[current], outputList[current + 1]) > 0) {
        observe("Making Swap", outputList, { top, current });
        swap(outputList, current, current + 1);
        anySwapsMade = true;
      }
    }

    if (!anySwapsMade) break;
  }

  return outputList;
};

export default bubbleSort;
