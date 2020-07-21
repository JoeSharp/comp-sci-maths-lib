import BinaryTree from "../../dataStructures/binaryTree/BinaryTree";
import traverseInOrder from "./traverseInOrder";
import traversePostOrder from "./traversePostOrder";
import traversePreOrder from "./traversePreOrder";
import { stringComparator } from "../common";

test("Binary Tree - Traversal", () => {
  const myTree: BinaryTree<string> = new BinaryTree<string>(stringComparator);

  myTree.add("B");
  myTree.add("A");
  myTree.add("D");
  myTree.add("E");
  myTree.add("C");
  myTree.add("F");

  let results: string[] = [];
  traverseInOrder(myTree, (n) => results.push(n));
  expect(results).toEqual(["A", "B", "C", "D", "E", "F"]);

  results = []; // clear previous results
  traversePreOrder(myTree, (n) => results.push(n));
  expect(results).toEqual(["B", "A", "D", "C", "E", "F"]);

  results = []; // clear previous results
  traversePostOrder(myTree, (n) => results.push(n));
  expect(results).toEqual(["A", "C", "F", "E", "D", "B"]);
});
