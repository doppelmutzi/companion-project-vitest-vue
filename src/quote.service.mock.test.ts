import { describe, it, expect, vi } from "vitest";
import { fetchQuote } from "./quote.service";
import type { Quote } from "./types/quote";

/**
 * Tests for the fetchQuote function.
 */
describe("fetchQuote", () => {
  /**
   * Tests that the fetchQuote function returns a valid quote.
   */
  it("should return a valid quote", async () => {
    const dummyQuote: Quote = {
      id: 1,
      quote: "This is a dummy quote",
      author: "Anonymous",
    };
    const mockResponse = {
      ok: true,
      statusText: "OK",
      json: async () => dummyQuote,
    } as Response;

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    expect(await fetchQuote()).toEqual(dummyQuote);
  });
});
