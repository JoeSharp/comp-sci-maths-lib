import PriorityQueue from "../../dataStructures/queue/PriorityQueue";
import Graph from "../../dataStructures/graph/Graph";
import {
  ShortestPathTree,
  ShortestPathForNode,
  ShortestPathWithNode,
  HeuristicCostFunction,
} from "./types";

/**
 * Calls the walkPath generator function and puts all the nodes into an array, returns the array.
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} destinationNode
 * @returns An array containing the path (walking backwards)
 */
function getPath(shortestPathTree: ShortestPathTree, destinationNode: string) {
  const path: string[] = [];
  for (const p of walkPath(shortestPathTree, destinationNode)) {
    path.push(p);
  }
  return path;
}

/**
 * Given a shortestPathTree taken from the dijkstra function below,
 * this walks from one node to another through the shortest path identified
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} viaNode The start point of the journey
 * @param {string} destinationNode The end point of the journey
 */
function* walkPath(
  shortestPathTree: ShortestPathTree,
  destinationNode: string
) {
  let node: string = destinationNode;
  while (!!node) {
    yield node;
    node = shortestPathTree[node].viaNode;
  }
}

interface Args {
  graph: Graph;
  sourceNode: string;
  destinationNode?: string;
  getHeuristicCost?: HeuristicCostFunction;
}

/**
 * Executes Dijkstras routing algorithm, returning the shortest path tree for the given source node.
 *
 * This algorithm can end early if the toNode is specified, here is a discussion of the validity of this...
 * https://stackoverflow.com/questions/23906530/dijkstras-end-condition
 *
 * @param {Graph} graph The graph that contains all the nodes and links
 * @param {string} sourceNode The node we are travelling from
 * @param {string | undefined} optionalArguments // Optional arguments, see above for default values
 * @returns Shortest Path Tree { [node] : {cost: number, viaNode: string} }
 */
function dijstraks({
  graph,
  sourceNode,
  destinationNode,
  getHeuristicCost = (n) => 0,
}: Args): ShortestPathTree {
  const shortestPathTree: ShortestPathTree = {};

  // Build a priority queue, where the nodes are arranged in order of
  // distance from the source (smallest to largest)
  const currentDistances = new PriorityQueue<ShortestPathWithNode>(
    (a, b) => b.cost - a.cost
  );

  // Add the from node, it doesn't go via anything, and it's distance is zero
  currentDistances.enqueue({
    node: sourceNode,
    viaNode: undefined,
    cost: 0,
  });

  // Add all the other nodes, with a distance of Infinity
  graph
    .getAllVertices()
    .filter((node) => node.localeCompare(sourceNode) !== 0)
    .map((node) => ({ node, viaNode: undefined, cost: Infinity }))
    .forEach((n) => currentDistances.enqueue(n));

  // While there are items in the queue to check...
  while (!currentDistances.isEmpty()) {
    // Take the node that is the shortest distance from our source node
    const currentItem = currentDistances.dequeue();

    // Put this item into our set (using node as a key)
    shortestPathTree[currentItem.node] = {
      cost: currentItem.cost,
      viaNode: currentItem.viaNode,
    };

    if (
      !!destinationNode &&
      currentItem.node.localeCompare(destinationNode) === 0
    ) {
      break;
    }

    // Get all the links from our current item
    graph
      .getOutgoing(currentItem.node)
      .filter(({ to }) => shortestPathTree[to] === undefined) // only those that aren't in our tree already
      .forEach(({ to: node, weight }) => {
        // Remove the matching item from our current known distances
        // It will either be replaced as is, or replaced with updated details
        const otherItem = currentDistances.removeMatch(
          (d) => d.node.localeCompare(node) === 0
        );

        if (weight === Infinity) {
          // This is the first time we have 'found' this node, so this is the best known route
          currentDistances.enqueue({
            node,
            cost: weight,
            viaNode: currentItem.node,
          });
        } else {
          // What is the distance to this other node, from our current node?
          const newPotentialDistance =
            currentItem.cost + weight + getHeuristicCost(currentItem.node);

          // Have we found a shorter route?
          if (newPotentialDistance < otherItem.cost) {
            // Replace the node with our new distance and via details
            currentDistances.enqueue({
              node,
              cost: newPotentialDistance,
              viaNode: currentItem.node,
            });
          } else {
            // Just put the current one back
            currentDistances.enqueue(otherItem);
          }
        }
      });
  }

  return shortestPathTree;
}

export { dijstraks, getPath, walkPath };
