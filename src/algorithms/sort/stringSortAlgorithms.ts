import bubbleSort from "./bubbleSort/stringSort";
import mergeSort from "./mergeSort/stringSort";
import quickSort from "./quickSort/stringSort";
import insertionSort from "./insertionSort/stringSort";
import { NamedBasicSort } from "./types";

const algorithms: NamedBasicSort[] = [
  { name: "Bubble Sort", sort: bubbleSort },
  {
    name: "Merge Sort",
    sort: mergeSort,
  },
  { name: "Insertion Sort", sort: insertionSort },
  { name: "Quick Sort", sort: quickSort },
];
export default algorithms;
