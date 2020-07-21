export interface ShortestPathForNode {
  cost: number;
  viaNode: string;
}

export interface ShortestPathWithNode extends ShortestPathForNode {
  node: string;
}

export interface ShortestPathTree {
  [node: string]: ShortestPathForNode;
}

export type HeuristicCostFunction = (node: string) => number;
