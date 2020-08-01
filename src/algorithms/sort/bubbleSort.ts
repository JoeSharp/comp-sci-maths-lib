export default <T>(inputList: T[]): T[] => {
  const outputList: T[] = [...inputList];

  for (let top: number = outputList.length - 1; top > 0; top--) {
    // Use this variable to exit early
    let anySwapsMade = false;
    for (let current: number = 0; current < top; current++) {
      if (outputList[current] > outputList[current + 1]) {
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
};
