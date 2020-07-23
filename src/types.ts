export type MatchFunction<T> = (a: T) => boolean;

export type Optional<T> = T | undefined;

export type Comparator<T> = (a: T, b: T) => number;

export type VisitFunction<T> = (n: T) => any;

export type SortObserver<T> = (
  stageName: string,
  data: T[],
  positionVars: { [k: string]: number }
) => void;

// tslint:disable-next-line: no-empty
export const EMPTY_OBSERVER: SortObserver<any> = () => {};

export type SortFunction<T> = (
  inputList: T[],
  comparator: Comparator<T>,
  observer?: SortObserver<T>
) => T[];

export type MatchComparator<T> = (a: T) => number;

export type SearchFunction = <T>(
  inputList: T[],
  match: MatchComparator<T>
) => number;
