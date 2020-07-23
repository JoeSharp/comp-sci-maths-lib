import * as winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

import {
  PageRankState,
  initialisePageRank,
  iteratePageRank,
  extractPageRank,
} from "./pageRank";
import Graph from "../../dataStructures/graph/Graph";

test("Page Rank", () => {
  const graph = new Graph()
    .addLink("a", "b", false)
    .addLink("b", "a", false)
    .addLink("b", "c", false)
    .addLink("b", "d", false)
    .addLink("d", "a", false);

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
