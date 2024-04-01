import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useDashboardStore, type DashboardStore } from "./store";

/**
 * Tests for the useDashboardStore function. Shows how to test Pinia stores (actions, getters)
 */
describe("useDashboardStore", () => {
  let store: DashboardStore;

  /**
   * Sets up the store before each test. It's crucial to create a fresh store
   * for every test to prevent side effects.
   */
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = useDashboardStore();
  });

  /**
   * Tests the incrementFetchCount method of the store.
   */
  it("should increment fetchCount", () => {
    store.incrementFetchCount();
    // Pinia performs ref unwrapping automatically
    expect(store.fetchCount).toEqual(1);
  });

  /**
   * Tests the incrementFetchCount method of the store multiple times.
   */
  it("should increment fetchCount multiple times", () => {
    store.incrementFetchCount();
    store.incrementFetchCount();
    store.incrementFetchCount();
    expect(store.fetchCount).toEqual(3);
  });

  /**
   * Tests the shortenedQuote getter function of the store.
   */
  describe("shortenedQuote", () => {
    it("should return an empty string when currentQuote is an empty string", () => {
      store.currentQuote = { id: 0, quote: "", author: "" };
      expect(store.shortenedQuote).toEqual("");
    });

    it("should return an empty string when currentQuote is undefined", () => {
      store.currentQuote = undefined;
      expect(store.shortenedQuote).toEqual("");
    });

    it("should return the first 10 trimmed characters of the quote followed by ' ...'", () => {
      store.currentQuote = {
        id: 0,
        quote: " This is a long quote with whitespace ",
        author: "author",
      };
      expect(store.shortenedQuote).toEqual("This is a ...");
    });
  });
});
