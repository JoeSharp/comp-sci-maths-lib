import Graph from "./graph";

test("Creating a Weighted Graph", () => {
  const graph = new Graph();
  graph.addBiDirectionalLink("A", "B", 1.0);
  graph.addBiDirectionalLink("A", "C");
  graph.addUnidirectionalLink("A", "D", 4.0);
  graph.addUnidirectionalLink("D", "A", 2.0);
  graph.addUnidirectionalLink("C", "E");

  const ad = graph.getLinkWeight("A", "D");
  expect(ad).toBe(4.0);

  const da = graph.getLinkWeight("D", "A");
  expect(da).toBe(2.0);

  const bd = graph.getLinkWeight("B", "D");
  expect(bd).toBe(Infinity);

  const ce = graph.getLinkWeight("C", "E");
  expect(ce).toBe(1.0);

  const ec = graph.getLinkWeight("E", "C");
  expect(ec).toBe(Infinity);

  const vertices = graph.getAllVertices();
  ["A", "B", "C", "D", "E"].forEach((v) =>
    expect(vertices.includes(v)).toBeTruthy()
  );
});
