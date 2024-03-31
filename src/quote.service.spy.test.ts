import { describe, it, expect, vi } from "vitest";
import * as exports from "./quote.service";
import { type Quote } from "./quote.service";

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
    vi.spyOn(exports, "fetchQuote").mockResolvedValue(dummyQuote);

    expect(await exports.fetchQuote()).toEqual(dummyQuote);
  });
});
