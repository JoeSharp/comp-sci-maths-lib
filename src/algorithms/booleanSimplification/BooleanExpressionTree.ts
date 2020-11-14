import BinaryTree from "../../dataStructures/binaryTree/BinaryTree";
import { LogicNode, LOGIC_OR, LOGIC_AND, LOGIC_NOT } from "./types";
// import { LogicNode, ExpressionToken, LEFT_PARENTH, RIGHT_PARENTH, LOGIC_AND, LOGIC_OR, LOGIC_NOT } from "./types";
// import { simpleLogger } from "../../common";

export default class BooleanExpressionTree extends BinaryTree<LogicNode> {
    constructor(expression: string) {
        super(() => 0)

        this.value = expression;
    }

}


