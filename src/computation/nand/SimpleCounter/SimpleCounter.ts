class Counter {
    count: number;

    constructor(initialCount = 0) {
        this.count = initialCount;
    }
    
    getCount() {
        return this.count;
    }

    increment(amount: number = 1): Counter {
        this.count += amount;
        return this;
    }
}

export default Counter;