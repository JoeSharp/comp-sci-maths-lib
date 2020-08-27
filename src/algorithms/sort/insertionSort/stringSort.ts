function insertionSort(inputList: string[]): string[] {
  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  // Don't modify the input, take a copy
  const outputList: string[] = [...inputList];

  for (let index = 1; index < outputList.length; index++) {
    let itemPlace: number = index;
    while (itemPlace > 0) {
      const lower: number = itemPlace - 1;
      const upper: number = itemPlace;

      if (outputList[lower] > outputList[upper]) {
        // Temporary variable to prevent overwrites
        const swap = outputList[lower];
        outputList[lower] = outputList[upper];
        outputList[upper] = swap;
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