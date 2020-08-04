import LinkedList from "../linkedList/LinkedList";
import { DataStructure } from "../../common";

export default class Queue<T> extends DataStructure {
  items: LinkedList<T>;

  constructor() {
    super();
    this.items = new LinkedList();
  }

  toString() {
    return JSON.stringify(this.items);
  }

  getItems() {
    return this.items;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  enqueue(item: T) {
    this.items.append(item);
    this.tickVersion();
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    this.tickVersion();
    return this.items.remove(0);
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    return this.items.get(0);
  }
}
