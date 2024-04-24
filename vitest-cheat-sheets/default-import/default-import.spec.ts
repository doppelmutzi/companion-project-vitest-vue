import { type Mock, describe, expect, it, vi } from "vitest";
import getWithEmojiFunc from "./default-func";
import getWithEmojiObj from "./default-obj";

describe("mock or spy on different variants of default imports", () => {
  it("mock default function", () => {
    vi.mock("./default-func", () => {
      return {
        default: vi.fn((message: string) => `${message} 🥳`),
      };
    });

    expect(getWithEmojiFunc("hello world")).toEqual("hello world 🥳");
  });

  it("spy on default object's method", () => {
    const getWithEmojiSpy = vi.spyOn(getWithEmojiObj, "getWithEmoji") as Mock;

    const result = getWithEmojiSpy("spy kids");

    expect(result).toEqual("spy kids 😎");
    expect(getWithEmojiSpy).toHaveBeenCalledWith("spy kids");
  });
});
