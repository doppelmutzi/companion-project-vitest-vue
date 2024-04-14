import { expect, it, vi } from "vitest";

const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

it("should return the correct system time", () => {
  vi.setSystemTime(new Date("2024-04-04 15:17"));
  expect(getCurrentTime()).toBe("15:17");
  // cleanup
  vi.useRealTimers();
});
