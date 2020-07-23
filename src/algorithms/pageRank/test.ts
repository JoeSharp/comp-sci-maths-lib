import * as winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

import {
  initialisePageRank,
  iteratePageRank,
  extractPageRank,
} from "./pageRank";
import Graph from "../../dataStructures/graph/Graph";
import { PageRankState } from "./types";

test("Page Rank", () => {
  const graph = new Graph()
    .addUnidirectionalEdge("a", "b")
    .addUnidirectionalEdge("b", "a")
    .addUnidirectionalEdge("b", "c")
    .addUnidirectionalEdge("b", "d")
    .addUnidirectionalEdge("d", "a");

  let pageRankState: PageRankState = initialisePageRank(graph);

  // Iterate the rank 5 times
  for (let i = 0; i < 5; i++) {
    pageRankState = iteratePageRank(pageRankState);
  }

  const pageRankA = extractPageRank(pageRankState, "a");
  const pageRankB = extractPageRank(pageRankState, "b");
  const pageRankC = extractPageRank(pageRankState, "c");
  const pageRankD = extractPageRank(pageRankState, "d");

  expect(pageRankA).toBe(0.67);
  expect(pageRankB).toBe(0.72);
  expect(pageRankC).toBe(0.35);
  expect(pageRankD).toBe(0.35);
});
