import { PageRanks } from "./types";
import Graph from "../../dataStructures/graph/Graph";

const MAX_ITERATIONS = 20;

export interface PageRankState {
  iterations: number;
  graph: Graph;
  dampingFactor: number;
  ranks: PageRanks;
  rankHistory: PageRanks[];
}

export const roundTo2Dp = (x: number) =>
  x !== undefined ? parseFloat(x.toFixed(2)) : 0;

export const initialisePageRank = (
  graph: Graph,
  dampingFactor: number = 0.85
) => {
  const firstRanks = graph
    .getAllVertices()
    .reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {});
  return {
    iterations: 0,
    graph,
    ranks: firstRanks,
    rankHistory: [firstRanks],
    dampingFactor,
  };
};

export const extractPageRank = (
  { ranks }: PageRankState,
  page: string
): number => {
  return roundTo2Dp(ranks[page]);
};

export const iteratePageRank = ({
  iterations,
  graph,
  ranks,
  rankHistory,
  dampingFactor,
}: PageRankState): PageRankState => {
  if (iterations > MAX_ITERATIONS) {
    return {
      iterations,
      graph,
      ranks,
      rankHistory,
      dampingFactor,
    };
  }

  const newRanks: PageRanks = { ...ranks };

  graph.getAllVertices().forEach((page) => {
    const rank: number = graph.links
      .filter((link) => link.to === page)
      .map((link) => link.from)
      .map(
        (incoming) =>
          newRanks[incoming] /
          graph.links.filter((l) => l.from === incoming).length
      )
      .reduce((acc, curr) => acc + curr, 0);

    newRanks[page] = 1 - dampingFactor + dampingFactor * rank;
  });

  return {
    iterations: iterations + 1,
    graph,
    ranks: newRanks,
    rankHistory: [...rankHistory, newRanks],
    dampingFactor,
  };
};
