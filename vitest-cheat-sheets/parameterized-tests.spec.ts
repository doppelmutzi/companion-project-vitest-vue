import { test, expect } from "vitest";

const inputs = ["Hello", "world", "!"];

test.each(inputs)("Testing string length", (input) => {
  expect(input.length).toBeGreaterThan(0);
});

// https://vitest.dev/api/#test-each
test.each(inputs)("Testing string lengths of %s", (input) => {
  expect(input.length).toBeGreaterThan(0);
});
