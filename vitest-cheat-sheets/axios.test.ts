/* eslint-disable no-unused-vars */
import axios from "axios";
import { expect, test, vi, describe } from "vitest";

interface MockedAxios {
  default: {
    get: (url: string) => Promise<{ data: unknown }>;
  };
}

describe("Axios mocking for individual test", () => {
  test("mocked axios", async () => {
    const { default: ax } = await vi.importMock<MockedAxios>("axios");

    await ax.get("url");

    expect(ax.get).toHaveBeenCalledWith("string");
  });

  test("actual axios is not mocked", async () => {
    expect(vi.isMockFunction(axios.get)).toBe(false);
  });
});
