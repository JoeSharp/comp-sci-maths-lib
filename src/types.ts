export type MatchFunction<T> = (a: T) => boolean;

export type Optional<T> = T | undefined;

export type Comparator<T> = (a: T, b: T) => number;

export type SortFunction = <T>(
  inputList: T[],
  comparator: Comparator<T>
) => T[];

export type MatchComparator<T> = (a: T) => number;

export type SearchFunction = <T>(
  inputList: T[],
  match: MatchComparator<T>
) => number;
