import { describe, it, expect, vi } from "vitest";
import { fetchQuote } from "./quote.service";

/**
 * Tests for the fetchQuote function.
 */
describe("fetchQuote", () => {
  /**
   * Tests that fetchQuote does a network call with the correct url and returns a quote.
   */
  it("should return a valid quote", async () => {
    // global is deprecated in favor of globalThis
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const response = await fetchQuote();

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://dummyjson.com/quotes/random",
    );
    expect(response.quote).toBeDefined();
  });

  it("should return a valid quote by returning a fake response", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      statusText: "OK",
      json: async () => ({ quote: "Hello, World!" }),
    } as Response);

    const response = await fetchQuote();

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://dummyjson.com/quotes/random",
    );
    expect(response.quote).toBe("Hello, World!");
  });
});
