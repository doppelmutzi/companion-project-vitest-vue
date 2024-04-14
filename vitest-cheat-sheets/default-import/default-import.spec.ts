import { Mock, describe, expect, it, vi } from "vitest";
import getWithEmoji from "./sut-default-func";
import sutObj from "./sut-default-obj";

describe("mock or spy on different variants of default imports", () => {
  it("mock default function", () => {
    vi.mock("./sut-default-func", () => {
      return {
        default: vi.fn((message: string) => `${message} 🥳`),
      };
    });

    expect(getWithEmoji("hello world")).toEqual("hello world 🥳");
  });

  it("spy on default object's method", () => {
    const getWithEmojiSpy = vi.spyOn(sutObj, "getWithEmoji") as Mock;

    const result = getWithEmojiSpy("spy kids");

    expect(result).toEqual("spy kids 😎");
    expect(getWithEmojiSpy).toHaveBeenCalledWith("spy kids");
  });
});
