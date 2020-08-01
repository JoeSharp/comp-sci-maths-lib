export type BasicSearchFunction = <T>(
  inputList: T[],
  match: (a: T) => number
) => number;

export interface BasicNamedSearch {
  name: string;
  search: BasicSearchFunction;
}
