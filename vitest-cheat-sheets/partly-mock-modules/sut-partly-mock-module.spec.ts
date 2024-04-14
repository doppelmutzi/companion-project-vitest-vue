import { it, expect, describe, vi } from "vitest";
import { stringOperations } from "./sut-partly-mock-module";

describe("partly mock imported module", () => {
  it("mock method of imported object", () => {
    vi.mock("./sut-partly-mock-module", () => {
      return {
        stringOperations: {
          getWithEmoji: vi.fn().mockReturnValue("Hello world 🤩"),
        },
      };
    });

    const mockGetWithEmoji = vi.mocked(stringOperations.getWithEmoji);

    const result = mockGetWithEmoji("Hello world");

    expect(mockGetWithEmoji).toHaveBeenCalledWith("Hello world");
    expect(result).toEqual("Hello world 🤩");
    expect(vi.isMockFunction(mockGetWithEmoji)).toBe(true);
    expect(stringOperations.log).not.toBeDefined();
  });
});
