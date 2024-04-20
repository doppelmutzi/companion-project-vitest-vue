import { test, expect, vi } from "vitest";

test("snapshot testing", () => {
  const data = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

  expect(data).toMatchSnapshot();
});

// Vitest snapshot example with an object like above but also a mocked function
test("snapshot testing with a mocked function", () => {
  const person = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    contact: vi.fn(),
  };

  expect(person).toMatchSnapshot();
});
