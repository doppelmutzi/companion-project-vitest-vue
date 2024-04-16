import { test, expect, vi } from "vitest";

test("verify return value of a mocked function", () => {
  const mockFn = vi.fn();

  // Set the return value of the mock function
  mockFn.mockReturnValue("mocked value");

  // Call the mock function
  const result = mockFn();

  // Verify that the return value has a particular value
  expect(result).toBe("mocked value");

  // Verify that the return value is of a particular type
  expect(typeof result).toBe("string");
});

test("verify invocations of a mocked function with any argument", () => {
  const mockFn = vi.fn();

  // Call the mock function with different arguments
  mockFn("arg1", 123);
  mockFn("arg2", { key: "value" });

  // Verify that the mock function was called with any string as the first argument
  expect(mockFn).toHaveBeenCalledWith(expect.any(String), expect.anything());

  // Verify that the mock function was called with any number as the second argument
  expect(mockFn).toHaveBeenCalledWith(expect.anything(), expect.any(Number));

  // Verify that the mock function was called with any object as the second argument
  expect(mockFn).toHaveBeenCalledWith(expect.anything(), expect.any(Object));
});

test("verify invocations of a mocked function with calls array", () => {
  const mockFn = vi.fn();

  // Call the mock function with different arguments
  mockFn("arg1", "arg2");
  mockFn("arg3", "arg4");

  // Verify that the mock function was called
  expect(mockFn).toHaveBeenCalled();

  // Verify that the mock function was called exactly twice
  expect(mockFn).toHaveBeenCalledTimes(2);

  // Verify that the mock function was called with specific arguments
  expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");
  expect(mockFn).toHaveBeenCalledWith("arg3", "arg4");

  // Verify the order of calls and their arguments using the mock array
  expect(mockFn.mock.calls[0]).toEqual(["arg1", "arg2"]);
  expect(mockFn.mock.calls[1]).toEqual(["arg3", "arg4"]);

  // clear the mock call history
  mockFn.mockClear();

  // Verify that the mock function was not called after resetting
  expect(mockFn).not.toHaveBeenCalled();

  // Call the mock function again with different arguments
  mockFn("arg5", "arg6");

  // Verify that the mock function was called once after resetting
  expect(mockFn).toHaveBeenCalledTimes(1);

  // Verify that the mock function was called with specific arguments after resetting
  expect(mockFn).toHaveBeenCalledWith("arg5", "arg6");

  // Verify the order of calls and their arguments using the mock array after resetting
  expect(mockFn.mock.calls[0]).toEqual(["arg5", "arg6"]);
});

test("verify invocations of a mocked function with a specific object", () => {
  interface MyInterface {
    key: string;
  }

  const mockFn = vi.fn();

  // Call the mock function with an object that matches the MyInterface interface
  mockFn({ key: "value", extraProp: "extra" });

  // Verify that the mock function was called with an object containing a specific key-value pair
  expect(mockFn).toHaveBeenCalledWith(
    expect.objectContaining({ key: "value" } as MyInterface),
  );
});
