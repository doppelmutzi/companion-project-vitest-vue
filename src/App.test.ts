import { flushPromises, shallowMount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import App from "./App.vue";

import { createPinia, defineStore } from "pinia";

describe("App", () => {
  it("renders the image correctly", async () => {
    // mock URL.createObjectURL since it is an internal of the onMounted hook
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
    // init pinia and use the mock store
    const pinia = createPinia();
    useMockDashboardStore(pinia);

    // shallow mount the App component
    // only the first (component tree) level of Vue components are rendered
    const wrapper = shallowMount(App);

    // make sure to invoke onMounted lifecycle hook and resolve the promise
    await flushPromises();

    const imgEl = wrapper.find("img");
    expect(imgEl.attributes().alt).toBe("Dummy shortened quote");
    expect(imgEl.attributes().src).toBe("a nice URL");

    // renders only first child level of App component: h1, img, tags of included Vue components
    expect(wrapper.html()).toMatchSnapshot();
  });
});
