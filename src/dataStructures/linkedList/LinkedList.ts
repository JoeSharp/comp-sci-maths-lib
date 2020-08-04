import LinkedItem from "./LinkedItem";
import { MatchFunction, Optional } from "../../types";
import { DataStructure } from "../../common";

export default class LinkedList<T> extends DataStructure {
  startItem: Optional<LinkedItem<T>>;
  length: number;

  constructor() {
    super();
    this.startItem = undefined;
    this.length = 0;
  }

  *[Symbol.iterator]() {
    let cItem = this.startItem;
    while (!!cItem) {
      yield cItem.getValue();
      cItem = cItem.getNextItem();
    }
  }

  toArray() {
    const arr: T[] = [];
    for (const i of this) {
      arr.push(i);
    }
    return arr;
  }

  insert(index: number, item: T) {
    let inserted = false;
    const newItem: LinkedItem<T> = new LinkedItem<T>(item);

    if (index === 0) {
      newItem.setNextItem(this.startItem);
      this.startItem = newItem;
      inserted = true;
    } else {
      let tIndex: number = 1;
      let currentItem: LinkedItem<T> = this.startItem;
      while (!!currentItem) {
        if (tIndex === index) {
          newItem.setNextItem(currentItem.getNextItem());
          currentItem.setNextItem(newItem);
          inserted = true;
          break;
        }

        tIndex += 1;
        currentItem = currentItem.getNextItem();
      }
    }

    if (inserted) {
      this.length += 1;
      this.tickVersion();
    }

    return inserted;
  }

  get(index: number): T {
    let tIndex = 0;
    let cItem = this.startItem;
    while (!!cItem) {
      if (tIndex === index) {
        return cItem.getValue();
      }
      cItem = cItem.getNextItem();
      tIndex += 1;
    }

    return undefined;
  }

  append(item: T) {
    const newItem = new LinkedItem(item);

    if (!!this.startItem) {
      let currentItem = this.startItem;

      while (!!currentItem.getNextItem()) {
        currentItem = currentItem.getNextItem();
      }

      currentItem.setNextItem(newItem);
    } else {
      this.startItem = newItem;
    }

    this.length += 1;
    this.tickVersion();
  }

  /**
   * Removes
   * @param {function} matchFunction Returns true for the object being removed
   * @returns The removed item
   */
  removeMatch(matchFunction: MatchFunction<T>): Optional<T> {
    let removed: Optional<T>;
    let index: number = 0;
    let cItem: LinkedItem<T> = this.startItem;
    while (!!cItem) {
      if (matchFunction(cItem.getValue())) {
        removed = this.remove(index);
        break;
      }
      cItem = cItem.getNextItem();
      index += 1;
    }
    this.tickVersion();

    return removed;
  }

  /**
   * Remove an item in a specific position
   * @param {number} index The index of the object to remove
   * @returns The removed item
   */
  remove(index: number): T {
    let removed: Optional<T>;

    if (index === 0) {
      if (!!this.startItem) {
        removed = this.startItem.getValue();
        this.startItem = this.startItem.getNextItem();
      }
    } else {
      let tIndex = 1;
      let currentItem = this.startItem;
      while (!!currentItem.getNextItem()) {
        if (tIndex === index) {
          const toRemove = currentItem.getNextItem();
          if (!!toRemove) {
            removed = toRemove.getValue();
            currentItem.setNextItem(toRemove.getNextItem());
            break;
          }
        }
        currentItem = currentItem.getNextItem();
        tIndex += 1;
      }
    }

    if (removed) {
      this.length -= 1;
      this.tickVersion();
    }

    return removed;
  }

  toString(): string {
    // return [this].reduce((acc, curr) => (acc += ` ${curr.getValue()}`), "");
    const arr: T[] = [];
    for (const i of this) {
      arr.push(i);
    }
    return arr.join(" ");
  }
}
