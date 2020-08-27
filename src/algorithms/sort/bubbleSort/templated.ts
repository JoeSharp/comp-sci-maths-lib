import { anyComparator } from "../../../common";

export type CompareFunction<T> = (a: T, b: T) => number;

function bubbleSort<T>(
  inputList: T[],
  compare: CompareFunction<T> = anyComparator // fall back to the default if no comparison specified
): T[] {
  const outputList: T[] = [...inputList];
  for (let top: number = outputList.length - 1; top > 0; top--) {
    // Use this variable to exit early
    let anySwapsMade = false;
    for (let current: number = 0; current < top; current++) {
      if (compare(outputList[current], outputList[current + 1]) > 0) {
        // Handle the swap
        const swap = outputList[current];
        outputList[current] = outputList[current + 1];
        outputList[current + 1] = swap;
        anySwapsMade = true;
      }
    }

    if (!anySwapsMade) break;
  }

  return outputList;
}

export default bubbleSort;
