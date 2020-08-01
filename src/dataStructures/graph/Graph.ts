import { Optional } from "../../types";

/**
 * This class encapsulates a weighted directional graph.
 * Each Edge is stored as a separate object in an array
 */
export interface Edge<T> {
  from: T;
  to: T;
  weight: number;
}

export interface GraphData<T> {
  vertices: Set<T>;
  edges: Edge<T>[];
}

export const EMPTY_GRAPH_DATA: GraphData<any> = {
  vertices: new Set(),
  edges: [],
};

export default class Graph<T> implements GraphData<T> {
  vertices: Set<T>;
  edges: Edge<T>[];

  /**
   * A constructor that accepts existing graph details.
   * Allows it to be used as a copy constructor.
   *
   * @param vertices Existing vertices to populate it with
   * @param edges Existing edges to populate it with
   */
  constructor(graphData: GraphData<T> = EMPTY_GRAPH_DATA) {
    this.vertices = new Set(graphData.vertices);
    this.edges = [...graphData.edges];
  }

  /**
   * Register the existence of a vertex,
   * this might be done to represent disconnected vertexs,
   * or to simply prepare the list of vertexs before edges are known.
   *
   * @param vertex The vertex to add
   * @returns this, to allow method chaining
   */
  addVertex(vertex: T): Graph<T> {
    this.vertices.add(vertex);
    return this;
  }

  /**
   * Remove the existence of a vertex,
   * will also remove any edges from/to the given vertex.
   * @param vertex The vertex to remove
   */
  removeVertex(vertex: T): Graph<T> {
    this.vertices.delete(vertex);
    this.edges = this.edges.filter(
      ({ from, to }) => from === vertex || to === vertex
    );

    return this;
  }

  /**
   *
   * @param from The source vertex
   * @param to The destination vertex
   */
  removeEdge(from: T, to: T): Graph<T> {
    this.edges = this.edges.filter((l) => !(l.from === from && l.to === to));
    return this;
  }

  /**
   * Add a new Edge to the graph, one direction only
   * @param {string} from The source vertex
   * @param {string} to The destination vertex
   * @param {number} weight The weighting to attach
   * @returns this to allow method chaining
   */
  addUnidirectionalEdge(from: T, to: T, weight: number = 1.0) {
    this.vertices.add(from);
    this.vertices.add(to);
    this.edges = [
      ...this.edges.filter((l) => !(l.from === from && l.to === to)), // filter any existing Edge in this direction
      { from, to, weight },
    ];
    return this;
  }

  /**
   * Add a new Edge to the graph, add both directions
   * @param {string} from The source vertex
   * @param {string} to The destination vertex
   * @param {number} weight The weighting to attach
   * @returns this to allow method chaining
   */
  addBiDirectionalEdge(from: T, to: T, weight: number = 1.0) {
    this.vertices.add(from);
    this.vertices.add(to);

    this.edges = [
      ...this.edges.filter(
        (l) =>
          !(
            (l.from === from && l.to === to) ||
            (l.from === to && l.to === from)
          )
      ), // filter any existing Edge in both directions
      { from, to, weight },
      { from: to, to: from, weight }, // add the other direction
    ];

    return this;
  }

  /**
   * Find a Edge between a specific source and destination vertex.
   * @param from The source vertex
   * @param to The destination vertex
   * @returns The Edge if one exists
   */
  getEdge(from: T, to: T): Optional<Edge<T>> {
    return this.edges.find((l) => l.from === from && l.to === to);
  }

  /**
   * Access edges coming into a specific vertex
   * @param vertex The from vertex
   */
  getIncoming(vertex: T): Edge<T>[] {
    return this.edges.filter((l) => l.to === vertex);
  }

  /**
   * Access the edges from a specific vertex
   * @param {string} vertex The from vertex
   */
  getOutgoing(vertex: T): Edge<T>[] {
    return this.edges.filter((l) => l.from === vertex);
  }

  /**
   * This function will look for a Edge between the two vertexs (in that specific direction)
   * It will return the weight of the Edge between the two.
   * If there is no Edge, it will return Infinity.
   *
   * @param {string} from The source vertex
   * @param {string} to The destination vertex
   * @return The weight of the Edge, or Infinity if there is no Edge.
   */
  getEdgeWeight(from: T, to: T): number {
    const edge = this.getEdge(from, to);
    return !!edge ? edge.weight : Infinity;
  }

  /**
   * Represent the graph as a string, it will use tabs and newlines to space things out.
   */
  toString() {
    return `Graph\n${[...this.vertices]
      .map((vertex) => ({
        from: vertex,
        edges: this.getOutgoing(vertex),
      })) // make the entries into a nicer looking object
      .map(
        ({ from, edges }) =>
          `From: ${from}\n${edges
            .map(({ to, weight }) => `\tTo: ${to} (${weight})`)
            .join("\n")}` // each outgoing Edge should be represented on it's own line
      )
      .join("\n")}`; // Each section will be separated by a newline
  }
}
