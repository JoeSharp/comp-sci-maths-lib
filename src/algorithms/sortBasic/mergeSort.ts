function mergeSort<T>(
  inputList: T[],
  leftPointer: number,
  rightPointer: number
): T[] {
  if (leftPointer === rightPointer) {
    return [inputList[leftPointer]];
  }

  // Calculate the mid point
  const middle = Math.floor((leftPointer + rightPointer) / 2);

  // Recurse sort both halves to yield the two lists to merge
  const firstHalf = mergeSort(inputList, leftPointer, middle);
  const secondHalf = mergeSort(inputList, middle + 1, rightPointer);

  // Merge the two halves into a single sorted list
  const outputList = [];
  let firstPtr = 0;
  let secondPtr = 0;
  while (firstPtr < firstHalf.length && secondPtr < secondHalf.length) {
    // Comparator returns +ve if the second item is larger than first
    if (firstHalf[firstPtr] > secondHalf[secondPtr]) {
      outputList.push(secondHalf[secondPtr]);
      secondPtr += 1;
    } else {
      outputList.push(firstHalf[firstPtr]);
      firstPtr += 1;
    }
  }

  // Push any stragglers from whichever list has items remaining
  firstHalf.filter((_, i) => i >= firstPtr).forEach((i) => outputList.push(i));
  secondHalf
    .filter((_, i) => i >= secondPtr)
    .forEach((i) => outputList.push(i));

  return outputList;
}

export default <T>(inputList: T[]): T[] => {
  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  const outputList: T[] = mergeSort(inputList, 0, inputList.length - 1);

  return outputList;
};
