import { flushPromises, shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import App from "./AppRefactored.vue";

import { createPinia, defineStore } from "pinia";

describe("AppRefactored", () => {
  it("renders the image correctly", async () => {
    // mock store only need to include one method
    const useMockDashboardStore = defineStore("dashboard", () => ({
      createQuoteImageWithComposableRefactored: async () => ({
        url: "a nice URL",
        altText: "Dummy shortened quote",
      }),
    }));
    const pinia = createPinia();
    useMockDashboardStore(pinia);

    const wrapper = shallowMount(App);

    await flushPromises();

    const imgEl = wrapper.find("img");
    expect(imgEl.attributes().alt).toBe("Dummy shortened quote");
    expect(imgEl.attributes().src).toBe("a nice URL");
  });
});
