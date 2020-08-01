import { BasicNamedSearch } from "./types";

import binarySearch from "./binarySearch";
import linearSearch from "./linearSearch";

const algorithms: BasicNamedSearch[] = [
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
