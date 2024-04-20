import { test, vi, describe, afterAll, beforeAll, beforeEach } from "vitest";

const fetchWithPolling = async (refetchInMillis: number) => {
  const poll = async () => {
    await fetch("https://dummyjson.com");

    setTimeout(poll, refetchInMillis);
  };

  poll();
};

describe("testing timers", async () => {
  beforeAll(() => {
    // use fake timers for all tests in this test suite
    vi.useFakeTimers();
  });

  afterAll(() => {
    // good practice: use real timers again after tests to avoid side effects
    vi.useRealTimers();
  });

  beforeEach(() => {
    // good practice: clear the mock to avoid side effects
    vi.clearAllMocks();
  });

  test("fetchWithPolling calls fetch function at specified intervals", async ({
    expect,
  }) => {
    globalThis.fetch = vi.fn();
    const fetchMock = globalThis.fetch;

    await fetchWithPolling(1000);

    // The fetch function is called immediately
    await new Promise(process.nextTick);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Timer hasn't advanced enough yet
    await vi.advanceTimersByTimeAsync(999);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Timer has advanced enough
    await vi.advanceTimersByTimeAsync(2);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    // Timer has advanced two more times
    await vi.advanceTimersByTimeAsync(2000);
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });
});
