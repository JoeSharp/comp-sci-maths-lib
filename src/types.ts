export type MatchFunction<T> = (a: T) => boolean;

export type Optional<T> = T | undefined;

export type Comparator<T> = (a: T, b: T) => number;

export type VisitFunction<T> = (n: T) => any;

interface PositionVars {
  [k: string]: number;
}

export type SortObserver<T> = (
  stageName: string,
  data: T[],
  positionVars: PositionVars
) => void;

// tslint:disable-next-line: no-empty
export const EMPTY_OBSERVER = () => {};

export type SortFunction<T> = (
  inputList: T[],
  comparator: Comparator<T>,
  observe?: SortObserver<T>
) => T[];

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
