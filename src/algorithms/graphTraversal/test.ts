import breadthFirstSearch from "./breadthFirstSearch";
import depthFirstSearch from "./depthFirstSearch";
import Graph from "../../dataStructures/graph/Graph";
import { StringGraphVertex } from "../../types";
import { getStringVertex } from "../../common";

const vertexA = getStringVertex("A");
const vertexB = getStringVertex("B");
const vertexC = getStringVertex("C");
const vertexD = getStringVertex("D");
const vertexE = getStringVertex("E");
const vertexF = getStringVertex("F");
const vertexG = getStringVertex("G");
const vertexH = getStringVertex("H");
const vertexI = getStringVertex("I");
const vertexJ = getStringVertex("J");
const vertexK = getStringVertex("K");
const vertexL = getStringVertex("L");
const vertexS = getStringVertex("S");

function createTestGraph() {
  return new Graph<StringGraphVertex>()
    .addBiDirectionalEdge(vertexS, vertexA)
    .addBiDirectionalEdge(vertexS, vertexB)
    .addBiDirectionalEdge(vertexS, vertexC)
    .addBiDirectionalEdge(vertexA, vertexD)
    .addBiDirectionalEdge(vertexD, vertexG)
    .addBiDirectionalEdge(vertexB, vertexE)
    .addBiDirectionalEdge(vertexE, vertexG)
    .addBiDirectionalEdge(vertexC, vertexF)
    .addBiDirectionalEdge(vertexF, vertexG);
}

test("Graph - Breadth First Search", () => {
  const myGraph = createTestGraph();

  const items: StringGraphVertex[] = [];
  breadthFirstSearch(myGraph, vertexS, (d) => items.push(d));

  const directlyEdgeed = [vertexA, vertexB, vertexC];
  const transitivelyEdgeed = [vertexD, vertexE, vertexF, vertexG];
  directlyEdgeed.forEach((i) =>
    transitivelyEdgeed.forEach((t) => {
      const indexOfI = items.indexOf(i);
      const indexOfT = items.indexOf(t);
      expect(indexOfI).not.toBe(-1);
      expect(indexOfT).not.toBe(-1);
      expect(indexOfI).toBeLessThan(indexOfT);
    })
  );
});

test("Graph - Depth First Search", () => {
  const myGraph = createTestGraph();

  const items: StringGraphVertex[] = [];
  depthFirstSearch(myGraph, vertexS, (d) => items.push(d));

  const directRelatives = [
    { direct: vertexC, transitive: vertexF },
    { direct: vertexA, transitive: vertexD },
    { direct: vertexB, transitive: vertexE },
  ].map(({ direct, transitive }) => ({
    direct,
    transitive,
    indexOfDirect: items.indexOf(direct),
    indexOfTransitive: items.indexOf(transitive),
  }));
  directRelatives.sort((a, b) => a.indexOfDirect - b.indexOfDirect);

  // Just check we have all the right bits
  expect(directRelatives.length).toBe(3);

  // This is the common transitive link from all 3 start points
  const indexOfG = items.indexOf(vertexG);

  // For all but the first one
  directRelatives
    .filter((_, i) => i !== 0)
    .forEach(({ indexOfDirect, indexOfTransitive }) => {
      expect(indexOfDirect).toBeGreaterThan(directRelatives[0].indexOfDirect);
      expect(indexOfTransitive).toBeGreaterThan(
        directRelatives[0].indexOfDirect
      );

      // The first direct link will go through G and then back up to this direct link
      expect(indexOfDirect).toBeGreaterThan(indexOfG);
      expect(indexOfTransitive).toBeGreaterThan(indexOfG);

      // The transitive dep will have been hoovered up already
      expect(indexOfTransitive).toBeLessThan(indexOfDirect);
    });
});
