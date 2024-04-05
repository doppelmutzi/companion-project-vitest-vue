import { useFetch } from "./useFetch";
import { useFetchTodoWithPolling } from "./useFetchTodoWithPolling";
import { vi, describe, it, expect, afterAll, beforeAll } from "vitest";

describe("useFetchTodoWithPolling", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  vi.mock("./useFetch");

  it("should poll every 5 seconds", async () => {
    const todo = {
      id: 1,
      todo: "vitest",
      completed: false,
      userId: 1,
    };

    vi.mocked(useFetch)
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

    await new Promise(process.nextTick);

    expect(response.todo.value?.todo).toEqual("vitest");

    await vi.advanceTimersByTimeAsync(50);
    expect(response.todo.value?.todo).toEqual("vitest");

    await vi.advanceTimersByTimeAsync(7000);
    expect(response.todo.value?.todo).toEqual("rules");

    response.togglePolling();
  });
});
