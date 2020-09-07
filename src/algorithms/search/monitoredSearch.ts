import { NamedSearch } from "../../types";

import binarySearch from "./binarySearch/monitoredSearch";
import linearSearch from "./linearSearch/monitoredSearch";

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
