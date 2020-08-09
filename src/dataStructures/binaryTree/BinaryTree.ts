import { Comparator } from "../../types";
import { Optional } from "../../types";
import { DataStructure } from "../../common";

export default class BinaryTree<T> extends DataStructure {
  value: Optional<T>;
  compare: Comparator<T>;
  leftBranch: Optional<BinaryTree<T>>;
  rightBranch: Optional<BinaryTree<T>>;

  constructor(compare: Comparator<T>, value?: Optional<T>) {
    super();
    this.compare = compare;
    this.value = value;
    this.leftBranch = null;
    this.rightBranch = null;
  }

  clear() {
    this.value = undefined;
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

  add(item: T): BinaryTree<T> {
    if (this.value === undefined) {
      this.value = item;
    } else if (this.compare(item, this.value) < 0) {
      if (!!this.leftBranch) {
        this.leftBranch.add(item);
      } else {
        this.leftBranch = new BinaryTree(this.compare, item);
      }
    } else {
      if (!!this.rightBranch) {
        this.rightBranch.add(item);
      } else {
        this.rightBranch = new BinaryTree(this.compare, item);
      }
    }
    this.tickVersion();
    return this;
  }
}
