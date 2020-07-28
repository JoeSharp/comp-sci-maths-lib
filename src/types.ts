export type MatchFunction<T> = (a: T) => boolean;

export type Optional<T> = T | undefined;

export type Comparator<T> = (a: T, b: T) => number;

export type VisitFunction<T> = (n: T) => any;

export interface PositionVars {
  [k: string]: number;
}

export interface WorkingLists<T> {
  [k: string]: T[];
}

export type SortObserver<T> = (
  stageName: string,
  data: T[],
  positionVars: PositionVars,
  workingLists: WorkingLists<T>
) => void;

// Sorting
export type SortFunction<T> = (
  inputList: T[],
  comparator: Comparator<T>,
  observe?: SortObserver<T>
) => T[];

export interface NamedSort {
  name: string;
  sort: SortFunction<any>;
}

// Searching
export type MatchComparator<T> = (a: T) => number;

export type SearchObserver<T> = (
  index: number,
  value: T,
  positionVars?: PositionVars
) => void;

export type SearchFunction = <T>(
  inputList: T[],
  match: MatchComparator<T>,
  observe?: SearchObserver<T>
) => number;

export interface NamedSearch {
  name: string;
  search: SearchFunction;
}
