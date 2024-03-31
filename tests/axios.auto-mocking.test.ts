import axios from "axios";
import { expect, vi, describe, test } from "vitest";

vi.mock("axios");

// auto-mocking example with <root-folder>/__mocks__ folder
describe("Axios mocking for test suite", () => {
  test("mocked axios", async () => {
    await axios.get("string");

    expect(axios.get).toHaveBeenCalledWith("string");
    expect(axios.delete).toBeUndefined();
    expect(vi.isMockFunction(axios.get)).toBe(true);
    expect(vi.isMockFunction(axios.post)).toBe(true);
    expect(vi.isMockFunction(axios.delete)).toBe(false);
  });

  // use actual axios in test
  test("can get actual axios", async () => {
    const ax = await vi.importActual<typeof axios>("axios");

    expect(vi.isMockFunction(ax.get)).toBe(false);
  });
});
