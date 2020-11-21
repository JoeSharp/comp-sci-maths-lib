import Stack from "../../dataStructures/stack/Stack";
import Graph from "../../dataStructures/graph/Graph";
import { VisitFunction, AnyGraphVertex } from "../../types";
import { simpleLogger } from "../../common";

function depthFirstSearch<T extends AnyGraphVertex>(
  graph: Graph<T>,
  startVertexKey: string,
  visit: VisitFunction<T>
): void {
  const startVertex: T = graph.getVertex(startVertexKey);
  const pendingStack = new Stack<T>();
  const visited: Set<string> = new Set();

  let vertex = startVertex;
  while (true) {
    if (!visited.has(vertex.key)) {
      visited.add(vertex.key);
      visit(vertex);
      pendingStack.push(vertex);
    }

    // get the relate edges which are also in the unvisited set
    const related: T[] = graph
      .getOutgoing(vertex)
      .map(({ to }) => to)
      .filter((i) => !visited.has(i.key));

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
