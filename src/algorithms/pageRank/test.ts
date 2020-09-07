import {
  initialisePageRank,
  iteratePageRank,
  extractPageRank,
  roundTo2Dp,
} from "./pageRank";
import Graph from "../../dataStructures/graph/Graph";
import { PageRankState } from "./types";
import { StringGraphVertex } from "../../types";
import { getStringVertex } from "../../common";

test("Page Rank", () => {
  const vertexA = getStringVertex("A");
  const vertexB = getStringVertex("B");
  const vertexC = getStringVertex("C");
  const vertexD = getStringVertex("D");

  const graph = new Graph()
    .addUnidirectionalEdge(vertexA, vertexB)
    .addUnidirectionalEdge(vertexB, vertexA)
    .addUnidirectionalEdge(vertexB, vertexC)
    .addUnidirectionalEdge(vertexB, vertexD)
    .addUnidirectionalEdge(vertexD, vertexA);

  let pageRankState: PageRankState<StringGraphVertex> = initialisePageRank(
    graph
  );

  // Iterate the rank 5 times
  for (let i = 0; i < 5; i++) {
    pageRankState = iteratePageRank(pageRankState);
  }

  const pageRankA = extractPageRank(pageRankState, vertexA.key);
  const pageRankB = extractPageRank(pageRankState, vertexB.key);
  const pageRankC = extractPageRank(pageRankState, vertexC.key);
  const pageRankD = extractPageRank(pageRankState, vertexD.key);

  expect(roundTo2Dp(pageRankA)).toBe(0.67);
  expect(roundTo2Dp(pageRankB)).toBe(0.72);
  expect(roundTo2Dp(pageRankC)).toBe(0.35);
  expect(roundTo2Dp(pageRankD)).toBe(0.35);
});
