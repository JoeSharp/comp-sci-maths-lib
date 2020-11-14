export const LOGIC_AND = 'AND';
export const LOGIC_OR = 'OR';
export const LOGIC_NOT = 'NOT';

export type LogicOperator = 'AND' | 'OR' | 'NOT';
export const RIGHT_PARENTH = ')'
export const LEFT_PARENTH = '('
export type Parenth = '(' | ')';
export type ExpressionToken = LogicOperator | Parenth | string;
export type LogicNode = LogicOperator | string;

export const isAND = (value: string) => {
    return value === LOGIC_AND;
}
export const isOR = (value: string) => {
    return value === LOGIC_OR;
}
export const isNOT = (value: string) => {
    return value === LOGIC_NOT;
}
export const isLogicalOperator = (value: string) => {
    return isAND(value) || isOR(value) || isNOT(value);
}
export const isTerm = (value: string) => {
    return !isLogicalOperator(value);
}