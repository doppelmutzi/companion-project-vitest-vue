import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Headline from "./Headline.vue";

describe("Headline", () => {
  it("renders correctly", async () => {
    const wrapper = mount(Headline, {
      props: {
        fontColor: "red",
        text: "Hello, World!",
      },
    });

    expect(wrapper.text()).toMatchSnapshot();
  });
});
