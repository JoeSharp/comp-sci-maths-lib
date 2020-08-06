import { ShortestPathTree } from "./types";
import Graph from "../../dataStructures/graph/Graph";

import { dijstraks, getPath } from "./dijkstras";
import { ToString, EqualityCheck } from "../../types";
import { simpleLogger } from "../../common";

interface Point {
  x: number;
  y: number;
}
const pointEqCheck: EqualityCheck<Point> = (a, b) => a.x === b.x && a.y === b.y;
const pointToStr: ToString<Point> = (a) => `${a.x}, ${a.y}`;

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

const shortestPathAcross: ShortestPathTree<Point> = dijstraks({
  graph: myGraph,
  sourceNode,
  destinationNode,
});

const pathAcross: Point[] = getPath(
  myGraph,
  shortestPathAcross,
  destinationNode
);

simpleLogger.info("Shortest Path Tree", shortestPathAcross);
simpleLogger.info("Path Across Grid", pathAcross);
