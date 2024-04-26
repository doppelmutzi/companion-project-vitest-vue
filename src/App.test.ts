import { flushPromises, shallowMount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import App from "./App.vue";

import { createPinia, defineStore } from "pinia";

describe("App", () => {
  it("renders the image correctly", async () => {
    // mock URL.createObjectURL
    vi.stubGlobal("URL", { createObjectURL: () => "a nice URL" });
    // Create a mock store
    const useMockDashboardStore = defineStore("dashboard", () => ({
      createQuoteImageWithComposable: async () => {
        // Create a dummy blob
        const dummyBlob = new Blob();
        return Promise.resolve(dummyBlob);
      },
      shortenedQuote: "Dummy shortened quote",
    }));
    const pinia = createPinia();
    useMockDashboardStore(pinia);

    const wrapper = shallowMount(App, {
      global: {
        plugins: [pinia],
      },
    });

    // make sure to invoke onMounted lifecycle hook and resolve the promise
    await flushPromises();

    const imgEl = wrapper.find("img");
    expect(imgEl.attributes().alt).toBe("Dummy shortened quote");
    expect(imgEl.attributes().src).toBe("a nice URL");

    expect(wrapper.html()).toMatchSnapshot();
  });
});
