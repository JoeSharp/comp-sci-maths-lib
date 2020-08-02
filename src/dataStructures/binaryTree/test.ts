import BinaryTree from "./BinaryTree";
import {
  simpleLogger,
  stringComparator,
  arithmeticComparator,
} from "../../common";

test("Binary Tree - Contains", () => {
  const myTree = new BinaryTree<string>(stringComparator);

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

test("Binary Tree - With Duplicates", () => {
  const myTree = new BinaryTree<number>(arithmeticComparator);

  myTree.add(56);
  myTree.add(2);
  myTree.add(28);
  myTree.add(2);
  myTree.add(14);
  myTree.add(2);
  myTree.add(7);

  simpleLogger.debug(myTree.toString());
});
