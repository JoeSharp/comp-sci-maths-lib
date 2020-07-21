import LinkedList from "../linkedList/LinkedList";
import { MatchFunction } from "../../types";

export type PriorityComparator<T> = (a: T, b: T) => number;

export default class PriorityQueue<T> {
  priorityComparator: PriorityComparator<T>;
  items: LinkedList<T>;

  /**
   * Constructor for Priority Queue.
   * @param {function} getPriority A function that accepts an item and returns a number to represent priority
   */
  constructor(priorityComparator: PriorityComparator<T>) {
    this.priorityComparator = priorityComparator;
    this.items = new LinkedList();
  }

  toString() {
    return this.items.toString();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Removes
   * @param {function} matchFunction Returns true for the object being removed
   * @returns The removed item
   */
  removeMatch(matchFunction: MatchFunction<T>) {
    return this.items.removeMatch(matchFunction);
  }

  enqueue(newItem: T) {
    let index: number = 0;
    for (const item of this.items) {
      if (this.priorityComparator(newItem, item) > 0) {
        // Insert item at this point and return
        this.items.insert(index, newItem);
        return;
      }

      index += 1;
    }

    // Just push onto the end
    this.items.append(newItem);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue Empty");
    }

    return this.items.remove(0);
  }
}
