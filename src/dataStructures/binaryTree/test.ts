import BinaryTree from "./BinaryTree";

test("Binary Tree - Contains", () => {
  const myTree = new BinaryTree<string>((a, b) => a.localeCompare(b));

  myTree.add("B");
  myTree.add("A");
  myTree.add("D");
  myTree.add("E");
  myTree.add("C");
  myTree.add("F");

  const positive = myTree.contains("C");
  const negative = myTree.contains("X");

  expect(positive).toBeTruthy();
  expect(negative).toBeFalsy();
});
