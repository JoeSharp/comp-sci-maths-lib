import Stack from "../../dataStructures/stack/Stack";
import Graph from "../../dataStructures/graph/Graph";
import { VisitFunction } from "../../types";

function depthFirstSearch<T>(
  graph: Graph<T>,
  startVertex: T,
  visit: VisitFunction<T>
): void {
  const pendingStack = new Stack<T>();
  const visited: Set<T> = new Set();

  let vertex = startVertex;
  while (true) {
    if (!visited.has(vertex)) {
      visited.add(vertex);
      visit(vertex);
      pendingStack.push(vertex);
    }

    // get the relate edges which are also in the unvisited set
    const related: T[] = graph
      .getOutgoing(vertex)
      .map(({ to }) => to)
      .filter((i) => !visited.has(i));

    if (related.length > 0) {
      vertex = related[0];
    } else {
      vertex = pendingStack.pop();
    }

    if (pendingStack.isEmpty()) {
      break;
    }
  }
}

export default depthFirstSearch;
