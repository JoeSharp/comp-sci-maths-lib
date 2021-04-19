import { Consumer } from "../../../types";

import Nand from './Nand';
import Not from './Not';

/**
 * And gate: 
 * out = 1 if (a == 1 and b == 1)
 *       0 otherwise
 */

class And {
    nand: Nand;
    not: Not;

    constructor() {
        this.nand = new Nand();
        this.not = new Not();
        this.nand.connectOutput(this.not.connectInput())
    }

    connectA() {
        return this.sendA.bind(this);
    }
    
    connectB() {
        return this.sendB.bind(this);
    }

    sendA(v: boolean) {
        this.nand.sendA(v);
    }

    sendB(v: boolean) {
        this.nand.sendB(v);
    }

    connectOutput(r: Consumer<boolean>) {
        this.not.connectOutput(r);
    }
}

export default And;