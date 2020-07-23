import Stack from "../../dataStructures/stack/Stack";
import Graph from "../../dataStructures/graph/Graph";

function depthFirstSearch(graph: Graph, startVertex: string): string[] {
  const pendingStack = new Stack<string>();
  const items: string[] = [];

  let vertex = startVertex;
  while (true) {
    if (!items.includes(vertex)) {
      items.push(vertex);
      pendingStack.push(vertex);
    }

    // get the relate edges which are also in the unvisited set
    const related: string[] = graph
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
