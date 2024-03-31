/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { expect, test, vi, describe } from "vitest";

interface MockedAxios {
  default: {
    get: (url: string, config?: string) => Promise<{ data: any }>;
  };
}

describe("Axios mocking for individual test", () => {
  test("mocked axios", async () => {
    const { default: ax } = await vi.importMock<MockedAxios>("axios");

    await ax.get("string");

    expect(ax.get).toHaveBeenCalledWith("string");
  });

  test("actual axios is not mocked", async () => {
    expect(vi.isMockFunction(axios.get)).toBe(false);
  });
});
