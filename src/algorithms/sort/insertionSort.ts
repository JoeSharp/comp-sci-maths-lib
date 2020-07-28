import { Comparator, SortObserver } from "../../types";
import { EMPTY_OBSERVER } from "../../common";
import { swap } from "../common";
import { FINISHED, STARTING, MAKING_SWAP } from "./common";

const insertionSort = <T>(
  inputList: T[],
  comparator: Comparator<T>,
  observe: SortObserver<T> = EMPTY_OBSERVER
): T[] => {
  observe(STARTING, inputList, {}, {});

  if (inputList.length < 2) {
    return inputList;
  }

  // Don't modify the input
  const outputList = [...inputList];

  for (let index = 1; index < outputList.length; index++) {
    observe("Placing Item", outputList, { index }, {});
    let itemPlace = index;
    while (itemPlace > 0) {
      const lower = itemPlace - 1;
      const upper = itemPlace;

      observe(
        "Seeking Place",
        outputList,
        {
          index,
          lower,
          upper,
        },
        {}
      );

      const comparison: number = comparator(
        outputList[lower],
        outputList[upper]
      );

      // The comparator returns -ve if the first item is 'greater than' the second one
      if (comparison > 0) {
        observe(
          MAKING_SWAP,
          outputList,
          {
            index,
            lower,
            upper,
          },
          {}
        );

        // Temporary variable to prevent overwrites
        swap(outputList, lower, upper);
      } else {
        itemPlace = upper;
        break;
      }

      itemPlace -= 1;
    }
  }

  observe(FINISHED, outputList, {}, {});

  return outputList;
};

export default insertionSort;
