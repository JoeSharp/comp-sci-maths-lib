import LinkedList from "../linkedList/LinkedList";
import { DataStructure } from "../../common";

export default class Stack<T> extends DataStructure {
  items: LinkedList<T>;

  constructor() {
    super();
    // Use a linked list for the items
    // New items are pushed into index 0, so that zero always contains the 'top'.
    this.items = new LinkedList();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  getItems() {
    return this.items;
  }

  push(item: T): Stack<T> {
    this.items.insert(0, item);
    this.tickVersion();
    return this;
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }
    this.tickVersion();
    return this.items.remove(0);
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }

    return this.items.get(0);
  }
}
