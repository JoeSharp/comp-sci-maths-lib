import { Optional } from "../../types";

export interface ShortestPathForNode<T> {
  cost: number;
  viaNode: Optional<T>;
}

export interface ShortestPathWithNode<T> extends ShortestPathForNode<T> {
  node: T;
}

export interface ShortestPathTree<T> {
  [nodeAsStr: string]: ShortestPathForNode<T>;
}

export type HeuristicCostFunction<T> = (node: T) => number;
