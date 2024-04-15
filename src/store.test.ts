import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
  type Mock,
  afterEach,
} from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useDashboardStore, type DashboardStore } from "./store";
import { useFetch } from "./composables/useFetch";
import Ajv from "ajv";

vi.mock("./composables/useFetch");

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

  /**
   * Tests the createQuote action of the store.
   */
  describe("create quote image", () => {
    // more complicated to test because implementation requires to understand internals of fetch responses
    it("createQuoteImage should create a quote image by performing two fetch calls", async () => {
      const dummyQuote = { id: 1, quote: "Hello, World!", author: "Anonymous" };
      const dummyBlob = new Blob();

      globalThis.fetch = vi.fn();
      const mockedFetch = vi.mocked(fetch) as Mock;
      mockedFetch
        .mockResolvedValueOnce({ json: async () => dummyQuote })
        .mockResolvedValueOnce({
          blob: async () => dummyBlob,
        });

      const blob = await store.createQuoteImage();

      // state assertion
      expect(blob).toBe(dummyBlob);

      // behaviour assertions
      // Check the arguments of the first fetch call
      expect(mockedFetch.mock.calls[0][0]).toBe(
        "https://dummyjson.com/quotes/random",
      );

      // Check the arguments of the second fetch call
      expect(mockedFetch.mock.calls[1][0]).toBe(
        `https://dummyjson.com/image/768x80/008080/ffffff?text=${dummyQuote.quote}`,
      );
    });

    // custom composable makes it easier to test
    it("createQuoteImageWithComposable should create a quote image by calling useFetch twice", async () => {
      const dummyJsonState = {
        data: { id: 1, quote: "Hello, World!", author: "Anonymous" },
        hasError: false,
      };
      const dummyBlob = new Blob();

      const mockedUseFetch = vi.mocked(useFetch) as Mock;

      mockedUseFetch
        .mockResolvedValueOnce(dummyJsonState)
        .mockResolvedValueOnce({ data: dummyBlob, hasError: false });

      const blob = await store.createQuoteImageWithComposable();

      // state assertion
      expect(blob).toBe(dummyBlob);

      // behaviour assertions
      // check the arguments of the first useFetch call
      expect(mockedUseFetch.mock.calls[0][0]).toBe(
        "https://dummyjson.com/quotes/random",
      );
      // check the arguments of the second useFetch call
      expect(mockedUseFetch.mock.calls[1][0]).toBe(
        `https://dummyjson.com/image/768x80/008080/ffffff?text=${dummyJsonState.data.quote}`,
      );
    });

    describe("validate quote service", () => {
      let ajvMock: Mock;

      beforeEach(() => {
        vi.mock("ajv", () => {
          const Ajv = vi.fn();
          Ajv.prototype.compile = vi.fn();
          return { default: Ajv };
        });
        ajvMock = vi.mocked(Ajv.prototype.compile);

        globalThis.fetch = vi.fn();
        const mockedFetch = vi.mocked(fetch) as Mock;
        const dummyQuote = {
          id: 1,
          quote: "Hello, World!",
          author: "Anonymous",
        };
        mockedFetch.mockResolvedValueOnce({ json: async () => dummyQuote });
      });

      afterEach(() => {
        vi.restoreAllMocks();
      });

      it("fetchQuote should return a quote after successful validation", async () => {
        ajvMock.mockReturnValue(() => true);

        const quote = await store.validateQuoteServiceResponse();
        expect(quote).toBeDefined();
      });

      it("fetchQuote should throw an error after unsuccessful validation", async () => {
        ajvMock.mockReturnValue(() => false);

        const validateSpy = vi.spyOn(store, "validateQuoteServiceResponse");

        const quote = await store.validateQuoteServiceResponse();

        expect(validateSpy).rejects.toThrowError();
        expect(quote).not.toBeDefined();
      });
    });
  });
});
