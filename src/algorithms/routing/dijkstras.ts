import PriorityQueue from "../../dataStructures/queue/PriorityQueue";
import Graph from "../../dataStructures/graph/Graph";
import {
  ShortestPathTree,
  ShortestPathWithNode,
  HeuristicCostFunction,
  ShortestPathForNode,
  RoutingObserver,
} from "./types";
import { emptyObserver } from "../../common";

/**
 * Calls the walkPath generator function and puts all the nodes into an array, returns the array.
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} destinationNode
 * @returns An array containing the path (walking backwards), it will be empty if no route was found
 */
function getPath<T>({ graph, shortestPathTree, destinationNode }: WalkPath<T>) {
  const path: T[] = [];

  // If there is no available path to the destination, feed back empty list
  const endpoint = shortestPathTree[graph.vertexToString(destinationNode)];
  if (!endpoint || endpoint.viaNode === undefined) {
    return path;
  }

  for (const p of walkPath({ graph, shortestPathTree, destinationNode })) {
    path.push(p);
  }
  return path.reverse();
}

interface WalkPath<T> {
  graph: Graph<T>;
  shortestPathTree: ShortestPathTree<T>;
  destinationNode: T;
}

/**
 * Given a shortestPathTree taken from the dijkstra function below,
 * this walks from one node to another through the shortest path identified
 *
 * @param {object[key=node, value={cost: number, viaNode: string}]} shortestPathTree
 * @param {string} viaNode The start point of the journey
 * @param {string} destinationNode The end point of the journey
 */
function* walkPath<T>({
  graph: { vertexToString },
  shortestPathTree,
  destinationNode,
}: WalkPath<T>) {
  let node: T = destinationNode;
  while (!!node) {
    yield node;
    const thisShortestPath: ShortestPathForNode<T> =
      shortestPathTree[vertexToString(node)];
    if (thisShortestPath === undefined) {
      break;
    }
    node = thisShortestPath.viaNode;
  }
}

interface Args<T> {
  graph: Graph<T>;
  sourceNode: T;
  destinationNode?: T;
  getHeuristicCost?: HeuristicCostFunction<T>;
  observer?: RoutingObserver<T>;
}

export const emptyHeuristic: HeuristicCostFunction<any> = () => 0;

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
function dijstraks<T>({
  graph,
  sourceNode,
  destinationNode,
  getHeuristicCost = emptyHeuristic,
  observer = emptyObserver,
}: Args<T>): ShortestPathTree<T> {
  const shortestPathTree: ShortestPathTree<T> = {};

  // Build a priority queue, where the nodes are arranged in order of
  // distance from the source (smallest to largest)
  const currentDistances = new PriorityQueue<ShortestPathWithNode<T>>(
    (a, b) => b.cost - a.cost
  );

  // Add the from node, it doesn't go via anything, and it's distance is zero
  currentDistances.enqueue({
    node: sourceNode,
    viaNode: undefined,
    cost: 0,
  });

  const { vertices, equalityCheck, vertexToString } = graph;

  // Add all the other nodes, with a distance of Infinity
  vertices
    .filter((node) => !equalityCheck(node, sourceNode))
    .map((node) => ({ node, viaNode: undefined, cost: Infinity }))
    .forEach((n) => currentDistances.enqueue(n));

  // While there are items in the queue to check...
  while (!currentDistances.isEmpty()) {
    // Take the node that is the shortest distance from our source node
    const currentItem = currentDistances.dequeue();

    // Tell any observer the step
    observer({ currentItem, shortestPathTree, currentDistances });

    // Put this item into our set (using node as a key)
    shortestPathTree[vertexToString(currentItem.node)] = {
      cost: currentItem.cost,
      viaNode: currentItem.viaNode,
    };

    // Have we reached the destination? Quit early
    if (!!destinationNode && equalityCheck(currentItem.node, destinationNode)) {
      break;
    }

    // Get all the links from our current item
    graph
      .getOutgoing(currentItem.node)
      .filter(({ to }) => shortestPathTree[vertexToString(to)] === undefined) // only those that aren't in our tree already
      .forEach(({ to: node, weight }) => {
        // Remove the matching item from our current known distances
        // It will either be replaced as is, or replaced with updated details
        const otherItem = currentDistances.removeMatch((d) =>
          equalityCheck(d.node, node)
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
