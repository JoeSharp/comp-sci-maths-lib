import BooleanExpressionTree from "./BooleanExpressionTree";
import { Optional } from "../../types";
import { isTerm, isAND, isLogicalOperator } from "./types";

export type BooleanRule = (expressionTree: BooleanExpressionTree) => Optional<BooleanExpressionTree>;

export const DISTRIBUTIVE_ONE: BooleanRule = (expressionTree: BooleanExpressionTree): Optional<BooleanExpressionTree> => {
    if (isAND(expressionTree.value)) {
        if (isTerm(expressionTree.leftBranch.value) && isLogicalOperator(expressionTree.rightBranch.value)) {

        } else if (isLogicalOperator(expressionTree.leftBranch.value) && isTerm(expressionTree.rightBranch.value)) {

        }
    }

    return undefined;
}

export const BOOLEAN_RULES: BooleanRule[] = [DISTRIBUTIVE_ONE]