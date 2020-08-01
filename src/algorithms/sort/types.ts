export type BasicSortFunction<T> = (inputList: T[]) => T[];

export interface NamedBasicSort {
  name: string;
  sort: BasicSortFunction<any>;
}
