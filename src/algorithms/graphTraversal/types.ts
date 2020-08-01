import Graph from "../../dataStructures/graph/Graph";

export type GraphTraversal<T> = (graph: Graph<T>, startVertex: T) => T[];
