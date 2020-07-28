import { Comparator, SortObserver } from "../../types";
import { EMPTY_OBSERVER } from "../../common";
import { swap } from "../common";
import { STARTING, FINISHED, NEXT_ITERATION, MAKING_SWAP } from "./common";

const bubbleSort = <T>(
  inputList: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T> = EMPTY_OBSERVER
): T[] => {
  const outputList: T[] = [...inputList];

  observe(STARTING, outputList, {});

  for (let top: number = outputList.length - 1; top > 0; top--) {
    observe(NEXT_ITERATION, outputList, { top });
    let anySwapsMade = false;
    for (let current: number = 0; current < top; current++) {
      observe("Bubbling", outputList, { top, current });
      if (comparator(outputList[current], outputList[current + 1]) > 0) {
        observe(MAKING_SWAP, outputList, {
          top,
          current,
          a: current,
          b: current + 1,
        });
        swap(outputList, current, current + 1);
        anySwapsMade = true;
      }
    }

    if (!anySwapsMade) break;
  }

  observe(FINISHED, outputList, {});

  return outputList;
};

export default bubbleSort;
