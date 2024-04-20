import { vi, test, expect, describe } from "vitest";

describe("vi.stubGlobal", () => {
  test("Math example", () => {
    vi.stubGlobal("Math", { random: () => 0.5 });

    const result = Math.random();
    expect(result).toBe(0.5);
  });

  test("Date example", () => {
    vi.stubGlobal(
      "Date",
      class {
        getTime() {
          return 1000;
        }
      },
    );

    expect(new Date().getTime()).toBe(1000);
    expect(new Date().getTime()).not.toBe(2000);
  });

  test("console example", () => {
    vi.stubGlobal("console", {
      log: vi.fn(),
      error: vi.fn(),
    });

    console.log("Hello, World!");
    console.error("An error occurred!");

    const log = vi.mocked(console.log);
    const error = vi.mocked(console.error);
    expect(log).toHaveBeenCalledWith("Hello, World!");
    expect(error).toHaveBeenCalledWith("An error occurred!");
    expect(vi.isMockFunction(log)).toBe(true);
    expect(vi.isMockFunction(error)).toBe(true);
  });

  test.todo("fetch example", () => {
    // see fetch.spec.ts
  });
});
