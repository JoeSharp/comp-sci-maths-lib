import Graph from "../../dataStructures/graph/Graph";

export interface PageRanks {
  [s: string]: number;
}
export interface PageRankState<T> {
  iterations: number;
  graph: Graph<T>;
  dampingFactor: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
}
