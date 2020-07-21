/**
 * This class encapsulates a weighted directional graph.
 * It uses an adjacency list to store the links.
 * Nodes are just strings.
 */
interface Link {
  node: string;
  weight: number;
}

interface AdjacencyList {
  [n: string]: Link[];
}

export default class Graph {
  adjacencyList: AdjacencyList;

  /**
   * A new graph will have an empty adjacency list
   */
  constructor() {
    /**
     * This will be an object
     * each key will be a node in the graph
     * The associated object will be a list of destination nodes and their weightings (node, weight)
     */
    this.adjacencyList = {};
  }

  /**
   *
   * @param {string} from The source node
   * @param {string} to The destination node
   * @param {bool} biDirectional If this new link works in both directions
   * @param {number} weight The weighting to attach
   * @returns this to allow method chaining
   */
  addLink(
    from: string,
    to: string,
    biDirectional: boolean = true,
    weight: number = 1.0
  ) {
    const fromAdjacencyList: Link[] = this.ensureAdjacencyExists(from);
    const toAdjacencyList: Link[] = this.ensureAdjacencyExists(to);

    // Add this new forward link
    fromAdjacencyList.push({
      node: to,
      weight,
    });
    if (biDirectional) {
      toAdjacencyList.push({
        node: from,
        weight,
      });
    }

    return this;
  }

  /**
   * Access the links from a specific vertex
   * @param {string} from The from vertex
   */
  getRelated(from: string): Link[] {
    return this.adjacencyList[from];
  }

  /**
   * This function will look for a link between the two nodes (in that specific direction)
   * It will return the weight of the link between the two.
   * If there is no link, it will return Infinity.
   *
   * @param {string} from The source node
   * @param {string} to The destination node
   * @return The weight of the link, or Infinity if there is no link.
   */
  getLinkWeight(from: string, to: string): number {
    const list = this.adjacencyList[from];

    if (!list) return Infinity;

    const link = list.find((l) => l.node === to);

    return !!link ? link.weight : Infinity;
  }

  /**
   * Used internally to ensure that a particular node appears on the graph.
   * This method acts as an internal accessor for the list of links for that node.
   * The list returned is a reference to the class member, so any changes made will persist.
   * @param {string} node
   * @return List of adjacencies for that node
   */
  ensureAdjacencyExists(node: string): Link[] {
    if (this.adjacencyList[node] === undefined) {
      this.adjacencyList[node] = [];
    }

    return this.adjacencyList[node];
  }

  getAllVertices() {
    return Object.keys(this.adjacencyList);
  }

  /**
   * Represent the graph as a string, it will use tabs and newlines to space things out.
   */
  toString() {
    return `Graph\n${Object.entries(this.adjacencyList)
      .map((k) => ({ from: k[0], links: k[1] })) // make the entries into a nicer looking object
      .map(
        ({ from, links }) =>
          `From: ${from}\n${links
            .map((link) => `\tTo: ${link.node} (${link.weight})`)
            .join("\n")}` // each outgoing link should be represented on it's own line
      )
      .join("\n")}`; // Each section will be separated by a newline
  }
}
