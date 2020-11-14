import { simpleLogger } from "../../common";
import BooleanExpressionTree from "./BooleanExpressionTree";

simpleLogger.info('Boolean Expression Simplification Demo')

const expression = new BooleanExpressionTree('AND')
expression.leftBranch = new BooleanExpressionTree('AND');
expression.leftBranch.leftBranch = new BooleanExpressionTree('A')
expression.leftBranch.rightBranch = new BooleanExpressionTree('B')
expression.rightBranch = new BooleanExpressionTree('C');

simpleLogger.info(`Expression: ${expression.toString()}`)

