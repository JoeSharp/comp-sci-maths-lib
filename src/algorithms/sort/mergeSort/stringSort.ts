function mergeSortR(
  inputList: string[],
  leftPointer?: number,
  rightPointer?: number
): string[] {
  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  // Is this the first run into the function?
  if (leftPointer === undefined) {
    leftPointer = 0;
  }
  if (rightPointer === undefined) {
    rightPointer = inputList.length - 1;
  }

  // Have we reached the bottom of our recursion? This is the exit condition!
  if (leftPointer === rightPointer) {
    return [inputList[leftPointer]];
  }

  // Calculate the mid point
  const middle: number = Math.floor((leftPointer + rightPointer) / 2);

  // Recurse sort both halves to yield the two lists to merge
  const firstHalf: string[] = mergeSortR(inputList, leftPointer, middle);
  const secondHalf: string[] = mergeSortR(inputList, middle + 1, rightPointer);

  // Merge the two halves into a single sorted list
  const outputList: string[] = [];
  let firstPtr: number = 0;
  let secondPtr: number = 0;
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

function mergeSort(inputList: string[]): string[] {

  // Is it worth sorting?
  if (inputList.length < 2) {
    return inputList;
  }

  return mergeSortR(inputList, 0, inputList.length - 1)
}


export default mergeSort;
