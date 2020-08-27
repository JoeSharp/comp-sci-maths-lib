function insertionSort(inputList)[] {
  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  // Don't modify the input, take a copy
  const outputList = [...inputList];

  for (let index = 1; index < outputList.length; index++) {
    let itemPlace = index;
    while (itemPlace > 0) {
      const lower = itemPlace - 1;
      const upper = itemPlace;

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