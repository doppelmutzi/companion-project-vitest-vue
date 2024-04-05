import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
  afterAll,
  beforeAll,
  type Mock,
} from "vitest";
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

  // FIXME testen wenn direkt global.fetch genutzt wird
  describe.skip("fetchTodoWithPolling", () => {
    beforeAll(() => {
      vi.useFakeTimers();
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it("should poll every 5 seconds", async () => {
      // global.fetch = vi.fn().mockResolvedValue({
      //   json: () =>
      //     new Promise((resolve) =>
      //       resolve({
      //         id: 1,
      //         todo: "learn vitest",
      //         completed: false,
      //         userId: 1,
      //       }),
      //     ),
      // });

      const todo = {
        id: 1,
        todo: "bla",
        completed: false,
        userId: 1,
      };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => {
            return Promise.resolve(todo);
          },
        }),
      ) as Mock;

      // global.fetch = vi
      //   .fn()
      //   .mockResolvedValueOnce({
      //     json: () => Promise.resolve(todo),
      //   })
      //   .mockResolvedValueOnce({
      //     json: () => Promise.resolve(todo2),
      //   })

      const togglePolling = await store.fetchTodoWithPolling(5000);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/todos/random");
      expect(store.currentTodo).toStrictEqual(todo);

      vi.advanceTimersByTime(6000);
      expect(global.fetch).toHaveBeenCalledTimes(1);

      togglePolling();
    });
  });
});
