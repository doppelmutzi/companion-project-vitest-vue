import { describe, expect, test, vi } from "vitest";

describe("fetch", () => {
  test("variant with globalThis.fetch", async () => {
    const dummyData = { message: "hey" };
    const mockResponse = {
      ok: true,
      statusText: "OK",
      json: async () => dummyData,
    } as Response;

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const response = await fetch("https://api.example.com/data");
    const data = await response.json();

    expect(data).toEqual(dummyData);
  });

  test("variant with globalThis.fetch and vi.mocked", async () => {
    const dummyBlob = new Blob();

    const mockResponse = {
      ok: true,
      statusText: "OK",
      blob: async () => dummyBlob,
    } as Response;

    globalThis.fetch = vi.fn();
    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const response = await fetch("https://api.example.com/data");
    const data = await response.blob();

    expect(response.blob).toBeDefined();
    expect(data).toEqual(dummyBlob);
    expect(response.json).not.toBeDefined();
  });

  test("variant with vi.stubGlobal", async () => {
    const dummyData = { data: "hey" };
    const dummyBlob = new Blob();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          blob: async () => dummyBlob,
          json: () => dummyData,
        }),
      ),
    );

    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    const blob = await response.blob();

    expect(response).toEqual({
      json: expect.any(Function),
      blob: expect.any(Function),
    });
    expect(data).toEqual(dummyData);
    expect(blob).toEqual(dummyBlob);
  });

  test.todo("variant with rejected fetch", async () => {
    // see error.spec.ts
  });
});
