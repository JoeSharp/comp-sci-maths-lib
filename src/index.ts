import * as logger from "winston";

function hello(name: string): string {
  return `Hello ${name}`;
}

logger.info(hello("Joe"));
