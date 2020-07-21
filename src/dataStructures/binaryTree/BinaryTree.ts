import { Comparator } from "../../types";
import { Optional } from "../../types";

export default class BinaryTree<T> {
  value: Optional<T>;
  comparator: Comparator<T>;
  leftBranch: Optional<BinaryTree<T>>;
  rightBranch: Optional<BinaryTree<T>>;

  constructor(comparator: Comparator<T>, value?: Optional<T>) {
    this.comparator = comparator;
    this.value = value;
    this.leftBranch = null;
    this.rightBranch = null;
  }

  toString(): string {
    return `(${this.leftBranch && this.leftBranch.toString()} ${this.value} ${
      this.rightBranch && this.rightBranch.toString()
    })`;
  }

  contains(item: T) {
    if (this.value === item) {
      return true;
    } else if (this.leftBranch && this.leftBranch.contains(item)) {
      return true;
    } else if (this.rightBranch && this.rightBranch.contains(item)) {
      return true;
    }

    return false;
  }

  add(item: T) {
    if (this.value === undefined) {
      this.value = item;
    } else if (this.comparator(item, this.value) < 0) {
      if (!!this.leftBranch) {
        this.leftBranch.add(item);
      } else {
        this.leftBranch = new BinaryTree(this.comparator, item);
      }
    } else {
      if (!!this.rightBranch) {
        this.rightBranch.add(item);
      } else {
        this.rightBranch = new BinaryTree(this.comparator, item);
      }
    }
  }
}
