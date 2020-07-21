import { Comparator } from "../../types";
import { swap } from "../common";

const insertionSort = <T>(inputList: T[], comparator: Comparator<T>): T[] => {
  if (inputList.length < 2) {
    return inputList;
  }

  // Don't modify the input
  const outputList = [...inputList];

  for (let index = 1; index < outputList.length; index++) {
    const itemToPlace: T = outputList[index];
    let itemPlace = index;
    while (itemPlace > 0) {
      const lower = itemPlace - 1;
      const upper = itemPlace;

      const comparison: number = comparator(
        outputList[lower],
        outputList[upper]
      );

      // The comparator returns -ve if the first item is 'greater than' the second one
      if (comparison > 0) {
        // Temporary variable to prevent overwrites
        swap(outputList, lower, upper);
      } else {
        itemPlace = upper;
        break;
      }

      itemPlace -= 1;
    }
  }

  return outputList;
};

export default insertionSort;
