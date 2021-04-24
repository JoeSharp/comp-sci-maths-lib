import { BinaryPin } from './types';

class PinSink {
    value: boolean;

    constructor() {
        this.value = false;
    }

    getPin(): BinaryPin {
        return (v: boolean) => this.value = v;
    }

    getValue(): boolean {
        return this.value;
    }
}

export default PinSink;