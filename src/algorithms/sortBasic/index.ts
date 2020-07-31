import bubbleSort from "./bubbleSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import insertionSort from "./insertionSort";
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
