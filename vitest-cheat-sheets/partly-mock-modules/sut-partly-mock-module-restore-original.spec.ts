import { it, expect, describe, vi } from "vitest";
import { stringOperations } from "./sut-partly-mock-module";

describe("partly mock imported module", () => {
  it("mock method of imported object and restore other original properties", () => {
    vi.mock("./sut-partly-mock-module", async (importOriginal) => {
      const original =
        (await importOriginal()) as typeof import("./sut-partly-mock-module");
      return {
        stringOperations: {
          log: original.stringOperations.log,
          getWithEmoji: vi.fn().mockReturnValue("Hello world 🤩"),
        },
      };
    });

    const { getWithEmoji: mockGetWithEmoji, log } = vi.mocked(stringOperations);

    const result = mockGetWithEmoji("Hello world");

    expect(mockGetWithEmoji).toHaveBeenCalledWith("Hello world");
    expect(result).toEqual("Hello world 🤩");
    expect(vi.isMockFunction(mockGetWithEmoji)).toBe(true);
    expect(log).toBeDefined();
    expect(vi.isMockFunction(log)).toBe(false);
  });
});
