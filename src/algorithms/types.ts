export type Comparator<T> = (a: T, b: T) => number;

export type SortFunction = <T>(
  inputList: T[],
  comparator: Comparator<T>
) => T[];
