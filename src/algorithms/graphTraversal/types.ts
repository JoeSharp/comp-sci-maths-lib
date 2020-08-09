import Graph from "../../dataStructures/graph/Graph";
import { VisitFunction } from "../../types";

export type GraphTraversal<T> = (
  graph: Graph<T>,
  startVertex: T,
  visit: VisitFunction<T>
) => void;
