import { logger } from "./logger";

export function calculate(num1, num2) {
  // Perform the calculation
  const result = num1 + num2;

  // Log the result
  logger.log(`The result is ${result}`);

  return result;
}
