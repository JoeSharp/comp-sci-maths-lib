import Queue from "../../dataStructures/queue/Queue";
import Graph from "../../dataStructures/graph/Graph";

function breadthFirstSearch<T>(graph: Graph, startVertex: string): string[] {
  const pendingQueue: Queue<string> = new Queue();
  const items: string[] = [];

  // Visit the starting vertex
  pendingQueue.enqueue(startVertex);
  items.push(startVertex);

  let vertex = startVertex;
  do {
    // Get the related edges which are also in the invisited set
    const related: string[] = graph
      .getOutgoing(vertex)
      .map(({ to }) => to)
      .filter((i) => !items.includes(i));

    // If we have related edges, add them all to the items
    related.forEach((r) => {
      items.push(r);
      pendingQueue.enqueue(r);
    });

    if (related.length === 0) {
      vertex = pendingQueue.dequeue();
    }
  } while (!pendingQueue.isEmpty());

  return items;
}

export default breadthFirstSearch;
