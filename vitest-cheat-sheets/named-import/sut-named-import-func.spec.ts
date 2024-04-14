import { it, expect, describe, vi } from "vitest";
import { getWithEmoji } from "./sut-named-import-func";

describe("mock or spy on named import (function", () => {
  it("mock named import (function)", () => {
    vi.mock("./sut-named-import-func");
    const dummyMessage = "Hello, world!";
    const mockGetWithEmji = vi
      .mocked(getWithEmoji)
      .mockReturnValue(`${dummyMessage} 🤩`);

    const result = mockGetWithEmji(dummyMessage);
    expect(result).toBe(`${dummyMessage} 🤩`);
  });
});
