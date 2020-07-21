export type SortFunction = <T>(
  inputList: T[],
  comparator: (a: T, b: T) => number
) => T[];
