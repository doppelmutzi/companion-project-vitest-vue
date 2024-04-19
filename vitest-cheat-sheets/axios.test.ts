import axios from "axios";
import { expect, test, vi, describe } from "vitest";

describe("Axios mocking for individual test", () => {
  test("mocked axios", async () => {
    const { default: ax } =
      await vi.importMock<typeof import("axios")>("axios");

    const response = await ax.get("url");

    expect(ax.get).toHaveBeenCalledWith("url");
    expect(response.data.urlCharCount).toEqual(3);
  });

  test("actual axios is not mocked", async () => {
    expect(vi.isMockFunction(axios.get)).toBe(false);
  });
});
