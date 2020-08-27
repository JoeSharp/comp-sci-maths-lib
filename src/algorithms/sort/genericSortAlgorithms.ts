import bubbleSort from "./bubbleSort/genericSort";
import mergeSort from "./mergeSort/genericSort";
import quickSort from "./quickSort/genericSort";
import insertionSort from "./insertionSort/genericSort";
import { NamedGenericSort } from "./types";

const algorithms: NamedGenericSort[] = [
  { name: "Bubble Sort", sort: bubbleSort },
  {
    name: "Merge Sort",
    sort: mergeSort,
  },
  { name: "Insertion Sort", sort: insertionSort },
  { name: "Quick Sort", sort: quickSort },
];
export default algorithms;
