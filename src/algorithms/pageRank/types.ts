import { GraphData } from "../../dataStructures/graph/Graph";

export interface PageRanks {
  [s: string]: number;
}
export interface PageRankState {
  iterations: number;
  graph: GraphData;
  dampingFactor: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
}
