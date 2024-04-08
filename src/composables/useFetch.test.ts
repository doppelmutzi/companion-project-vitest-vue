import { describe, it, vi } from "vitest";
import { useFetch } from "./useFetch";

global.fetch = vi.fn();

describe("useFetch", () => {
  // alternative to use expect instead of importing it
  it("should fetch data successfully and return the response", async ({
    expect,
  }) => {
    const dummyData = { message: "Hello, World!" };
    const mockResponse = {
      ok: true,
      statusText: "OK",
      json: async () => dummyData,
    } as Response;

    vi.mocked(fetch).mockResolvedValue(mockResponse);
    // global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const response = await useFetch("https://api.example.com/data");

    expect(response.isLoading).toBe(false);
    expect(response.hasError).toBe(false);
    expect(response.error).toBe(null);
    expect(response.data).toEqual(dummyData);
  });

  it("should handle network errors and set the error state", async ({
    expect,
  }) => {
    const errorMessage = "Network error";
    const mockResponse = {
      ok: false,
      statusText: errorMessage,
    } as Response;
    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const response = await useFetch("https://api.example.com/data");

    expect(response.isLoading).toBe(false);
    expect(response.hasError).toBe(true);
    expect(response.error).toBeInstanceOf(Error);
    expect(response.data).toBe(null);
  });
});
