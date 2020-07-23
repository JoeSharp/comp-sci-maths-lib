import { HeuristicCostFunction, ShortestPathTree } from "./types";
import Graph from "../../dataStructures/graph/Graph";

import { dijstraks, getPath } from "./dijkstras";
import { stringComparator } from "../common";

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
    .addBiDirectionalLink("S", "A", 7)
    .addBiDirectionalLink("S", "B", 2)
    .addBiDirectionalLink("S", "C", 3)
    .addBiDirectionalLink("A", "D", 4)
    .addBiDirectionalLink("A", "B", 3)
    .addBiDirectionalLink("B", "D", 4)
    .addBiDirectionalLink("B", "H", 1)
    .addBiDirectionalLink("C", "L", 2)
    .addBiDirectionalLink("D", "F", 5)
    .addBiDirectionalLink("E", "K", 5)
    .addBiDirectionalLink("E", "G", 2)
    .addBiDirectionalLink("F", "H", 3)
    .addBiDirectionalLink("G", "H", 2)
    .addBiDirectionalLink("I", "L", 4)
    .addBiDirectionalLink("I", "K", 4)
    .addBiDirectionalLink("J", "L", 4)
    .addBiDirectionalLink("J", "K", 4);
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
    .addBiDirectionalLink("0", "1", 4)
    .addBiDirectionalLink("0", "7", 8)
    .addBiDirectionalLink("1", "2", 8)
    .addBiDirectionalLink("1", "7", 11)
    .addBiDirectionalLink("2", "3", 7)
    .addBiDirectionalLink("2", "8", 2)
    .addBiDirectionalLink("2", "5", 4)
    .addBiDirectionalLink("3", "4", 9)
    .addBiDirectionalLink("3", "5", 14)
    .addBiDirectionalLink("4", "5", 10)
    .addBiDirectionalLink("5", "6", 2)
    .addBiDirectionalLink("6", "7", 1)
    .addBiDirectionalLink("6", "8", 6)
    .addBiDirectionalLink("7", "8", 7);

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
