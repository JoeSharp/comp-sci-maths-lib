export type MatchFunction<T> = (a: T) => boolean;

export type Optional<T> = T | undefined;

export type ToString<T> = (a: T) => string;

export type EqualityCheck<T> = (a: T, b: T) => boolean;

export type StringReporter = (s: string) => void;

export type DivisibilityReporter = (
  value: number,
  reporter: StringReporter
) => boolean;

export interface DivisibilityReporters {
  factor: number;
  reporter: DivisibilityReporter;
}

export interface CompareMeta {
  aIndex: number;
  bIndex: number;
}
export type Comparator<T> = (a: T, b: T, meta?: CompareMeta) => number;

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
  positionVars: PositionVars
) => void;

export type SwapFunction<T> = (arr: T[], from: number, to: number) => void;

export interface SortUtility<T> {
  compare?: Comparator<T>;
  observe?: SortObserver<T>;
  swap?: SwapFunction<T>;
}

// Sorting
export type SortFunction<T> = (
  inputList: T[],
  utilities: SortUtility<T>
) => T[];

export interface NamedSort {
  name: string;
  sort: SortFunction<any>;
}

// Searching
export type MatchComparator<T> = (a: T, aIndex: number) => number;

export type SearchObserver<T> = (
  stageName: string,
  positionVars?: PositionVars
) => void;

export interface SearchUtilities<T> {
  match: MatchComparator<T>;
  observe?: SearchObserver<T>;
}

export type SearchFunction = <T>(
  inputList: T[],
  utilities: SearchUtilities<T>
) => number;

export interface NamedSearch {
  name: string;
  search: SearchFunction;
}
