import { Mock, describe, expect, it, vi } from "vitest";
import * as exports from "./default-func";

describe("mock or spy on different variants of default imports", () => {
  it("spy on default function", () => {
    const getWithEmojiSpy = vi.spyOn(exports, "default") as Mock;

    const result = getWithEmojiSpy("spy kids");

    expect(result).toEqual("spy kids 😎");
    expect(getWithEmojiSpy).toHaveBeenCalledWith("spy kids");
  });
});
