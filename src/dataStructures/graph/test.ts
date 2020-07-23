import Graph from "./graph";

test("Creating a Weighted Graph", () => {
  const graph = new Graph();
  graph.addBiDirectionalLink("A", "B", 1.0);
  graph.addBiDirectionalLink("A", "C");
  graph.addUnidirectionalLink("A", "D", 4.0);
  graph.addUnidirectionalLink("D", "A", 2.0);

  const ad = graph.getLinkWeight("A", "D");
  expect(ad).toBe(4.0);

  const da = graph.getLinkWeight("D", "A");
  expect(da).toBe(2.0);
});
