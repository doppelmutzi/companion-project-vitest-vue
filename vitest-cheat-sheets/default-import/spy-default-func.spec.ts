import { type Mock, expect, it, vi } from "vitest";
import * as exports from "./default-func";

it("spy on default function", () => {
  const getWithEmojiSpy = vi.spyOn(exports, "default") as Mock;

  const result = getWithEmojiSpy("spy kids");

  expect(result).toEqual("spy kids 😎");
  expect(getWithEmojiSpy).toHaveBeenCalledWith("spy kids");
});
