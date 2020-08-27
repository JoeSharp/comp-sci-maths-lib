import bubbleSort from "../bubbleSort/monitored";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import insertionSort from "./insertionSort";
import { NamedSort } from "../../../types";

const algorithms: NamedSort[] = [
  { name: "Bubble Sort", sort: bubbleSort },
  {
    name: "Merge Sort",
    sort: mergeSort,
  },
  { name: "Insertion Sort", sort: insertionSort },
  { name: "Quick Sort", sort: quickSort },
];
export default algorithms;
