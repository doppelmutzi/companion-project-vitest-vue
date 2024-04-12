import { describe, it, expect, vi } from "vitest";
import { fetchQuote } from "./quote.service";

/**
 * Tests for the fetchQuote function.
 */
describe("fetchQuote", () => {
  /**
   * Tests that fetchQuote does a network call with the correct url and returns a quote.
   */
  it.only("should return a valid quote", async () => {
    // global is deprecated in favor of globalThis
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const response = await fetchQuote();

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://dummyjson.com/quotes/random",
    );
    expect(response.quote).toBeDefined();
  });
});
