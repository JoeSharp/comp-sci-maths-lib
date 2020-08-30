export type GenericSearchFunction = <T>(
  inputList: T[],
  match: (a: T) => number
) => number;

export interface NamedGenericSearchFunction {
  name: string;
  search: GenericSearchFunction;
}
