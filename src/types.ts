export type MatchFunction<T> = (a: T) => boolean;

export type Optional<T> = T | undefined;

export type ToString<T> = (a: T) => string;

export type EqualityCheck<T> = (a: T, b: T) => boolean;

export type StringReporter = (s: string) => void;

export interface BaseGraphVertex<T> {
  key: string;
  value: T;
}
export type AnyGraphVertex = BaseGraphVertex<any>;
export type StringGraphVertex = BaseGraphVertex<string>;
export type NumberGraphVertex = BaseGraphVertex<number>;

export interface IDataStructure {
  version: number;
}

export type DivisibilityRule = (
  value: number,
  reporter: StringReporter
) => boolean;

export interface NamedDivisibilityRule {
  factor: number;
  explanation: string[];
  rule: DivisibilityRule;
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
  split?: SplitObserver<T>;
  join?: JoinObserver<T>;
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

export type SearchObserver = (
  stageName: string,
  positionVars?: PositionVars
) => void;

export interface SplitList<T> {
  key: string;
  data: T[];
}

export type SplitObserver<T> = (
  thisKey: string,
  listA: SplitList<T>,
  listB: SplitList<T>
) => void;

export type JoinObserver<T> = (
  listA: SplitList<T>,
  listB: SplitList<T>,
  joinedList: T[]
) => void;

export interface SearchUtilities<T> {
  match: MatchComparator<T>;
  observe?: SearchObserver;
  split?: SplitObserver<T>;
  join?: JoinObserver<T>;
}

export type SearchFunction = <T>(
  inputList: T[],
  utilities: SearchUtilities<T>
) => number;

export interface NamedSearch {
  name: string;
  search: SearchFunction;
}
