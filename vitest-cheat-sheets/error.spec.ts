import { vi, test, expect, describe } from "vitest";

describe("expecting errors", async () => {
  test("should throw an error", () => {
    expect(() => {
      throw new Error("Error message");
    }).toThrow("Error message");
  });

  test("should throw an error after rejected fetch", async () => {
    const errorMessage = "Network error";
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error(errorMessage))),
    );

    await expect(fetch("https://api.example.com/data")).rejects.toThrow(
      "Network error",
    );
  });

  test("more sophisticated example of expecting error and resolved value", async () => {
    const errorMessage = "Network error";

    class MyError extends Error {
      constructor(message: string) {
        super(message);
        this.name = "MyError";
      }
    }

    globalThis.fetch = vi.fn().mockRejectedValue(new MyError(errorMessage));

    await expect(fetch("https://api.example.com/data")).rejects.toThrowError(
      "Network error",
    );
    await expect(fetch("https://api.example.com/data")).rejects.toThrowError(
      Error,
    );
    await expect(fetch("https://api.example.com/data")).rejects.toThrowError(
      /Network/,
    );

    globalThis.fetch = vi.fn().mockResolvedValue("success");
    const response = await fetch("https://api.example.com/data");
    expect(response).toBe("success");
  });
});
