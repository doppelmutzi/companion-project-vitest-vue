import { flushPromises } from "@vue/test-utils";
import { useFetch } from "./useFetch";
import { useFetchTodoWithPolling } from "./useFetchTodoWithPolling";
import {
  vi,
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  beforeEach,
} from "vitest";

describe("useFetchTodoWithPolling", () => {
  const todo = {
    id: 1,
    todo: "vitest",
    completed: false,
    userId: 1,
  };

  vi.mock("./useFetch");

  const useFetchMocked = vi.mocked(useFetch);

  beforeEach(() => {
    // clear the mock to avoid side effects and start count with 0
    vi.clearAllMocks();
  });

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should fetch the API every 5 seconds until polling is stopped", async () => {
    useFetchMocked
      .mockResolvedValueOnce({
        isLoading: false,
        hasError: false,
        error: null,
        data: todo,
      })
      .mockResolvedValueOnce({
        isLoading: false,
        hasError: false,
        error: null,
        data: { ...todo, todo: "rules" },
      });

    const response = useFetchTodoWithPolling(5000);

    // the fetch function is called immediately
    await flushPromises();
    // also works await new Promise(process.nextTick);

    expect(response.todo.value?.todo).toEqual("vitest");

    // timer hasn't advanced enough yet
    await vi.advanceTimersByTimeAsync(50);
    expect(response.todo.value?.todo).toEqual("vitest");

    // timer has advanced more than 5 seconds now
    await vi.advanceTimersByTimeAsync(4970);
    expect(response.todo.value?.todo).toEqual("rules");

    expect(useFetchMocked).toHaveBeenCalledTimes(2);

    // stop polling
    response.togglePolling();

    // no fetching should happen now
    expect(useFetchMocked).toHaveBeenCalledTimes(2);
  });

  it("should fetch API again after polling is started again", async () => {
    //useFetchMocked.mockClear();
    useFetchMocked.mockResolvedValue({
      isLoading: false,
      hasError: false,
      error: null,
      data: todo,
    });

    const response = useFetchTodoWithPolling(5000);
    // the fetch function is called immediately
    await new Promise(process.nextTick);

    await vi.advanceTimersByTimeAsync(5000);
    expect(useFetchMocked).toHaveBeenCalledTimes(2);

    response.togglePolling();

    // timer has no impact now
    await vi.advanceTimersByTimeAsync(5000);
    expect(useFetchMocked).toHaveBeenCalledTimes(2);

    // clear the mock to avoid counting the previous calls and start from 0
    useFetchMocked.mockClear();
    // start polling again
    response.togglePolling();

    expect(useFetchMocked).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(5000);
    expect(useFetchMocked).toHaveBeenCalledTimes(2);

    // finally stop polling
    response.togglePolling();

    // clear mock again to allow a more semantic expect
    useFetchMocked.mockClear();

    await vi.advanceTimersByTimeAsync(5000);
    expect(useFetchMocked).not.toHaveBeenCalled();
  });
});
