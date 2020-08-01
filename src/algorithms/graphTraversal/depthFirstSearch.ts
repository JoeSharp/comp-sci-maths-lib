import Stack from "../../dataStructures/stack/Stack";
import Graph from "../../dataStructures/graph/Graph";

function depthFirstSearch<T>(graph: Graph<T>, startVertex: T): T[] {
  const pendingStack = new Stack<T>();
  const items: T[] = [];

  let vertex = startVertex;
  while (true) {
    if (!items.includes(vertex)) {
      items.push(vertex);
      pendingStack.push(vertex);
    }

    // get the relate edges which are also in the unvisited set
    const related: T[] = graph
      .getOutgoing(vertex)
      .map(({ to }) => to)
      .filter((i) => !items.includes(i));

    if (related.length > 0) {
      vertex = related[0];
    } else {
      vertex = pendingStack.pop();
    }

    if (pendingStack.isEmpty()) {
      break;
    }
  }

  return items;
}

export default depthFirstSearch;
