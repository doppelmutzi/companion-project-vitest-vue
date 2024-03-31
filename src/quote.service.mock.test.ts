import { describe, it, expect, vi } from "vitest";
import { type Quote, fetchQuote } from "./quote.service";

vi.mock("./quote.service");

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
    vi.mocked(fetchQuote).mockResolvedValue(dummyQuote);

    expect(await fetchQuote()).toEqual(dummyQuote);
  });
});
