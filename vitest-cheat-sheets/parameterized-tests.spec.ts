import { test, expect } from "vitest";

const inputs = ["Hello", "world", "!"];

// https://vitest.dev/api/#test-each
test.each(inputs)("Testing string length", (input) => {
  expect(input.length).toBeGreaterThan(0);
});
