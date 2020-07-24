import { ShortestPathTree } from "./types";
import Graph from "../../dataStructures/graph/Graph";

import { dijstraks, getPath } from "./dijkstras";

// https://youtu.be/ySN5Wnu88nE?t=239
test("Routing Algorithms - A*", () => {
  // The addition that A* has is the use of a heuristic to
  // provide the algorithm with a sense of direction.
  const euclideanDistances: { [n: string]: number } = {
    S: 10,
    A: 9,
    B: 7,
    C: 8,
    D: 8,
    E: 0,
    F: 6,
    G: 3,
    H: 6,
    I: 4,
    J: 4,
    K: 3,
    L: 6,
  };

  const myGraph = new Graph()
    .addBiDirectionalEdge("S", "A", 7)
    .addBiDirectionalEdge("S", "B", 2)
    .addBiDirectionalEdge("S", "C", 3)
    .addBiDirectionalEdge("A", "D", 4)
    .addBiDirectionalEdge("A", "B", 3)
    .addBiDirectionalEdge("B", "D", 4)
    .addBiDirectionalEdge("B", "H", 1)
    .addBiDirectionalEdge("C", "L", 2)
    .addBiDirectionalEdge("D", "F", 5)
    .addBiDirectionalEdge("E", "K", 5)
    .addBiDirectionalEdge("E", "G", 2)
    .addBiDirectionalEdge("F", "H", 3)
    .addBiDirectionalEdge("G", "H", 2)
    .addBiDirectionalEdge("I", "L", 4)
    .addBiDirectionalEdge("I", "K", 4)
    .addBiDirectionalEdge("J", "L", 4)
    .addBiDirectionalEdge("J", "K", 4);
  const shortestPathTreeStoE: ShortestPathTree = dijstraks({
    graph: myGraph,
    sourceNode: "S",
    destinationNode: "E",
    getHeuristicCost: (d) => euclideanDistances[d],
  });

  const pathStoE: string[] = getPath(shortestPathTreeStoE, "E");
  expect(pathStoE).toEqual(["E", "G", "H", "B", "S"]);
});

// https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
test("Routing Algorithms - Dijkstra", () => {
  const myGraph: Graph = new Graph()
    .addBiDirectionalEdge("0", "1", 4)
    .addBiDirectionalEdge("0", "7", 8)
    .addBiDirectionalEdge("1", "2", 8)
    .addBiDirectionalEdge("1", "7", 11)
    .addBiDirectionalEdge("2", "3", 7)
    .addBiDirectionalEdge("2", "8", 2)
    .addBiDirectionalEdge("2", "5", 4)
    .addBiDirectionalEdge("3", "4", 9)
    .addBiDirectionalEdge("3", "5", 14)
    .addBiDirectionalEdge("4", "5", 10)
    .addBiDirectionalEdge("5", "6", 2)
    .addBiDirectionalEdge("6", "7", 1)
    .addBiDirectionalEdge("6", "8", 6)
    .addBiDirectionalEdge("7", "8", 7);

  const viaNode = "0";
  const shortestPathTreeAll: ShortestPathTree = dijstraks({
    graph: myGraph,
    sourceNode: viaNode,
  });
  expect(shortestPathTreeAll).toEqual({
    "0": { cost: 0, viaNode: undefined },
    "1": { cost: 4, viaNode: "0" },
    "2": { cost: 12, viaNode: "1" },
    "3": { cost: 19, viaNode: "2" },
    "4": { cost: 21, viaNode: "5" },
    "5": { cost: 11, viaNode: "6" },
    "6": { cost: 9, viaNode: "7" },
    "7": { cost: 8, viaNode: "0" },
    "8": { cost: 14, viaNode: "2" },
  });

  const pathTo4 = getPath(shortestPathTreeAll, "4");
  expect(pathTo4).toEqual(["4", "5", "6", "7", "0"]);

  const pathTo3 = getPath(shortestPathTreeAll, "3");
  expect(pathTo3).toEqual(["3", "2", "1", "0"]);

  const pathTo8 = getPath(shortestPathTreeAll, "8");
  expect(pathTo8).toEqual(["8", "2", "1", "0"]);

  // Do the same thing again, but only find the route to one node
  // It should come up with the same answer, but will make no attempt to route 'every node'
  const shortestPathTree4only: ShortestPathTree = dijstraks(
    {
      graph: myGraph,
      sourceNode: viaNode,
      destinationNode: "4",
    } // this time specifying the toNode
  );
  const pathTo4only = getPath(shortestPathTree4only, "4");
  expect(pathTo4only).toEqual(["4", "5", "6", "7", "0"]);
});
