import breadthFirstSearch from "./breadthFirstSearch";
import depthFirstSearch from "./depthFirstSearch";
import Graph from "../../dataStructures/graph/Graph";

function createTestGraph() {
  return new Graph<string>()
    .addBiDirectionalEdge("S", "A")
    .addBiDirectionalEdge("S", "B")
    .addBiDirectionalEdge("S", "C")
    .addBiDirectionalEdge("A", "D")
    .addBiDirectionalEdge("D", "G")
    .addBiDirectionalEdge("B", "E")
    .addBiDirectionalEdge("E", "G")
    .addBiDirectionalEdge("C", "F")
    .addBiDirectionalEdge("F", "G");
}

test("Graph - Breadth First Search", () => {
  const myGraph = createTestGraph();

  const items: string[] = [];
  breadthFirstSearch(myGraph, "S", (d) => items.push(d));

  const directlyEdgeed = ["A", "B", "C"];
  const transitivelyEdgeed = ["D", "E", "F", "G"];
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

  const items: string[] = [];
  depthFirstSearch(myGraph, "S", (d) => items.push(d));

  const directRelatives = [
    { direct: "C", transitive: "F" },
    { direct: "A", transitive: "D" },
    { direct: "B", transitive: "E" },
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
  const indexOfG = items.indexOf("G");

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
