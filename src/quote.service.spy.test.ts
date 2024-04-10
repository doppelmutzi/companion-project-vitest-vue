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
    vi.spyOn(global, "fetch");

    const response = await fetchQuote();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://dummyjson.com/quotes/random",
    );
    expect(response.quote).toBeDefined();
  });
});
