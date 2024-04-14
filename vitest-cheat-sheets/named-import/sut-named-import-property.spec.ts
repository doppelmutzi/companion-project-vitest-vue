import { expect, it, vi } from "vitest";
import * as exports from "./sut-named-import-property";

it("mock property", () => {
  vi.spyOn(exports, "magicNumber", "get").mockReturnValue(41);
  expect(exports.magicNumber).toBe(41);
});
