import { vi } from "vitest";

const mockAxios = {
  get: vi.fn(() => Promise.resolve({ data: {} })),
  post: vi.fn(() => Promise.resolve({ data: {} })),
  // Add other methods as needed
};

export default mockAxios;
