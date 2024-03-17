import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useDashboardStore, type DashboardStore } from "./store";

/**
 * Tests for the useDashboardStore function.
 */
describe("useDashboardStore", () => {
  let store: DashboardStore;

  /**
   * Sets up the store before each test. It's crucial to create a fresh store
   * for every test to prevent side effects.
   */
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = useDashboardStore();
  });

  /**
   * Tests the incrementFetchCount method of the store.
   */
  it("should increment fetchCount", () => {
    store.incrementFetchCount();
    // Pinia performs ref unwrapping automatically
    expect(store.fetchCount).toEqual(1);
  });

  /**
   * Tests the incrementFetchCount method of the store multiple times.
   */
  it("should increment fetchCount multiple times", () => {
    store.incrementFetchCount();
    store.incrementFetchCount();
    store.incrementFetchCount();
    expect(store.fetchCount).toEqual(3);
  });
});
