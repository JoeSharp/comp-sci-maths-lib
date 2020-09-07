import { NamedGenericSearchFunction } from "./types";

import binarySearch from "./binarySearch/genericSearch";
import linearSearch from "./linearSearch/genericSearch";

const algorithms: NamedGenericSearchFunction[] = [
  {
    name: "Binary Search",
    search: binarySearch,
  },
  {
    name: "Linear Search",
    search: linearSearch,
  },
];

export default algorithms;
