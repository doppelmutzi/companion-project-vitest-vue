import { test, expect, vi, describe } from "vitest";
import { add } from "./add";

describe("cleanup mocks", () => {
  test("mockClear", () => {
    const mockFunc = vi.fn();

    mockFunc();
    expect(mockFunc).toHaveBeenCalledTimes(1);

    // resets call history
    mockFunc.mockClear();

    mockFunc();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test("mockReset vs mockRestore", async () => {
    const mockAdd = vi.fn(add).mockImplementation((a, b) => 2 * a + 2 * b);

    expect(vi.isMockFunction(mockAdd)).toBe(true);
    expect(mockAdd(1, 1)).toBe(4);
    expect(mockAdd).toHaveBeenCalledTimes(1);

    // resets call history and mock function returns undefined
    mockAdd.mockReset();

    expect(vi.isMockFunction(mockAdd)).toBe(true);
    expect(mockAdd(1, 1)).toBeUndefined();
    expect(mockAdd).toHaveBeenCalledTimes(1);

    // resets call history and mock function restores implementation to add
    mockAdd.mockRestore();

    expect(vi.isMockFunction(mockAdd)).toBe(true);
    expect(mockAdd(1, 1)).toBe(2); // original implementation
    expect(mockAdd).toHaveBeenCalledTimes(1);
  });
});
