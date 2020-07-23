import { SearchFunction } from "../../types";

import binarySearch from "./binarySearch";
import linearSearch from "./linearSearch";

interface NamedSearch {
  name: string;
  search: SearchFunction;
}

const algorithms: NamedSearch[] = [
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
