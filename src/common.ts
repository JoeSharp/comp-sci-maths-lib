import * as winston from "winston";
import { EqualityCheck, ToString } from "./types";

export const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export const defaultEqualityCheck: EqualityCheck<any> = (a, b) => a === b;
export const defaultToString: ToString<any> = (a) => `${a}`;
