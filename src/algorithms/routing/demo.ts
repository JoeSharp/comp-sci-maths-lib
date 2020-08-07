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
  myGraph.disconnectVertex({ x: 0, y: 7 });
  myGraph.disconnectVertex({ x: 1, y: 6 });
  myGraph.disconnectVertex({ x: 2, y: 5 });
  myGraph.disconnectVertex({ x: 3, y: 4 });
  myGraph.disconnectVertex({ x: 4, y: 3 });
  myGraph.disconnectVertex({ x: 4, y: 4 });
  myGraph.disconnectVertex({ x: 4, y: 5 });

  myGraph.disconnectVertex({ x: 8, y: 1 });
  myGraph.disconnectVertex({ x: 8, y: 2 });
  myGraph.disconnectVertex({ x: 8, y: 3 });
  myGraph.disconnectVertex({ x: 8, y: 4 });

  myGraph.disconnectVertex({ x: 9, y: 4 });
  myGraph.disconnectVertex({ x: 9, y: 7 });
  myGraph.disconnectVertex({ x: 10, y: 3 });
  myGraph.disconnectVertex({ x: 11, y: 1 });
  myGraph.disconnectVertex({ x: 11, y: 6 });
  myGraph.disconnectVertex({ x: 11, y: 7 });

  myGraph.disconnectVertex({ x: 12, y: 1 });
  myGraph.disconnectVertex({ x: 12, y: 4 });
  myGraph.disconnectVertex({ x: 12, y: 5 });

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
    simpleLogger.info(
      `Current Item: ${!!currentItem ? pointToStr(currentItem.node) : "NONE"}`
    );
  });

  const pathFrom: Point[] = getPathFrom({
    graph: myGraph,
    shortestPathTree,
    node: sourceNode,
  });
  simpleLogger.info("Shortest Path From Source", pathFrom);

  observations.forEach((o) => {
    const path = getPathTo({
      graph: myGraph,
      shortestPathTree: o.shortestPathTree,
      node: !!o.currentItem ? o.currentItem.node : "A",
    });
    simpleLogger.info(
      `Observation: ${path.map(pointToStr)} - ${JSON.stringify(o.currentItem)}`
    );
  });
}

function testBrokenPath() {
  const myGraph = new Graph<string>()
    .addBiDirectionalEdge("A", "B")
    .addBiDirectionalEdge("B", "C")
    .addBiDirectionalEdge("E", "D");
  const observations: ObserverArgs<string>[] = [];

  const shortestPathTree = dijstraks({
    graph: myGraph,
    sourceNode: "A",
    destinationNode: "D",
    observer: (d) => observations.push(d),
  });

  const pathFrom = getPathFrom({
    graph: myGraph,
    shortestPathTree,
    node: "A",
  });
  simpleLogger.info("Broken Path From ", pathFrom);

  observations.forEach((o) => {
    const path = getPathTo({
      graph: myGraph,
      shortestPathTree: o.shortestPathTree,
      node: !!o.currentItem ? o.currentItem.node : "A",
    });
    simpleLogger.info(
      `Observation: ${path} - ${JSON.stringify(o.currentItem)}`
    );
  });
}

testGrid();
// testBrokenPath();
