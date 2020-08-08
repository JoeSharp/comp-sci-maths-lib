import { Optional } from "../../types";
import PriorityQueue from "../../dataStructures/queue/PriorityQueue";
import { Edge } from "../../dataStructures/graph/Graph";

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

export interface ObserverArgs<T> {
  currentItem?: ShortestPathWithNode<T>;
  shortestPathTree: ShortestPathTree<T>;
  currentDistances: PriorityQueue<ShortestPathWithNode<T>>;
  outgoing: Edge<T>[];
}
export interface ObserverArgsWithPathFrom<T> extends ObserverArgs<T> {
  pathFrom: T[];
}
export type RoutingObserver<T> = (args: ObserverArgs<T>) => void;
