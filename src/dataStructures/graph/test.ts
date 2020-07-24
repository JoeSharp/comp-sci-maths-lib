import Graph from "./graph";

test("Creating a Weighted Graph", () => {
  const graph = new Graph()
    .addBiDirectionalEdge("A", "B", 1.0)
    .addBiDirectionalEdge("A", "C")
    .addUnidirectionalEdge("A", "D", 4.0)
    .addUnidirectionalEdge("D", "A", 2.0)
    .addUnidirectionalEdge("C", "E");

  const ad = graph.getEdgeWeight("A", "D");
  expect(ad).toBe(4.0);

  const ac = graph.getEdgeWeight("A", "C");
  expect(ac).toBe(1.0);

  const da = graph.getEdgeWeight("D", "A");
  expect(da).toBe(2.0);

  const bd = graph.getEdgeWeight("B", "D");
  expect(bd).toBe(Infinity);

  const ce = graph.getEdgeWeight("C", "E");
  expect(ce).toBe(1.0);

  const ec = graph.getEdgeWeight("E", "C");
  expect(ec).toBe(Infinity);

  const vertices = graph.vertices;
  ["A", "B", "C", "D", "E"].forEach((v) =>
    expect(vertices.has(v)).toBeTruthy()
  );

  // Execute some removals
  graph.removeEdge("A", "C");
  graph.removePage("B");

  const acPostDelete = graph.getEdgeWeight("A", "C");
  expect(acPostDelete).toBe(Infinity);
  const verticesPostDelete = graph.vertices;
  expect(verticesPostDelete.has("B")).toBeFalsy();
});
