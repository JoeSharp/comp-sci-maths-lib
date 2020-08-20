import Queue from "../../dataStructures/queue/Queue";
import Graph from "../../dataStructures/graph/Graph";
import { VisitFunction, AnyGraphVertex } from "../../types";

function breadthFirstSearch<T extends AnyGraphVertex>(
  graph: Graph<T>,
  startVertex: T,
  visit: VisitFunction<T>
): void {
  const pendingQueue: Queue<T> = new Queue();
  const visited: Set<T> = new Set();

  // Visit the starting vertex
  pendingQueue.enqueue(startVertex);
  visited.add(startVertex);
  visit(startVertex);

  let vertex = startVertex;
  do {
    // Get the related edges which are also in the invisited set
    const related: T[] = graph
      .getOutgoing(vertex)
      .map(({ to }) => to)
      .filter((i) => !visited.has(i));

    // If we have related edges, add them all to the items
    related.forEach((r) => {
      visited.add(r);
      visit(r);
      pendingQueue.enqueue(r);
    });

    if (related.length === 0) {
      vertex = pendingQueue.dequeue();
    }
  } while (!pendingQueue.isEmpty());
}

export default breadthFirstSearch;
