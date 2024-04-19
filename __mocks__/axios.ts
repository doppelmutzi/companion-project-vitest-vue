import { vi } from "vitest";

const mockAxios = {
  get: vi.fn((url: string) =>
    Promise.resolve({ data: { urlCharCount: url.length } }),
  ),
  post: vi.fn(() => Promise.resolve({ data: {} })),
  // Add other methods as needed
};

export default mockAxios;
