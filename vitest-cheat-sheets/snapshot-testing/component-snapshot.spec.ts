import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import AwesomeComponent from "./AwesomeComponent.vue";

test("renders component correctly", () => {
  const wrapper = mount(AwesomeComponent, {
    props: {
      name: "reader",
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
