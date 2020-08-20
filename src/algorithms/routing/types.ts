import { Optional, AnyGraphVertex } from "../../types";
import PriorityQueue from "../../dataStructures/queue/PriorityQueue";
import { Edge } from "../../dataStructures/graph/Graph";

export interface ShortestPathForNode<T> {
  cost: number;
  viaNode: Optional<T>;
}

export interface ShortestPathWithNode<T extends AnyGraphVertex>
  extends ShortestPathForNode<T> {
  node: T;
}

export interface ShortestPathTree<T extends AnyGraphVertex> {
  [nodeAsStr: string]: ShortestPathForNode<T>;
}

export type HeuristicCostFunction<T extends AnyGraphVertex> = (
  node: T
) => number;

export interface ObserverArgs<T extends AnyGraphVertex> {
  currentItem?: ShortestPathWithNode<T>;
  shortestPathTree: ShortestPathTree<T>;
  currentDistances: PriorityQueue<ShortestPathWithNode<T>>;
  outgoing: Edge<T>[];
}
export interface ObserverArgsWithPathFrom<T extends AnyGraphVertex>
  extends ObserverArgs<T> {
  pathFrom: T[];
}
export type RoutingObserver<T extends AnyGraphVertex> = (
  args: ObserverArgs<T>
) => void;
