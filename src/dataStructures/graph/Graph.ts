import { Optional } from "../../types";

/**
 * This class encapsulates a weighted directional graph.
 * Each link is stored as a separate object in an array
 */
interface Link {
  from: string;
  to: string;
  weight: number;
}

export default class Graph {
  pages: Set<string>;
  links: Link[];

  constructor() {
    this.pages = new Set();
    this.links = [];
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
    this.pages.add(from);
    this.pages.add(to);

    if (biDirectional) {
      this.links = [
        ...this.links.filter(
          (l) =>
            !(
              (l.from === from && l.to === to) ||
              (l.from === to && l.to === from)
            )
        ), // filter any existing link in both directions
        { from, to, weight },
        { from: to, to: from, weight }, // add the other direction
      ];
    } else {
      // Just add the forward link
      this.links = [
        ...this.links.filter((l) => !(l.from === from && l.to === to)), // filter any existing link in this direction
        { from, to, weight },
      ];
    }

    return this;
  }

  getLink(from: string, to: string): Optional<Link> {
    return this.links.find((l) => l.from === from && l.to === to);
  }

  /**
   * Access links coming into a specific vertex
   * @param vertex The from vertex
   */
  getIncoming(vertex: string): Link[] {
    return this.links.filter((l) => l.to === vertex);
  }

  /**
   * Access the links from a specific vertex
   * @param {string} vertex The from vertex
   */
  getOutgoing(vertex: string): Link[] {
    return this.links.filter((l) => l.from === vertex);
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
    const link = this.getLink(from, to);
    return !!link ? link.weight : Infinity;
  }

  getAllVertices(): string[] {
    return [...this.pages];
  }

  /**
   * Represent the graph as a string, it will use tabs and newlines to space things out.
   */
  toString() {
    return `Graph\n${this.getAllVertices()
      .map((page) => ({
        from: page,
        links: this.getOutgoing(page),
      })) // make the entries into a nicer looking object
      .map(
        ({ from, links }) =>
          `From: ${from}\n${links
            .map((link) => `\tTo: ${link.to} (${link.weight})`)
            .join("\n")}` // each outgoing link should be represented on it's own line
      )
      .join("\n")}`; // Each section will be separated by a newline
  }
}
