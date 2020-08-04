import LinkedList from "../linkedList/LinkedList";

export default class Queue<T> {
  items: LinkedList<T>;

  constructor() {
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
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    return this.items.remove(0);
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    return this.items.get(0);
  }
}
