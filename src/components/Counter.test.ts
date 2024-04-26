import { flushPromises, mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import Counter from "./Counter.vue";
import { nextTick } from "vue";

test("renders component correctly", async () => {
  const wrapper = mount(Counter);
  const div = wrapper.find("div");
  expect(div.text()).toContain("count: 0");

  // make sure onMounted() is called by waiting until the next DOM update
  await nextTick();

  expect(div.text()).toContain("count: 2");

  const button = wrapper.find("button");
  button.trigger("click");
  button.trigger("click");

  await flushPromises();
  // also works
  // await nextTick();

  expect(div.text()).toContain("count: 0");
});
