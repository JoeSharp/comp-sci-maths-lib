function bubbleSort(inputList) {
  const outputList = [...inputList];

  for (let top = outputList.length - 1; top > 0; top--) {
    // Use this variable to exit early
    let anySwapsMade = false;

    // Work our way from start of list to just before end of 'top'
    for (let current = 0; current < top; current++) {
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
}

export default bubbleSort;
