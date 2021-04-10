type ToString<T> = (v: T) => string;

class Tree<T> {
    value: T;
    valueToString: ToString<T>;
    children: Tree<T>[];

    constructor(value: T, valueToString: ToString<T>) {
        this.value = value;
        this.children = [];
        this.valueToString = valueToString;
    }

    toString(): string {
        if (this.children.length > 0) {
            return `${this.valueToString(this.value)} -> [${this.children.map(c => c.toString()).join(',')}]`
        } else {
            return this.valueToString(this.value);
        }
    }

    addChildValue(value: T): Tree<T> {
        return this.addChild(new Tree(value, this.valueToString));
    }

    addChild(child: Tree<T>): Tree<T> {
        this.children.push(child);
        return this;
    }

    getValue() {
        return this.value;
    }

    getChildren() {
        return this.children;
    }
}

export default Tree;