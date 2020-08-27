import bubbleSort from "./bubbleSort/monitoredSort";
import mergeSort from "./mergeSort/monitoredSort";
import quickSort from "./quickSort/monitoredSort";
import insertionSort from "./insertionSort/monitoredSort";
import { NamedCustomisableSort } from "./types";

const algorithms: NamedCustomisableSort[] = [
  { name: "Bubble Sort", sort: bubbleSort },
  {
    name: "Merge Sort",
    sort: mergeSort,
  },
  { name: "Insertion Sort", sort: insertionSort },
  { name: "Quick Sort", sort: quickSort },
];
export default algorithms;
