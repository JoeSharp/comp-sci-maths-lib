import { ShortestPathTree, ObserverArgs } from "./types";
import Graph from "../../dataStructures/graph/Graph";

import { dijstraks, getPathTo, getPathFrom } from "./dijkstras";
import { ToString, EqualityCheck } from "../../types";
import { simpleLogger } from "../../common";

interface Point {
  x: number;
  y: number;
}
const pointEqCheck: EqualityCheck<Point> = (a, b) => a.x === b.x && a.y === b.y;
const pointToStr: ToString<Point> = (a) => `${a.x}, ${a.y}`;

function testGrid() {
  const columns = 10;
  const rows = 10;

  const myGraph = new Graph<Point>({
    equalityCheck: pointEqCheck,
    vertexToString: pointToStr,
  });

  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      if (row > 1) {
        const from = { x: col, y: row };
        const to = { x: col, y: row - 1 };
        myGraph.addBiDirectionalEdge(from, to);
      }
      if (row < rows - 1) {
        const from = { x: col, y: row };
        const to = { x: col, y: row + 1 };
        myGraph.addBiDirectionalEdge(from, to);
      }
      if (col > 1) {
        const from = { x: col, y: row };
        const to = { x: col - 1, y: row };
        myGraph.addBiDirectionalEdge(from, to);
      }
      if (col < columns - 1) {
        const from = { x: col, y: row };
        const to = { x: col + 1, y: row };
        myGraph.addBiDirectionalEdge(from, to);
      }
    }
  }

  const sourceNode = { x: 0, y: 0 };
  const destinationNode = { x: columns - 1, y: rows - 1 };
  const observations: ObserverArgs<Point>[] = [];

  const shortestPathTree: ShortestPathTree<Point> = dijstraks({
    graph: myGraph,
    sourceNode,
    destinationNode,
    observer: (d) => observations.push(d),
  });

  const pathToDestination: Point[] = getPathTo({
    graph: myGraph,
    shortestPathTree,
    node: destinationNode,
  });

  simpleLogger.info("Shortest Path Tree", shortestPathTree);
  simpleLogger.info(
    "Path Across Grid",
    pathToDestination.map(pointToStr).join(" -> ")
  );

  simpleLogger.info("OBSERVATIONS");
  observations.forEach(({ currentItem }) => {
    simpleLogger.info(`Current Item: ${pointToStr(currentItem.node)}`);
  });

  // TODO we need to be able to get the path going forwards...
  const pathFrom: Point[] = getPathFrom({
    graph: myGraph,
    shortestPathTree,
    node: sourceNode,
  });
  simpleLogger.info("Shortest Path From Source", pathFrom);
}

function testBrokenPath() {
  const myGraph = new Graph<string>()
    .addBiDirectionalEdge("A", "B")
    .addBiDirectionalEdge("B", "C")
    .addBiDirectionalEdge("E", "D");

  const shortestPathTree = dijstraks({
    graph: myGraph,
    sourceNode: "A",
    destinationNode: "D",
  });

  const pathFrom = getPathFrom({
    graph: myGraph,
    shortestPathTree,
    node: "A",
  });
  simpleLogger.info("Broken Path From ", pathFrom);
}

testGrid();
testBrokenPath();
