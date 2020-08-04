import Graph from "../../dataStructures/graph/Graph";

export interface PageRanks {
  [s: string]: number;
}
export interface PageRankState {
  iterations: number;
  graph: Graph<string>;
  dampingFactor: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
}
